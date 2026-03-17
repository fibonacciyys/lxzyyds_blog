import type { Article, Tag } from "@/types/blog";
import aiAgentDesign from "./ai-agent-design.md?raw";
import astrbotUsage from "./astrbot-usage.md?raw";
import ragPractice from "./rag-practice.md?raw";
import understandingFlashAttention from "./understanding-flashattention.md?raw";
import understandingTransformer from "./understanding-transformer.md?raw";
import proxyTencentCloudDockerRegistryMirrors from "./proxy-tencent-cloud-docker-registry-mirrors.md?raw";
import tailscaleDeploy from "./tailscale-deploy.md?raw";

export const articles: Article[] = [
  {
    id: "1",
    title: "深入理解 Transformer 架构",
    excerpt: "Transformer 是现代大语言模型的基础架构，本文将深入解析其自注意力机制、多头注意力以及位置编码等核心概念。",
    content: understandingTransformer,
    tags: ["深度学习", "NLP", "Transformer", "注意力机制"],
    publishDate: "2024-03-10",
    readTime: 15,
    slug: "understanding-transformer"
  },
  {
    id: "2",
    title: "理解FlashAttention",
    excerpt: "深入解析 FlashAttention 论文，了解高效注意力机制的原理与实现。",
    content: understandingFlashAttention,
    tags: ["深度学习", "FlashAttention", "注意力机制", "性能优化"],
    publishDate: "2025-03-10",
    readTime: 8,
    slug: "understanding-flashattention"
  },
  {
    id: "3",
    title: "RAG：检索增强生成实战",
    excerpt: "构建企业级知识库问答系统，结合向量数据库与大语言模型实现智能检索。",
    content: ragPractice,
    tags: ["RAG", "向量数据库", "知识库", "LLM应用"],
    publishDate: "2026-03-11",
    readTime: 14,
    slug: "rag-practice"
  },
  {
    id: "4",
    title: "AI Agent 设计与实现",
    excerpt: "探索智能代理的架构设计，从 ReAct 到 AutoGPT，构建能够自主决策的 AI 系统。",
    content: aiAgentDesign,
    tags: ["AI Agent", "ReAct", "智能代理", "自动化"],
    publishDate: "2026-03-14",
    readTime: 16,
    slug: "ai-agent-design"
  },
  {
    id: "5",
    title: "AstrBot 部署及使用",
    excerpt: "快速部署 AstrBot QQ 机器人，接入大语言模型实现智能对话。",
    content: astrbotUsage,
    tags: ["AstrBot", "QQ机器人", "部署", "LLM"],
    publishDate: "2026-03-16",
    readTime: 10,
    slug: "astrbot-usage"
  },
  {
    id: "6",
    title: "腾讯云 Docker 镜像加速",
    excerpt: "配置腾讯云 Docker 镜像加速，提升镜像拉取速度。",
    content: proxyTencentCloudDockerRegistryMirrors,
    tags: ["Docker", "腾讯云", "镜像加速", "部署"],
    publishDate: "2026-03-17",
    readTime: 5,
    slug: "proxy-tencent-cloud-docker-registry-mirrors"
  },
  {
    id: "7",
    title: "Tailscale 部署指南",
    excerpt: "使用 Tailscale 搭建安全内网穿透，实现远程访问。",
    content: tailscaleDeploy,
    tags: ["Tailscale", "内网穿透", "VPN", "部署"],
    publishDate: "2026-03-17",
    readTime: 8,
    slug: "tailscale-deploy"
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
