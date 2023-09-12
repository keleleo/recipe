import { RecipeService } from '@/service/recipe.service';
import { Recipe, RecipeModelDTO } from '@/types/Recipe'
import styles from './page.module.css'
import { notFound } from 'next/navigation';
import { Types } from 'mongoose';
import RecipePreview from '@/components/recipe/RecipePreview';

const recipeService = new RecipeService();

interface props {
  params: {
    url: string
  }
}

function getImgUrl(id: Types.ObjectId) {
  return `/images/recipe/${id.toString()}.jpg`
}

export default async function ViewRecipe({ params: { url } }: props) {
  const recipe: Recipe | null = await recipeService.getByUrl(url);
  if (!recipe || !recipe._id) {
    notFound();
  };
  const receitas: RecipeModelDTO[] | null = await recipeService.getByRecipe(recipe);
  return <div className={styles.main}>
    <>
      <title>{recipe.name}</title>
      <meta name="description" content={recipe.name} key="desc" />
      <meta property="og:title" content="Social Title for Cool Page" />
      <meta
        property="og:description"
        content={recipe.description}
      />
      <meta
        property="og:image"
        content={getImgUrl(recipe._id)}
      />
    </>
    <div className={styles.container}>
      <div >
        <h1 className={styles.title}>
          {recipe.name}
        </h1>
        <div className={styles.description}>
          {recipe.description}
        </div>
        <div className={styles['image-container']}>
          <img src={getImgUrl(recipe._id)} />
        </div>
      </div>
      <div>
        <div className={styles.details}>

          <div className={styles.detail}>
            <div>Preparo</div>
            <div>{recipe.details.time}</div>
          </div>
          <div className={styles.detail}>
            <div>Quantidade</div>
            <div>{recipe.details.peopleServed}</div>
          </div>
          <div className={styles.detail}>
            <div>Nível</div>
            <div>{recipe.details.dificult}</div>
          </div>
        </div>
      </div>
      <div>
        <h2>Ingredientes</h2>
        <div className={styles.list}>
          {recipe.ingredients.map(getRow)}
        </div>
      </div>
      <div>
        <h2>Etapas</h2>
        <div className={styles.list}>
          {recipe.steps.map(getRow)}
        </div>
      </div>
    </div>
    <h1>Veja tambem:</h1>
    <div className={styles['recipe-list']}>
      {receitas.map((m, i) => <RecipePreview key={i} {...m}></RecipePreview>)}
    </div>
  </div>
}

function getRow(ingredient: string, index: number) {
  return <div className={styles.row} >
    <label><input type="checkbox" />{ingredient}</label>
  </div>
}