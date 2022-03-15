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

  // function infiniteScroll() {
  //   if ((window.scrollY + window.innerHeight) >= window.document.body.scrollHeight) {
  //     console.log(window.scrollY)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', infiniteScroll)
  // })

  useEffect(() => {
    sessionStorage.setItem("searchTerm", JSON.stringify(searchTerm));
  }, [searchTerm])

  useEffect(() => {
    setLoading(true);
    fetch(`${url}&s=${searchTerm}&type=movie`)
    .then(response => {if (!response.ok) throw new Error(response.status); return response})
    .then(response => response.json())
    .then(data => setSearchData(data.Search))
    .catch((error) => {
      setError(error);
    })
    setLoading(false);
  }, [searchTerm])

  return (
    <>
    <div className='content'>
      <Header />
      <div className='home-header'>
        <h1>Search for Movies</h1>
        <Form setSearchTerm={setSearchTerm}/>
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
