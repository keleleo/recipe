import style from './style.module.css'
import { RecipeModelDTO } from '@/types/Recipe';
import { getHostPath } from '@/utils/envUtils';
import { imgFromReceId } from '@/utils/imgfromrecipeid';

function RecipePreview({ _id, name = '', description = '', url = '' }: RecipeModelDTO) {
  return (
    <a href={getHostPath() + 'r/' + url} className={style['recipe-preview']}>
      <div className={style.header}>{name}</div>
      <div className={style.description}>{description}</div>
      <div className={style.image}>
        {
          // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
          <img src={_id ? imgFromReceId(_id) : ''} />
        }
      </div>
    </a>
  )
}

export default RecipePreview;