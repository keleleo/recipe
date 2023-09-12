'run client'
import Link from 'next/link';
import style from './style.module.css'

const tags = [
  'Sobremesa',
  'Saudável',
  'Rápida',
  'Bebidas',
  'Criança',
  'Natal',
  'Churrasco',
]
type props = {
  onSelect?: () => void;
}
function NavTags({ onSelect }: props) {

  return <>
    {
      tags.map((m, i) => <Link key={i}
        href={`/q?search=${m}&page=1`}
        className={style.link}
        onClick={onSelect}
      >{m}</Link>)
    }

  </>
}

export default NavTags;