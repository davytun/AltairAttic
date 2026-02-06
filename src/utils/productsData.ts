export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  specs: string[];
  slug: string;
}

export const products: Product[] = [];
