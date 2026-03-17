# 反向代理腾讯云docker镜像源

## 背景

国内访问docker镜像源速度较慢，需要使用镜像源或科学上网来代理。
目前可用的镜像源汇总：https://github.com/dongyubin/DockerHub?tab=readme-ov-file

当使用腾讯云服务器时，可以使用腾讯云docker镜像源。
不过腾讯云的镜像源只能内网访问，参考：https://cloud.tencent.com/document/product/1207/45596?from=console_top_search

![alt text](/pics/tencent-cloud.png)

因此，我们需要设置反向代理服务来让其他机器访问。
腾讯云docker镜像源：https://mirror.ccs.tencentyun.com

## (可选)内网穿透，限定IP访问
[tailscale](./tailscale-deploy)
 - 腾讯云服务器：100.99.134.53
 - 私人服务器：100.125.176.39

## 腾讯云服务器操作
### 创建工作目录，自己指定一个即可
```bash
mkdir -p /root/docker_proxy
cd /root/docker_proxy
```

### 创建nginx配置文件
```bash
mkdir -p ./conf
touch ./conf/nginx.conf
```


### 编辑nginx配置文件
编辑 `./conf/nginx.conf` 文件，添加反向代理配置。
```nginx
events {
    worker_connections 1024;
}

http {
    # 隐藏Nginx版本号，提高安全性
    server_tokens off;

    server {
        # 监听容器内的8100端口(可自己指定)，防火墙需打开TCP的8100端口
        listen 8100;
        # 可以填写服务器A的Tailscale IP，但不是必须的
        server_name localhost;

        # 可选：仅允许Tailscale网段访问（100.64.0.0/10是Tailscale的私有网段）
        allow 100.64.0.0/10;
        deny all;

        location / {
            # 关键配置：将请求转发给腾讯云的内网镜像加速器
            proxy_pass https://mirror.ccs.tencentyun.com;
            # 设置请求头，将原始请求的信息传递给后端
            proxy_set_header Host mirror.ccs.tencentyun.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # 解决 Docker 客户端可能遇到的 301 重定向问题
            proxy_redirect https://mirror.ccs.tencentyun.com/ /;
        }

        # 可选：添加一个简单的健康检查端点
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

### 下载nginx镜像反向代理
```bash
docker pull nginx:alpine
```

### 启动nginx容器
创建docker-compose.yaml文件
```yaml
version: '3.8'  # Compose 文件版本，兼容主流 Docker 版本

services:
  docker-mirror-proxy:
    container_name: docker-mirror-proxy  # 容器名，和之前一致
    image: nginx:alpine  # 轻量版 Nginx 镜像
    restart: unless-stopped  # 开机自启，对应 --restart always
    ports:
      - "8100:8100"  # 端口映射，对应 -p 8100:8100
    volumes:
      # 挂载 Nginx 配置文件，:ro 只读权限，对应 -v ...:ro
      - ./conf/nginx.conf:/etc/nginx/nginx.conf:ro
      # 挂载日志目录，默认读写权限，对应 -v ...
      - ./logs:/var/log/nginx
    # 可选：添加日志限制，防止日志占满磁盘（推荐）
    logging:
      driver: "json-file"
      options:
        max-size: "100m"  # 单个日志文件最大 100M
        max-file: "3"     # 最多保留 3 个日志文件
```

### 启动容器

```bash
docker-compose up -d
```

###  查看nginx日志

```bash
tail -f ./logs/access.log
```


## 私人服务器操作

### 测试
```bash
curl http://<腾讯云服务器IP>:8100/health
curl -I http://<腾讯云服务器IP>:8100/v2/
```

![alt text](/pics/docker-registry-200.png)

返回 `healthy`和`200 OK`则成功。

### 配置Docker使用代理
编辑Docker配置文件，添加代理配置。
```bash
vi /etc/docker/daemon.json
```
添加以下内容：
```json
{
    "registry-mirrors": [
        "http://<腾讯云服务器IP>:8100"
    ],
    "insecure-registries": ["<腾讯云服务器IP>:8100"]
}
```

### 重启Docker
```bash
systemctl daemon-reload
systemctl restart docker
```

### 测试
```bash
docker pull nginx:alpine
```

如果拉取成功，说明Docker已经通过代理成功从镜像仓库获取镜像。