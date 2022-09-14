import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import "./Row.css"
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import { useStateValue } from './StateProvider';
import { actionTypes } from "./reducer";



const base_img_url = "https://image.tmdb.org/t/p/w500"


function Row({ title, fetchUrl }) {

    const [movies, setMovies] = useState([]);

    const [{ trailerURL }, dispatch] = useStateValue();

    const opts = {
        height: "768",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3${fetchUrl}`);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl])


    // console.log(movies);
    const handleClick = (movie) => {
        if (trailerURL) {
      
            dispatch({
                type: actionTypes.SET_trailerURL,
                trailerURL: null,
            });
        } else {
            console.log(movie?.name)
            movieTrailer(movie?.name || movie?.title)
                .then(url => {
                    const urlParms = new URLSearchParams(
                        new URL(url).search
                    )
                    
                    dispatch({
                        type: actionTypes.SET_trailerURL,
                        trailerURL: urlParms.get("v"),
                    });

                    // url = trailerUrl;
                }).catch((e) => console.log(e))
        }
    }



    return (

        <div className='row'>

            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (

                        <img key={movie.id} className='row_poster'
                        
                            data-bs-toggle="modal" data-bs-target="#youtubeModal"
                            onClick={() => handleClick(movie)}
                            src={`${base_img_url}${movie.poster_path}`} alt={movie.name} />

                ))}

            </div>


        </div>
    )



}

export default Row;