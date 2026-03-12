export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishDate: string;
  readTime: number;
  slug: string;
}

export interface Tag {
  name: string;
  count: number;
}
