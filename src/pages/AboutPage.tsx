import { User, Mail, Github, Twitter, BookOpen, Code, Brain, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const skills = [
  "机器学习",
  "深度学习",
  "自然语言处理",
  "计算机视觉",
  "大语言模型",
  "Python",
  "PyTorch",
  "TensorFlow",
];

const interests = [
  { icon: Brain, label: "人工智能研究", description: "探索前沿AI技术" },
  { icon: Code, label: "开源贡献", description: "参与开源项目开发" },
  { icon: BookOpen, label: "技术写作", description: "分享学习心得" },
  { icon: Sparkles, label: "创新应用", description: "将AI落地到实际场景" },
];

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-3xl py-8 md:py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6">
            <User className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">关于我</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            一名热爱人工智能技术的开发者，致力于探索AI的无限可能，
            并将学习过程中的收获分享给大家。
          </p>
        </div>

        {/* Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">技术栈</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">兴趣方向</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {interests.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* About This Blog */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">关于本站</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              lxzyyds的AI知识库是一个专注于人工智能领域的技术博客。这里记录了我的学习历程、
              技术探索和实践心得。内容涵盖深度学习、大语言模型、计算机视觉等多个方向。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              希望这个知识库能够帮助到同样在AI领域学习探索的你。如果你有任何问题或建议，
              欢迎通过以下方式与我联系。
            </p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Contact */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">联系方式</h2>
          <div className="flex items-center justify-center space-x-6">
            <a
              href="mailto:contact@example.com"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>邮箱</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
