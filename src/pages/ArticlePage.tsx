import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getArticleBySlug, articles } from "@/data/articles";
import type { Article } from "@/types/blog";

function ArticleNavigation({ currentArticle }: { currentArticle: Article }) {
  const currentIndex = articles.findIndex((a) => a.id === currentArticle.id);
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
      {prevArticle ? (
        <Link to={`/article/${prevArticle.slug}`} className="group">
          <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <span className="text-xs text-muted-foreground mb-1 block">上一篇</span>
            <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {prevArticle.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
      
      {nextArticle ? (
        <Link to={`/article/${nextArticle.slug}`} className="group md:text-right">
          <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
            <span className="text-xs text-muted-foreground mb-1 block">下一篇</span>
            <p className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {nextArticle.title}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="container max-w-3xl py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
        <p className="text-muted-foreground mb-6">抱歉，您访问的文章不存在。</p>
        <Button onClick={() => navigate("/")}>返回首页</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <article className="container max-w-3xl py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </Button>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag) => (
              <Link key={tag} to={`/tags?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:bg-primary/10 cursor-pointer">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {article.publishDate}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime} 分钟阅读
            </span>
          </div>
        </header>

        <Separator className="mb-8" />

        {/* Content */}
        <MarkdownRenderer content={article.content} />

        {/* Article Navigation */}
        <ArticleNavigation currentArticle={article} />
      </article>
    </div>
  );
}
