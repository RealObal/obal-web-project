export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  published_date: string;
  image_url: string;
  created_at: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
