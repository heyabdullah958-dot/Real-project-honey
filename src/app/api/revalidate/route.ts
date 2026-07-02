import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate?path=/products
 * Called by admin dashboard after creating or updating a product.
 * Forces Next.js to re-fetch from the backend immediately.
 */
export async function POST(request: NextRequest) {
  try {
    const path = request.nextUrl.searchParams.get('path') || '/products';
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (err: any) {
    return NextResponse.json({ revalidated: false, error: err.message }, { status: 500 });
  }
}
