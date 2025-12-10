export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  createdDate: Date;
  author: string;
  category?: string;
  tags?: string[];
}
