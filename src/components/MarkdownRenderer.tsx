import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn(
      "prose prose-slate dark:prose-invert max-w-none",
      "prose-headings:scroll-mt-20",
      "prose-h1:text-3xl prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b prose-h1:border-border prose-h1:font-bold",
      "prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:font-bold",
      "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-bold",
      "prose-p:leading-7 prose-p:mb-0",
      "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
      "prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono",
      "prose-pre:!bg-transparent prose-pre:!border-none prose-pre:!p-0",
      "prose-pre:code:!bg-transparent prose-pre:code:!p-0 prose-pre:code:text-sm",
      "prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6",
      "prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6",
      "prose-li:my-1 prose-li:marker:text-muted-foreground",
      "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground",
      "prose-img:rounded-lg prose-img:border prose-img:border-border",
      "prose-hr:my-8 prose-hr:border-border",
      "prose-table:w-full prose-table:border-collapse",
      "prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted prose-th:font-bold",
      "prose-td:border prose-td:border-border prose-td:p-2",
      className
    )}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            if (!inline && match) {
              return (
                <div className="my-2 rounded-lg bg-muted/80 border border-border p-3">
                  <pre className={cn(className, "!m-0 !bg-transparent")} {...props}>
                    <code className={cn(className, "!bg-transparent !p-0")}>{children}</code>
                  </pre>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
