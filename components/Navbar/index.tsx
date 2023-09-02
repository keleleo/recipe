'use client'
import { useState } from 'react'
import style from './style.module.css'
import Searchbar from './Searchbar'
import NavTags from './NavTags'
import Link from 'next/link'

function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const openClass = isOpen ? 'open' : ''

  function handleMenuIcon() {
    setOpen(!isOpen)
  }

  return <div className={`${style.navbar} ${openClass}`}>
    <div className={style['icon-menu']} onClick={handleMenuIcon}>MenuIcon</div>
    <div className={`${style.group}`}>
      <div className={style.logo}>
        <Link href={'/'}>Recitas</Link></div>
    </div>
    <div className={style.content}>

      <div className={`${style.group} ${style['button-group']}`}>
        <NavTags />
      </div>
      <div className={style.group}>
        <Searchbar />
      </div>
    </div>

  </div>
}

export default Navbar