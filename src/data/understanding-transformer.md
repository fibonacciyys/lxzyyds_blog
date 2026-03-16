# 深入理解 Transformer 架构

Transformer 架构自 2017 年被提出以来，彻底改变了自然语言处理领域。本文将深入解析其核心组件。

## 自注意力机制 (Self-Attention)

自注意力机制是 Transformer 的核心创新。它允许模型在处理序列时，动态地关注输入的不同部分。

### 计算过程

1. **Query, Key, Value**: 将输入向量通过三个不同的线性变换得到 Q、K、V
2. **注意力分数**: 计算 Q 和 K 的点积，得到注意力权重
3. **加权求和**: 使用 softmax 归一化后的权重对 V 进行加权求和

```python
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
```


## 多头注意力 (Multi-Head Attention)

多头注意力允许模型同时关注来自不同表示子空间的信息。

## 位置编码 (Positional Encoding)

由于 Transformer 没有递归或卷积结构，需要显式地注入位置信息。

## 总结

Transformer 的成功在于其并行计算能力和长距离依赖建模能力，这为后续的大语言模型奠定了基础。
