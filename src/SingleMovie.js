import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'

const url = `https://www.omdbapi.com/?apikey=309c6e31`

const SingleMovie = () => {
  const location = useLocation();
  const { movieDetails } = location.state;
  const [movieInfo, setMovieInfo] = useState({
    isLoading: true,
    movieData: {},
  });
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${url}&i=${movieDetails.imdbID}&plot=full`)
    .then(response => {if (!response.ok) throw new Error(response.status); return response})
    .then(response => response.json())
    .then(data => setMovieInfo({movieData: data, isLoading: false}))
    .catch((error) => {
      setError(error);
    })
  }, [movieDetails])

  if(error) {
    return (
      <div>
        <h1>There was an error loading your data</h1>
        <button><Link to="/">Back to Movies</Link></button>
      </div>
    )
  }


  return (
    <>
    <div className='content content-single-movie'>
    <Header />
      {movieInfo.isLoading ? <Loading />
      : 
      <div className='movie-details'>
        <img 
        src={movieInfo.movieData.Poster === "N/A"
        ? location.noPoster
        : movieInfo.movieData.Poster}
        className='movie-image' 
        alt='movie poster'
        />
        <div className='movie-description'>
          <h1>{movieInfo.movieData.Title}</h1>
          <p className='movie-description-title-block'>
            <span>{movieInfo.movieData.Year}</span>
            <span>|</span>
            <span>{movieInfo.movieData.Genre}</span>
            <span>|</span>
            <span>{movieInfo.movieData.Runtime}</span>
            {movieInfo.movieData.imdbRating !== 'N/A' && 
              <span className='movie-description-rating'>
                <img 
                  src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/320px-IMDB_Logo_2016.svg.png'
                  alt='imdb icon'
                />
                {movieInfo.movieData.imdbRating}
              </span>
            }
          </p>
          
          {movieInfo.movieData.Awards.includes('Oscar') && 
            <div className='movie-description-awards'>
              <p>{movieInfo.movieData.Awards}</p>
            </div>
          }
          {movieInfo.movieData.Plot !== 'N/A' && 
            <>
            <h3>Plot</h3>
            <p>{movieInfo.movieData.Plot}</p>
            </>
          }
          {movieInfo.movieData.Actors !== 'N/A' && 
            <>
            <h3>Cast</h3>
            <p>{movieInfo.movieData.Actors}</p>
            </>
          }
          {movieInfo.movieData.Director !== 'N/A' && 
            <>
            <h3>Director</h3>
            <p>{movieInfo.movieData.Director}</p>
            </>
          }
          {movieInfo.movieData.BoxOffice !== 'N/A' && 
            <>
            <h3>Box Office</h3>
            <p>{movieInfo.movieData.BoxOffice} (US and Canada)</p>
            </>
          }
          
          <Link to="/"><button className='button button-medium'>Back to Movies</button></Link>
        </div>
      </div>
      }
    </div>
    <Footer />
    </>
  )
  
}

export default SingleMovie
