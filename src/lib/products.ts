import { Product } from "@/types";
import { products as staticProducts } from "./data";

const DEFAULT_BACKEND_URL = "http://localhost:5000";

/**
 * Resolves the absolute URL of an image. If the image path is relative (e.g. starts with /uploads/),
 * it prepends the backend URL, otherwise it returns it as is.
 */
export function getProductImageUrl(imagePath: string): string {
  if (!imagePath) return "/assets/products/mgo-800.png";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
  // Ensure we don't double slash
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${backendUrl}${cleanPath}`;
}

/**
 * Fetches all active products from the database, falling back to static products if unavailable.
 */
export async function getProducts(): Promise<Product[]> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
  try {
    const res = await fetch(`${backendUrl}/api/products`, {
      next: { revalidate: 30 } // Cache and revalidate every 30 seconds
    });
    
    if (!res.ok) {
      throw new Error(`Backend API returned status ${res.status}`);
    }
    
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((p: any) => ({
        ...p,
        id: p.slug, // Map slug to id for frontend type compatibility
        image: getProductImageUrl(p.image)
      }));
    }
  } catch (error) {
    console.warn("Express backend API unreachable. Falling back to static products data.", error);
  }
  
  // Return static products with resolved images if relative
  return staticProducts.map(p => ({
    ...p,
    image: getProductImageUrl(p.image)
  }));
}

/**
 * Fetches a single product by slug, falling back to static products if unavailable.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || DEFAULT_BACKEND_URL;
  try {
    const res = await fetch(`${backendUrl}/api/products/${slug}`, {
      next: { revalidate: 30 }
    });
    
    if (res.status === 404) {
      return null;
    }
    
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const p = json.data;
        return {
          ...p,
          id: p.slug,
          image: getProductImageUrl(p.image)
        };
      }
    }
  } catch (error) {
    console.warn(`Express backend API unreachable for product ${slug}. Falling back to static list.`, error);
  }
  
  const staticMatch = staticProducts.find(p => p.slug === slug);
  if (staticMatch) {
    return {
      ...staticMatch,
      image: getProductImageUrl(staticMatch.image)
    };
  }
  
  return null;
}
