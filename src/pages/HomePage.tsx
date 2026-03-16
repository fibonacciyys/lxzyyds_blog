import { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ArticleCard } from "@/components/ArticleCard";
import { articles } from "@/data/articles";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    
    const query = searchQuery.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full border-b border-border/40 bg-muted/30">
        <div className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              lxzyyds的AI知识库
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              探索人工智能的前沿技术，分享深度学习的实践经验，
              记录AI领域的学习心得与技术洞察。
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索文章、标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container max-w-5xl py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">最新文章</h2>
          <span className="text-sm text-muted-foreground">
            共 {filteredArticles.length} 篇
          </span>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">没有找到匹配的文章</p>
          </div>
        )}
      </section>
    </div>
  );
}
