'run client'
import { CgSearch } from "react-icons/cg";
import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import style from './style.module.css'
import { useRouter, useSearchParams } from 'next/navigation';
type props = {
  className?: string;
  onSearch?: () => void;
}
function Searchbar({ className = '',onSearch }: props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get('search') || "");

  function handleOnInput(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key != 'Enter') return;
    search();
  }

  function search() {
    if (!text) return;
    if (onSearch) onSearch();
    router.push(`/q?search=${text}&page=1`)
  }

  return <div className={`${className || ""} ${style.searchbar}`}>
    <input type="text" value={text} onChange={handleOnInput}
      onKeyDown={handleKey} />
    <button className={style['button-search']} onClick={search}>
      <CgSearch />
    </button>
  </div>
}

export default Searchbar;