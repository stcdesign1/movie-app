import React, { useEffect, useState } from 'react'
import Form from './SearchForm'
import Movies from './Movies'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'

const url = `https://www.omdbapi.com/?apikey=309c6e31`

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(() => {
    let storedValue = JSON.parse(sessionStorage.getItem("searchTerm"));
    return storedValue || "";
  });
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  function infiniteScroll() {
    if ((window.scrollY + window.innerHeight) >= window.document.body.scrollHeight) {
      if ((totalResults - searchData.length) >= 10) {
        setPage(page + 1);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll)
  })

  useEffect(() => {
    sessionStorage.setItem("searchTerm", JSON.stringify(searchTerm));
  }, [searchTerm])


  useEffect(() => {
    setLoading(true);
    fetch(`${url}&s=${searchTerm}&type=movie&page=${page}`)
    .then(response => {if (!response.ok) throw new Error(response.status); return response})
    .then(response => response.json())
    .then(data => {
      setTotalResults(parseInt(data.totalResults));
      if (page === 1) {
        setSearchData(data.Search);
      } else {
        setSearchData(previousData => {
          return [...previousData, ...data.Search]
        });
      }
    })
    .catch((error) => {
      setError(error);
    })
    setLoading(false);
  }, [searchTerm, page])

  return (
    <>
    <div className='content'>
      <Header />
      <div className='home-header'>
        <h1>Search for Movies</h1>
        <Form setSearchTerm={setSearchTerm} setPage={setPage}/>
      </div>
      {
        error 
        ? <p className='error'>There was an error loading your data!</p>
        : loading 
          ? <Loading /> 
          : <Movies movieData={searchData}/>
      }
    </div>
    <Footer />
    </>
  )
}

export default Home
