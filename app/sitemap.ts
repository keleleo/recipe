import { RecipeService } from '@/service/recipe.service';
import { FuctionCache } from '@/utils/fuctionCache';
import { MetadataRoute } from 'next';

const SITE_BASE_URL = process.env.SITE_BASE_URL || '';
const recipeService = new RecipeService();
const CACHE_DELAY = 1000 * 60 * 1

const cachedRecipeCount = new FuctionCache(async () => {
  return (await recipeService.getSearchNumberOfPage("", 1000))
}, CACHE_DELAY);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipeCount = await cachedRecipeCount.getData();

  return [
    {
      url: SITE_BASE_URL,
    },
    ...Array(recipeCount || 0).fill(1).map((v, i) => ({
      url: `${SITE_BASE_URL}recipe-sitemap.xml?index=${i+1}`
    }))
  ]
}