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

function NavTags() {

  return <>
    {
      tags.map(m=><Link href={`/q?search=${m}&page=1`} className={style.link}>{m}</Link>)
    }
    
  </>
}

export default NavTags;