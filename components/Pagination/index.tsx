import Link from 'next/link';
import style from './style.module.css'

type props = {
  indexToUrl: (index: number) => string;
  currentIndex: number;
  lastIndex: number;
}

const RECOMENDED_COUNT = 4

export default function Paginantion(props: props) {
  return <div className={style.pagination}>
    {getLeftButtons(props)}
    <a href={props.indexToUrl(props.currentIndex)}>
      <button className={`${style['bt-index']} ${style.selected}`}>{props.currentIndex}</button>
    </a>
    {getRightButtons(props)}
  </div>
}

function createBtn(indexToUrl: (index: number) => string, index: number, isSelected?: true) {
  const url = indexToUrl(index);
  return <a href={url}>
    <button className={`${style['bt-index']} ${isSelected ? style.selected : ''}`}>{index}</button>
  </a>
}
function createDots() {
  return <button className={`${style['bt-index']}`}>...</button>
}
function getLeftButtons(props: props) {
  if (props.currentIndex == 1) return;
  const buttons = Array(props.currentIndex - 2)
    .fill(0).map((m, i) => createBtn(props.indexToUrl, props.currentIndex - i-1));

  return <div className={style['bt-group']}>
    {createBtn(props.indexToUrl, 1)}
    <div className={style['bt-group-area-left']}>
      {buttons}
    </div>
  </div>
}

function getRightButtons(props: props) {
  if (props.lastIndex == props.currentIndex) return;
  const buttons = Array(props.lastIndex - props.currentIndex - 1)
    .fill(0).map((m, i) => createBtn(props.indexToUrl, props.currentIndex + i+1));
  return <div className={style['bt-group']}>
    <div className={style['bt-group-area-right']}>
      {buttons}
    </div>
    {createBtn(props.indexToUrl, props.lastIndex)}
  </div>
}