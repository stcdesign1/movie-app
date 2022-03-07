import React, { useEffect, useState } from 'react'

const SearchForm = ({setSearchTerm}) => {
  const [searchInput, setSearchInput] = useState(() => {
    let storedValue = JSON.parse(sessionStorage.getItem("searchInput"));
    return storedValue || "";
  });

  useEffect(() => {
    sessionStorage.setItem("searchInput", JSON.stringify(searchInput));
  }, [searchInput])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput) return;
    setSearchTerm(searchInput)
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className='search-form' name='search' data-netlify='true'>
      <input value={searchInput} type="text" onChange={e => setSearchInput(e.currentTarget.value)} aria-label="search term" />
      <button className='button button-large' type="submit" aria-label="search">Search</button>
    </form>
  )
}

export default SearchForm
