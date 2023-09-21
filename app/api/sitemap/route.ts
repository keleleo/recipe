import { RecipeService } from '@/service/recipe.service';
import { NextRequest, NextResponse } from 'next/server';


const recipeService = new RecipeService();

export async function GET(request: NextRequest, teste: any) {
  const index: number | null = Number(request.nextUrl.searchParams.get('index'));
  let urls: string[] = []
  if (index) {
    urls = (await recipeService.getAllUrl(index, 100)).map(generateUrls);
  }

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}</urlset>
  `, {
    status: 200,
    headers: {
      'Content-type': 'text/xml'
    }
  })
}

function generateUrls(url: string): string {
  return `<url>
      <loc>${url}</loc>
      <lastmod>2023-09-21</lastmod>
    </url>`
}