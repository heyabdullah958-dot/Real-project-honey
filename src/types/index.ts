export interface Product {
  id: string;
  name: string;
  mgo: number;
  price: number;
  size: string;
  potency: number; // 1-5 stars
  description: string;
  benefits: string[];
  bestFor: string;
  antibacterial: string;
  taste: string;
  image: string;
  imageLid: string;
  tagline: string;
  color: string;
  slug: string;
}
