import { Link, useLocation } from "react-router-dom";
import { BookOpen, Tags, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "首页", icon: Home },
  { path: "/tags", label: "标签", icon: Tags },
  { path: "/about", label: "关于", icon: User },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-5xl items-center px-4 md:px-6">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">lxzyyds的AI知识库</span>
        </Link>
        
        <nav className="flex flex-1 items-center justify-end space-x-2 md:justify-start md:space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4 md:hidden" />
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
