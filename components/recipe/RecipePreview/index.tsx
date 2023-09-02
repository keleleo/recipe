import style from './style.module.css'
import Link from 'next/link';
import { RecipeModelDTO } from '@/types/Recipe';
const IMAGE_URL_BASE = './images/recipe/'
function RecipePreview({ _id, name = '', description = '', url = '' }: RecipeModelDTO) {
  return (
    <Link href={'/r/' + url} className={style['recipe-preview']}>
      <div className={style.header}>{name}</div>
      <div className={style.description}>{description}</div>
      <div className={style.image}>
        {
          // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
          <img src={getUrl(_id?.toString() || "")} />
        }
      </div>
    </Link>)
}
function getUrl(id: string): string {
  return IMAGE_URL_BASE + id + '.jpg'
}
export default RecipePreview;