import { RecipeService } from '@/service/recipe.service';
import { FuctionCache } from '@/utils/fuctionCache';
import { getHostPath } from '@/utils/envUtils';
import { MetadataRoute } from 'next';

const recipeService = new RecipeService();
const CACHE_DELAY = 1000 * 60 * 1

const cachedRecipeCount = new FuctionCache(async () => {
  return (await recipeService.getSearchNumberOfPage("", 1000))
}, CACHE_DELAY);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipeCount = await cachedRecipeCount.getData();

  return [
    {
      url: getHostPath(),
    },
    ...Array(recipeCount || 0).fill(1).map((v, i) => ({
      url: `${getHostPath()}recipe-sitemap.xml?index=${i+1}`
    }))
  ]
}