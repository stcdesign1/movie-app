import React from 'react'
import { Link } from 'react-router-dom'

const noPoster =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'

const Movies = ({movieData}) => {
  if (!movieData) {
    return null;
  }

  return (
    <div className='movies'>
      <div className='movies-fw-container'>
      {movieData.map(movie => {
        return (
            <Link 
              to={{
                pathname: `/movie/${movie.imdbID}`,
                state: {
                  movieDetails: movie,
                },
                noPoster: noPoster,
              }}
              key={movie.imdbID}
              className='movie'>
                {movie.Poster === "N/A" 
                ? <img src={noPoster} alt='movie poster placeholder' /> 
                : <img src={movie.Poster} alt='movie poster' />}
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </Link>
        )
      })}
      </div>
    </div>
  )
}

export default Movies
