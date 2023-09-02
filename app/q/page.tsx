import RecipePreview from '@/components/recipe/RecipePreview';
import styles from './page.module.css';
import { search } from '@/types/search';
import { RecipeService } from '@/service/recipe.service';
import Link from 'next/link';
import { Metadata } from 'next';

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
  function getLink(v:any, i:number) {
    return <Link href={`/q?search=${searchParams.search}&page=${i+1}`}>{i+1}</Link>
  }
  return <main className={styles.main}>
    {/* <div className={styles['pag-container']}>
    {Array(result.numberOfPages).fill(1).map(getLink)}
    </div> */}
    <div className={styles['recipe-list']}>
      {result.data.map((m, i) => <RecipePreview key={i} {...m}></RecipePreview>)}
    </div>
  </main>
}

export default SearchPage;