import React from 'react'
import { useState, useEffect } from 'react'
import "./Banner.css"
import axios from 'axios';
import requests from './requests';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import movieTrailer from 'movie-trailer';
import { useStateValue } from './StateProvider';
import { actionTypes } from "./reducer";

function Banner() {
    const [{ trailerURL }, dispatch] = useStateValue();
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`);
            setMovie(
                // randomly select one move from the array
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            );
            return request;
        }
        fetchData();
    }, [])
    console.log("movie: ", movie)
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

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
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>

            <div className="banner_contents">
                <h1 className='banner_title'>{movie?.name || movie?.title || movie?.original_name}</h1>

                <button className="banner_button hide" data-bs-toggle="modal" data-bs-target="#youtubeModal" onClick={() => handleClick(movie)}><PlayArrowIcon  />Play</button>

                <h1 className="banner_description hide">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner