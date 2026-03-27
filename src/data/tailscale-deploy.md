# Tailscale 内网穿透及对等中继配置

## 目录

- [安装](#安装)
- [中转服务器设置](#中转服务器设置)
- [配置文件](#配置文件)
- [测试连接](#测试连接)

## 安装

参考官方文档：

- [安装指南](https://tailscale.com/docs/install)
- [对等中继配置](https://tailscale.com/docs/features/peer-relay)

### 安装步骤

**Linux 系统：**

```bash
# Debian/Ubuntu
curl -fsSL https://tailscale.com/install.sh | sh

# CentOS/RHEL
sudo dnf config-manager --add-repo https://pkgs.tailscale.com/stable/centos/tailscale.repo
sudo dnf install tailscale
```

**其他系统：**

访问 [官方文档](https://tailscale.com/docs/install) 查看对应系统的安装方法。

```bash
# 启动 Tailscale，访问输出的链接完成认证
sudo tailscale up
```

## 中转服务器设置

在有公网 IP 的服务器配置中继端口，开启 relay 功能：

```bash
# 配置中继端口
sudo tailscale set --relay-server-port=40000
```

**防火墙配置：**

需要开启对应的 UDP 端口（如 40000）

```bash
# 使用 ufw
sudo ufw allow 40000/udp

# 使用 iptables
sudo iptables -A INPUT -p udp --dport 40000 -j ACCEPT
```

或登录对应的云服务商控制台，开启对应的端口。

## 配置文件

### ACL 配置示例

在 Tailscale 管理后台配置访问控制列表（ACL）：

**访问地址：** https://login.tailscale.com/admin/acls

```json
{
  "tagOwners": {
    "tag:relay": ["autogroup:admin"],
    "tag:vpc": ["autogroup:admin"]
  },
  "grants": [
    // 允许所有设备访问所有网络
    {
      "src": ["*"],
      "dst": ["*:*"],
      "ip": ["*"]
    },
    // 允许 VPC 标签设备使用中继节点
    {
      "src": ["tag:vpc"],
      "dst": ["tag:relay"],
      "app": {
        "tailscale.com/cap/relay": []
      }
    }
  ],
  "ssh": [
    {
      "action": "check",
      "src": ["autogroup:member"],
      "dst": ["autogroup:self"],
      "users": ["autogroup:nonRoot", "root"]
    }
  ]
}
```

### 设备标签配置

**访问地址：** https://login.tailscale.com/admin/machines

在设备管理页面，右侧选项点击选择 `Edit ACL tags`，可以为设备打标签：

- `tag:relay` - 标记为中继节点
- `tag:vpc` - 标记为内网 VPC 设备

## 测试连接

### 测试对等中继连接

两台 VPC 节点互相 ping：

```bash
tailscale ping <vpc节点ip>
```

**成功输出示例：**

```
pong from <hostname> (100.xx.xx.xx) via peer-relay(<公网ip>:40000:vni:884) in 88ms
```

### 说明

在内网环境下，如果两台 VPC 节点在同一个局域网（如同一 WiFi 下），不会走中继节点，而是直接通过路由器分配的内网 IP 进行连接。对等中继主要在跨网络环境（如不同 VPC、NAT 后等）下发挥作用。