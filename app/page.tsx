import styles from './page.module.css'
import RecipePreview from '@/components/recipe/RecipePreview'
import { RecipeService } from '@/service/recipe.service'
import { Metadata } from 'next';

export function metadata(): Metadata {
  return {
    title: 'Receitas',
    description: 'Site de Receitas',
  }
}

const recipeService = new RecipeService();

export default async function Home() {
  const recipes = await recipeService.search({ search: '', page: 1 });

  return (
    <main className={styles.main}>
      <div className={styles['recipe-list']}>
        {recipes.data.map((m, i) => <RecipePreview key={i} {...m}></RecipePreview>)}
      </div>
    </main>
  )
}
