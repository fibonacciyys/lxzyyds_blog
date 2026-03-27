# AstrBot 部署及使用

## 目录

- [部署](#部署)
  - [Docker 部署](#docker-部署)
  - [Docker Compose 部署](#docker-compose-部署)
- [使用](#使用)
  - [进入 WebUI 配置](#进入-webui-配置)
  - [接入 QQ 机器人](#接入-qq-机器人)
  - [配置模型](#配置模型)
  - [配置 MCP](#配置-mcp)
  - [配置 Skill](#配置-skill)

## 部署

### 项目信息

- **GitHub 仓库：** https://github.com/AstrBotDevs/AstrBot
- **官方文档：** https://docs.astrbot.app/what-is-astrbot.html

### Docker 部署

```bash
# 创建项目目录
mkdir astrbot
cd astrbot

# 运行容器
sudo docker run -itd \
  -p 6185:6185 \
  -p 6199:6199 \
  -v $PWD/data:/AstrBot/data \
  -v /etc/localtime:/etc/localtime:ro \
  -v /etc/timezone:/etc/timezone:ro \
  --name astrbot \
  --restart unless-stopped \
  soulter/astrbot:latest
```

### Docker Compose 部署

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  astrbot:
    image: soulter/astrbot:latest
    container_name: astrbot
    ports:
      - "6185:6185"
      - "6199:6199"
    volumes:
      - ./data:/AstrBot/data
      - /etc/localtime:/etc/localtime:ro
      - /etc/timezone:/etc/timezone:ro
    restart: unless-stopped
```

启动服务：

```bash
docker-compose up -d
```

## 使用

### 进入 WebUI 配置

浏览器访问 `http://<服务器IP>:6185` 进入 WebUI，按照提示设置管理员用户名和密码。

**注意：** 初次访问需要初始化配置，请妥善保存管理员账号信息。

### 接入 QQ 机器人

#### 申请机器人账号

使用 QQ 机器人龙虾专用入口注册（可跳过 IP 白名单等配置）：

**申请地址：** https://q.qq.com/qqbot/openclaw/login.html

申请流程：

1. 使用 QQ 账号登录
2. 创建机器人应用
3. 获取 `AppID` 和 `AppSecret`
4. 保存凭证信息

#### 配置机器人账号

在 AstrBot WebUI 中配置：

1. 点击左侧菜单 `机器人`
2. 点击 `创建机器人`
3. 填写信息：
   - **AppID**：从 QQ 开放平台获取
   - **AppSecret**：从 QQ 开放平台获取
   - **启用**：勾选启用选项
   - **消息列表单聊**：勾选允许单聊
4. 点击 `保存`

配置完成后，机器人即可在 QQ 中使用。

### 配置模型

#### ModelScope 配置

ModelScope 提供多种 AI 模型，支持对话、代码生成等任务。

**配置步骤：**

1. 访问 ModelScope 官网：https://www.modelscope.cn/

2. 注册并登录账号

3. 创建 API 应用：
   - 进入控制台
   - 创建新应用
   - 获取 API Key

4. 在 AstrBot WebUI 中配置：
   - 进入 `模型` -> `模型配置`
   - 添加 ModelScope 提供商
   - 填入 API Key

5. 选择模型：

   访问模型列表选择合适的模型：
   https://www.modelscope.cn/models?filter=inference_type&page=1&tabKey=task

   **推荐模型：**
   - MiniMax-M2.5
   - Kimi-K2.5
   - GLM-4.7-Flash

#### 其他模型提供商

AstrBot 还支持以下模型提供商：

- OpenAI（需配置代理）
- Google Gemini
- 本地模型（Ollama）
- ...

### 配置 MCP

MCP（Model Context Protocol）允许机器人调用外部服务，扩展功能。

#### 高德地图 MCP 服务器示例

**创建项目和 Key：**

1. 访问高德开放平台：https://lbs.amap.com/api/mcp-server/create-project-and-key

2. 注册并创建应用

3. 获取 Key

4. 在 AstrBot WebUI 中配置：
   - 进入 `插件` -> `MCP`
   - 添加高德 MCP 服务器
   - 填入 Key

**使用示例：**

```
用户：北京到上海有多远？
机器人：北京到上海约 1200 公里
```

#### 其他 MCP 服务器

- 天气服务 MCP
- 新闻资讯 MCP
- 音乐播放 MCP
- 自定义 MCP（基于 OpenAPI 规范）

### 配置 Skill

Skill 是机器人的技能插件，可实现特定功能。

#### news-aggregator-skill 示例

news-aggregator-skill 用于聚合和监控各类新闻资讯、arXiv 论文等内容。

**配置步骤：**

1. 访问项目地址：https://clawhub.ai/cclank/news-aggregator-skill

2. 了解功能和使用方法

3. 在 AstrBot WebUI 中配置：
   - 进入 `插件` -> `Skill`
   - 搜索并安装 news-aggregator-skill
   - 配置订阅关键词

**使用示例：**

```
用户：订阅深度学习相关新闻
机器人：已为您订阅深度学习相关新闻，有新内容时会通知您

用户：查看最新新闻
机器人：今天有以下新内容...
```

#### 其他推荐 Skill

- **天气查询** - 获取实时天气
- **翻译助手** - 多语言翻译
- **日程管理** - 待办事项提醒
- **知识问答** - 基于知识库的问答
- **代码助手** - 代码生成和解释

### 常见命令

在 QQ 中与机器人交互的常用命令：

```
/对话 <内容>      # AI 对话
/翻译 <内容>      # 翻译文本
/天气 <城市>      # 查询天气
/帮助             # 查看所有命令
```

### 管理命令

在 WebUI 中可以管理机器人：

- **日志查看**：查看机器人运行日志
- **插件管理**：启用/禁用插件
- **用户管理**：管理机器人用户
- **统计信息**：查看使用统计

## 故障排查

### 容器无法启动

```bash
# 查看容器日志
docker logs astrbot

# 检查端口占用
sudo netstat -tlnp | grep -E '6185|6199'

# 重启容器
docker restart astrbot
```

### 机器人无响应

1. 检查 QQ 机器人状态
2. 确认 AppID 和 AppSecret 正确
3. 查看日志排查错误
4. 检查网络连接

### 模型调用失败

1. 确认 API Key 有效
2. 检查模型服务是否正常
3. 查看网络连接和代理设置

## 注意事项

1. **安全**：妥善保存 API Key 和机器人凭证
2. **更新**：定期更新镜像以获取新功能
3. **备份**：定期备份 `/AstrBot/data` 目录
4. **监控**：关注资源使用情况，及时扩容
