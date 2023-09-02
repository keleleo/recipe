import { RecipeService } from '@/service/recipe.service';
import { Recipe } from '@/types/Recipe'
import styles from './page.module.css'
import { notFound } from 'next/navigation';
import { Types } from 'mongoose';

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

  return <main className={styles.main}>
    <>
      <title>{recipe.name}</title>
      <meta name="description" content={recipe.name} key="desc" />
      <meta property="og:title" content="Social Title for Cool Page" />
      <meta
        property="og:description"
        content={styles.description}
      />
      <meta
        property="og:image"
        content={getImgUrl(recipe._id)}
      />
    </>
    <section >
      <h1 className={styles.title}>
        {recipe.name}
      </h1>
      <div className={styles.description}>
        {recipe.description}
      </div>
      <div className={styles['image-container']}>
        <img src={getImgUrl(recipe._id)} />
      </div>
    </section>
    <section>
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
    </section>
    <section>
      <h2>Ingredientes</h2>
      <div className={styles.list}>
        {recipe.ingredients.map(getRow)}
      </div>
    </section>
    <section>
      <h2>Etapas</h2>
      <div className={styles.list}>
        {recipe.steps.map(getRow)}
      </div>
    </section>
  </main>
}

function getRow(ingredient: string, index: number) {
  return <div className={styles.row} >
    <label><input type="checkbox" />{ingredient}</label>
  </div>
}