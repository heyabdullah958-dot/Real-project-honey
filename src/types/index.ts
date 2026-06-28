export interface Product {
  id: string;
  name: string;
  mgo: number;
  price: number;
  size: string;
  activityLevel: number; // 1-5 scale for strength/mgo
  rating: number; // 4 or 5 stars as requested
  description: string;
  benefits: string[];
  bestFor: string;
  activity: string;
  taste: string;
  image: string;
  tagline: string;
  color: string;
  slug: string;
  parentSlug?: string;
  stock?: number;
}
