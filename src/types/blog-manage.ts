export interface BlogMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogContentItem {
  id: string;
  blogId: string;
  heading: string;
  details: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBlog {
  id: string;
  title: string;
  slug: string;
  subTitle: string;
  readTime: string;
  images: string[];
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  contents: BlogContentItem[];
  category: BlogCategory;
  author: BlogAuthor;
}

export interface BlogCategoryWithBlogs extends BlogCategory {
  blogs: Omit<AdminBlog, "contents" | "category" | "author">[];
}

export interface BlogCategoryListResponse {
  success: boolean;
  message: string;
  data: {
    meta: BlogMeta;
    data: BlogCategory[];
  };
}

export interface BlogCategoryDetailsResponse {
  success: boolean;
  message: string;
  data: BlogCategoryWithBlogs;
}

export interface BlogListResponse {
  success: boolean;
  message: string;
  data: {
    meta: BlogMeta;
    data: AdminBlog[];
  };
}

export interface BlogDetailsResponse {
  success: boolean;
  message: string;
  data: AdminBlog;
}

export interface BlogMutationResponse {
  success: boolean;
  message: string;
  data: AdminBlog;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  categoryId?: string;
}

export interface BlogFormContentInput {
  heading: string;
  details: string;
}

export interface BlogFormInput {
  title: string;
  subTitle: string;
  readTime: string;
  authorId: string;
  categoryId: string;
  contents: BlogFormContentInput[];
  image?: File;
}

export type BlogUpdateInput = Partial<BlogFormInput>;
