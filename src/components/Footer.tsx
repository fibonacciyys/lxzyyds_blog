import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/40">
      <div className="container max-w-5xl mx-auto py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} lxzyyds的AI知识库. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              探索人工智能的无限可能
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/fibonacciyys/lxzyyds_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:1102330475@qq.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
