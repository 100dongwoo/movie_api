import React, {useEffect, useState} from "react";
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])

    useEffect(() => {   //돔이 로드가되면처음할거

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

    }, [])


    return (
        <div>
            {/* header*/}
            <MainImage

                text={Movie.overview}
                title={Movie.original_title}
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
            />

            {/*    body*/}
            <div style={{width: '85%', margin: '1rem auto'}}>

                {/*    movieinfor*/}

                <MovieInfo
                    movie={Movie}

                />


                <br/>

                <div style={{display: "flex", justifyContent: 'center', margin: '2rem'}}>
                    <button>Toggle Actor View</button>
                </div>

            </div>

        </div>
    )
}

export default MovieDetail;