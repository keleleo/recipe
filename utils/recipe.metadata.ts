import { Recipe } from '@/types/Recipe';
import { imgFromReceId } from './imgfromrecipeid';

const SITE_RECIPE_BASE_URL = process.env.SITE_RECIPE_BASE_URL || '';

export function getRecipeMetadata(recipe: Recipe | null) {
  if (!recipe || !recipe._id) return {};
  return {
    title: recipe.name,
    description: recipe.description,
    openGraph: {
      type: 'website',
      url: SITE_RECIPE_BASE_URL + 'r/' + recipe.url,
      title: recipe.name,
      description: recipe.description,
      images: [{
        url: imgFromReceId(recipe._id)
      }]
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
    }
  }
}
