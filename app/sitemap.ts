import { RecipeService } from '@/service/recipe.service';
import { FuctionCache } from '@/utils/fuctionCache';
import { MetadataRoute } from 'next';

const SITE_BASE_URL = process.env.SITE_BASE_URL || '';
const recipeService = new RecipeService();
const CACHE_DELAY = 1000 * 60 * 1
const cachedRecipesURL = new FuctionCache(async () => {
  return (await recipeService.getAllUrl()).map(v => ({ url: v }))
}, CACHE_DELAY);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipesURL = await cachedRecipesURL.getData() || [];

  return [
    {
      url: SITE_BASE_URL,
    },
    ...recipesURL
  ]
}


function getData() {
  console.log('batata alada')
  return Date.now().toString()
}