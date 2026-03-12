import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Tag, Hash, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllTags, getArticlesByTag, articles } from "@/data/articles";

export function TagsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const tags = getAllTags();

  const filteredArticles = useMemo(() => {
    if (!selectedTag) return [];
    return getArticlesByTag(selectedTag);
  }, [selectedTag]);

  const handleTagClick = (tagName: string) => {
    if (selectedTag === tagName) {
      setSearchParams({});
    } else {
      setSearchParams({ tag: tagName });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-5xl py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Hash className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">标签分类</h1>
          <p className="text-muted-foreground">
            共 {tags.length} 个标签，{articles.length} 篇文章
          </p>
        </div>

        {/* Tags Cloud */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              所有标签
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => handleTagClick(tag.name)}
                  className="focus:outline-none"
                >
                  <Badge
                    variant={selectedTag === tag.name ? "default" : "secondary"}
                    className="cursor-pointer text-sm py-1 px-3 transition-all hover:scale-105"
                  >
                    {tag.name}
                    <span className="ml-1.5 text-xs opacity-70">({tag.count})</span>
                  </Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Articles by Tag */}
        {selectedTag && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                "{selectedTag}" 相关文章
                <Badge variant="secondary" className="ml-2">
                  {filteredArticles.length}
                </Badge>
              </h2>
              <button
                onClick={() => setSearchParams({})}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                清除筛选
              </button>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">该标签下暂无文章</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* All Articles Preview (when no tag selected) */}
        {!selectedTag && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              点击上方标签查看相关文章
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
