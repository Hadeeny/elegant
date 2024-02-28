export interface ProductSliderProps {
  title: string;
  products: Product[];
}

export interface Product {
  id: number | string;
  name: string;
  image: string;
  price: number | string;
  discount: string | number;
}

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};
