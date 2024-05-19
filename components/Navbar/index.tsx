'use client'
import { MdRestaurantMenu } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react'
import style from './style.module.css'
import Searchbar from './Searchbar'
import NavTags from './NavTags'

function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const openClass = isOpen ? style.open : ''

  function handleMenuIcon() {
    setOpen(!isOpen)
  }
  function closeMenu() {
    setOpen(false)
  }
  return <div className={`${style.navbar} ${openClass}`}>
    <div className={`${style.group}`}>
      <div className={style['icon-menu']} onClick={handleMenuIcon}>
        <AiOutlineMenu />
      </div>
      <div className={style.logo}>
        <a href={'/'} >Receitas</a></div>
    </div>
    <div className={style.content}>
      <div className={`${style['button-group']}`}>
        <h2>Recomendado:</h2>
        <NavTags onSelect={closeMenu} />
      </div>
      <div className={`${style.group}`}>
        <div className={style['icon-menu']} onClick={handleMenuIcon}>
          <MdRestaurantMenu />
        </div>
        <Searchbar className={`${style['search-bar']}`} onSearch={closeMenu} />
      </div>
    </div>

  </div>
}

export default Navbar