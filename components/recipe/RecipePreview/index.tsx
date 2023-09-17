import style from './style.module.css'
import Link from 'next/link';
import { RecipeModelDTO } from '@/types/Recipe';
import { imgFromReceId } from '@/utils/imgfromrecipeid';

const SITE_RECIPE_BASE_URL = process.env.SITE_RECIPE_BASE_URL || '';

function RecipePreview({ _id, name = '', description = '', url = '' }: RecipeModelDTO) {
  return (
    <Link href={SITE_RECIPE_BASE_URL + url} className={style['recipe-preview']}>
      <div className={style.header}>{name}</div>
      <div className={style.description}>{description}</div>
      <div className={style.image}>
        {
          // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
          <img src={_id ? imgFromReceId(_id) : ''} />
        }
      </div>
    </Link>
  )
}

export default RecipePreview;