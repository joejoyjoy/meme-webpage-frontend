import React, { useState, createContext } from "react";

export const SearchGifsContext = createContext()

export default function SearchGifsContextProvider(props) {
  const [keyword, setKeyword] = useState('')

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  const value = { keyword, setKeyword, handleSearch }

  return (
    <SearchGifsContext.Provider value={value}>
      {props.children}
    </SearchGifsContext.Provider>
  )
}
