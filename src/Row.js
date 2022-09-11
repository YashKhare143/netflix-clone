import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import "./Row.css"

const base_img_url = "https://image.tmdb.org/t/p/original"

function Row({ title, fetchUrl }) {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl])

    // console.log(movies);



    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row_posters">
            {movies.map(movie =>(
                <img key={movie.id} className='row_poster' src={`${base_img_url}${movie.poster_path}`} alt={movie.name} />
            ))}
            </div>
        </div>
    )
}

export default Row