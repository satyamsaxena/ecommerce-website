export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at: string;
  user_id: string;
}

export interface Banner {
  id: string;
  title: string;
  image_url: string;
  link: string;
  active: boolean;
  created_at: string;
}