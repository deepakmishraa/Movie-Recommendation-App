import React from 'react';
import './ExploreContainer.css';

const MovieBox = ({list}:any) => {
    return (
        <div className="movie-box">
            <div className="overlay">
            <img src={`https://image.tmdb.org/t/p/w200/${ list && list.poster_path}`} alt={`${list && list.title} Poster`}/>
            <p className="font">{`${list && list.title} Poster`}</p>
            </div>
        </div>
    )
}

export default MovieBox
