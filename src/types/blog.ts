export interface BlogSection {
  title: string;
  content: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  description: string;
  tag: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
  category: "all-posts" | "for-cyclists" | "for-workshop" | "tech-tips";
  sections: BlogSection[];
}
