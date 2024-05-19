import { Recipe } from '@/types/Recipe';
import { imgFromReceId } from './imgfromrecipeid';
import { getHostPath } from './envUtils';


export function getRecipeMetadata(recipe: Recipe | null) {
  if (!recipe || !recipe._id) return {};
  return {
    title: recipe.name,
    description: recipe.description,
    openGraph: {
      type: 'website',
      url: getHostPath() + 'r/' + recipe.url,
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
