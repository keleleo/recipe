import RecipePreview from '@/components/recipe/RecipePreview';
import styles from './page.module.css';
import { search } from '@/types/search';
import { RecipeService } from '@/service/recipe.service';
import { Metadata } from 'next';
import Paginantion from '../../components/Pagination/index';

export function metadata(): Metadata {
  return {
    title: 'Pesquisar Receitas',
    description: 'Site de Receitas - feitos apra aprendizado',
  }
}

type props = {
  searchParams: search
}

const recipeService = new RecipeService();

async function SearchPage({ searchParams }: props) {
  const result = await recipeService.search(searchParams);

  const currentIndex = Math.min(Number(searchParams.page) || 1, result.numberOfPages || 1)
  return <main className={styles.main}>
    <div className={styles['pag-container']}>
      <Paginantion
        currentIndex={currentIndex}
        indexToUrl={(i) => `/q?search=${searchParams.search}&page=${i}`}
        lastIndex={result.numberOfPages || 1}
      ></Paginantion>
    </div>
    <div className={styles['recipe-list']}>
      {result.data.map((m, i) => <RecipePreview key={i} {...m}></RecipePreview>)}
    </div>
  </main>
}

export default SearchPage;