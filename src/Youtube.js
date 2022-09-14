import React from 'react'
import YouTube from 'react-youtube';
import { useStateValue } from './StateProvider';
import { actionTypes } from "./reducer";
import "./Youtube.css"

function Youtube() {
    const [{ trailerURL }, dispatch] = useStateValue();
    console.log(trailerURL)
    const opts = {
        height: "768",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };


    if (trailerURL) {
        const myModalEl = document.getElementById('youtubeModal')
        myModalEl.addEventListener('hide.bs.modal', event => {
            dispatch({
                type: actionTypes.SET_trailerURL,
                trailerURL: null,
            });
            myModalEl.style.display = "none";
        })
    }



    return (
        <div className=' youtube'>



            <div class="modal fade" id="youtubeModal" tabindex="-1" aria-labelledby="youtubeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen" >
                    <div class="modal-content">
                        <div class="modal-header">
                          
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            {trailerURL ?
                                <div class="ratio ratio-16x9">
                                    <YouTube videoId={trailerURL} opts={opts} />
                                </div>
                                :
                                <h1 className='fff container'>Sorry trailer for this movie is not available for now</h1>
                            }
                        </div>

                    </div>
                </div>
            </div>




        </div>
    )
}

export default Youtube