import type { Article, Tag } from "@/types/blog";

export const articles: Article[] = [
  {
    id: "1",
    title: "深入理解 Transformer 架构",
    excerpt: "Transformer 是现代大语言模型的基础架构，本文将深入解析其自注意力机制、多头注意力以及位置编码等核心概念。",
    content: `# 深入理解 Transformer 架构

Transformer 架构自 2017 年被提出以来，彻底改变了自然语言处理领域。本文将深入解析其核心组件。

## 自注意力机制 (Self-Attention)

自注意力机制是 Transformer 的核心创新。它允许模型在处理序列时，动态地关注输入的不同部分。

### 计算过程

1. **Query, Key, Value**: 将输入向量通过三个不同的线性变换得到 Q、K、V
2. **注意力分数**: 计算 Q 和 K 的点积，得到注意力权重
3. **加权求和**: 使用 softmax 归一化后的权重对 V 进行加权求和

\`
\`\`python
import torch
import torch.nn as nn

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super().__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads
        
        self.values = nn.Linear(embed_size, embed_size)
        self.keys = nn.Linear(embed_size, embed_size)
        self.queries = nn.Linear(embed_size, embed_size)
        self.fc_out = nn.Linear(embed_size, embed_size)
\`
\`

## 多头注意力 (Multi-Head Attention)

多头注意力允许模型同时关注来自不同表示子空间的信息。

## 位置编码 (Positional Encoding)

由于 Transformer 没有递归或卷积结构，需要显式地注入位置信息。

## 总结

Transformer 的成功在于其并行计算能力和长距离依赖建模能力，这为后续的大语言模型奠定了基础。`,
    tags: ["深度学习", "NLP", "Transformer", "注意力机制"],
    publishDate: "2024-03-10",
    readTime: 15,
    slug: "understanding-transformer"
  },
  {
    id: "2",
    title: "GPT 模型演进：从 GPT-1 到 GPT-4",
    excerpt: "回顾 OpenAI GPT 系列模型的发展历程，探讨每一代模型的技术突破和应用场景。",
    content: `# GPT 模型演进：从 GPT-1 到 GPT-4

## GPT-1：无监督预训练的突破

2018 年，OpenAI 发布了 GPT-1，首次证明了大规模无监督预训练的有效性。

### 关键创新
- 使用 Transformer 解码器架构
- 在大规模无标注文本上预训练
- 通过微调适应下游任务

## GPT-2：更大的规模，更强的能力

2019 年发布的 GPT-2 将参数量提升到 15 亿，展现出惊人的零样本学习能力。

## GPT-3：少样本学习的里程碑

2020 年的 GPT-3 拥有 1750 亿参数，引入了上下文学习（In-Context Learning）的概念。

## GPT-4：多模态与推理能力

2023 年发布的 GPT-4 不仅支持图像输入，在推理能力上也有显著提升。

## 未来展望

随着模型规模的持续增长，我们正朝着通用人工智能（AGI）迈进。`,
    tags: ["GPT", "OpenAI", "大语言模型", "AI发展"],
    publishDate: "2024-03-08",
    readTime: 12,
    slug: "gpt-evolution"
  },
  {
    id: "3",
    title: "Prompt Engineering 最佳实践",
    excerpt: "掌握提示工程技巧，让你更高效地使用大语言模型。从基础概念到高级技巧全面覆盖。",
    content: `# Prompt Engineering 最佳实践

提示工程（Prompt Engineering）是充分发挥大语言模型能力的关键技能。

## 基础原则

### 1. 清晰明确
- 使用具体的指令
- 避免模糊的描述
- 提供必要的上下文

### 2. 结构化提示
\`
\`\`
角色：你是一位经验丰富的编程导师
任务：解释以下代码的工作原理
代码：
[代码片段]
要求：
1. 逐行解释
2. 指出潜在问题
3. 提供改进建议
\`
\`\`

## 高级技巧

### Chain-of-Thought (CoT)
引导模型逐步思考，提高推理准确性。

### Few-Shot Learning
通过示例让模型理解任务模式。

### 角色设定
为模型设定特定角色，获得更专业的回答。

## 常见陷阱

1. **提示注入攻击**：注意安全性
2. **过度依赖**：验证模型输出
3. **上下文长度**：合理管理 token 数量

## 工具推荐

- LangChain
- PromptLayer
- Weights & Biases`,
    tags: ["Prompt Engineering", "LLM", "最佳实践", "AI应用"],
    publishDate: "2024-03-05",
    readTime: 10,
    slug: "prompt-engineering"
  },
  {
    id: "4",
    title: "扩散模型原理详解",
    excerpt: "从数学原理到实际应用，全面解析扩散模型（Diffusion Models）如何生成高质量图像。",
    content: `# 扩散模型原理详解

扩散模型是近年来图像生成领域最热门的技术之一，Stable Diffusion、DALL-E 2、Midjourney 都基于此架构。

## 核心思想

扩散模型包含两个过程：
1. **前向扩散**：逐步向图像添加噪声
2. **反向去噪**：学习从噪声中恢复图像

## 数学原理

### 前向过程
\`
\`\`
q(x_t | x_{t-1}) = N(x_t; √(1-β_t) x_{t-1}, β_t I)
\`
\`\`

### 反向过程
\`
\`\`
p_θ(x_{t-1} | x_t) = N(x_{t-1}; μ_θ(x_t, t), Σ_θ(x_t, t))
\`
\`\`

## 训练目标

模型学习预测噪声，目标函数为：
\`
\`\`
L = E[||ε - ε_θ(x_t, t)||²]
\`
\`\`

## 条件生成

通过引入条件信息（如文本提示），实现可控生成。

## 应用案例

- 文本到图像生成
- 图像修复
- 超分辨率
- 风格迁移`,
    tags: ["扩散模型", "计算机视觉", "图像生成", "深度学习"],
    publishDate: "2024-03-01",
    readTime: 18,
    slug: "diffusion-models"
  },
  {
    id: "5",
    title: "RAG：检索增强生成实战",
    excerpt: "构建企业级知识库问答系统，结合向量数据库与大语言模型实现智能检索。",
    content: `# RAG：检索增强生成实战

检索增强生成（Retrieval-Augmented Generation, RAG）是解决大语言模型幻觉问题的有效方案。

## 为什么需要 RAG？

### 大语言模型的局限
- 知识截止问题
- 幻觉（Hallucination）
- 无法访问私有数据

## RAG 架构

### 1. 索引阶段
\`
\`\`
文档 → 分块 → Embedding → 向量数据库
\`
\`\`

### 2. 检索阶段
\`
\`\`
查询 → Embedding → 相似度搜索 → 相关文档
\`
\`\`

### 3. 生成阶段
\`
\`\`
查询 + 检索结果 → LLM → 答案
\`
\`\`

## 实现要点

### 文档分块策略
- 固定长度分块
- 语义分块
- 递归分块

### 向量数据库选择
- Pinecone
- Weaviate
- Milvus
- Chroma

### 重排序优化
使用交叉编码器提升检索质量。

## 评估指标

- 检索准确率
- 答案相关性
- 忠实度

## 进阶技巧

- 查询重写
- 多跳检索
- 混合检索（稀疏 + 密集）`,
    tags: ["RAG", "向量数据库", "知识库", "LLM应用"],
    publishDate: "2024-02-28",
    readTime: 14,
    slug: "rag-practice"
  },
  {
    id: "6",
    title: "AI Agent 设计与实现",
    excerpt: "探索智能代理的架构设计，从 ReAct 到 AutoGPT，构建能够自主决策的 AI 系统。",
    content: `# AI Agent 设计与实现

AI Agent（智能代理）是能够感知环境、做出决策并执行动作的智能系统。

## Agent 核心组件

### 1. 规划（Planning）
- 任务分解
- 反思与改进
- 思维链（Chain of Thought）

### 2. 记忆（Memory）
- 短期记忆：对话历史
- 长期记忆：知识存储

### 3. 工具使用（Tool Use）
- API 调用
- 代码执行
- 搜索引擎

## ReAct 框架

ReAct（Reasoning + Acting）将推理和行动结合起来：

\`
\`\`
思考 → 行动 → 观察 → 思考 → ...
\`
\`\`

## 实现示例

\`
\`\`python
class Agent:
    def __init__(self, llm, tools):
        self.llm = llm
        self.tools = tools
    
    def run(self, task):
        while not self.is_complete():
            thought = self.think(task)
            action = self.decide(thought)
            observation = self.execute(action)
            self.update_memory(observation)
\`
\`\`

## 多 Agent 系统

### 协作模式
- 角色分工
- 消息传递
- 共识机制

## 应用场景

- 自动化办公
- 代码助手
- 研究助理
- 客户服务`,
    tags: ["AI Agent", "ReAct", "智能代理", "自动化"],
    publishDate: "2024-02-25",
    readTime: 16,
    slug: "ai-agent-design"
  }
];

export function getAllTags(): Tag[] {
  const tagCount: Record<string, number> = {};
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => article.tags.includes(tag));
}
