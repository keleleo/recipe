import { RecipeService } from '@/service/recipe.service';
import { validateToken } from '@/utils/apiUtils';
import { usePathname } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

const recipeService = new RecipeService();

export async function GET(request: NextRequest) {

  if (!validateToken(request.headers.get('token'))) {
    return new Response('', { status: 401 })
  };
  const search = request.nextUrl.searchParams.get('search') || '';
  const page = Number(request.nextUrl.searchParams.get('page')) || 0

  if (!search) {
    return NextResponse.json({ numberOfPages: 0, data: [] })
  }

  const res = await recipeService.search({
    search,
    page,
  })
  return NextResponse.json(res)
}