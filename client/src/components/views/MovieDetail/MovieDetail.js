import React, {useEffect, useState} from "react";
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../LandingPage/Section/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import {Row} from "antd";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";

function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])

    const [Casts, setCasts] = useState([])

    const [ActorToggle, setActorToggle] = useState(false)


    useEffect(() => {   //돔이 로드가되면처음할거

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })
    }, [])


    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

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


                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={Movie} moiveId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>


                {/*    movieinfor*/}

                <MovieInfo
                    movie={Movie}

                />


                <br/>

                <div style={{display: "flex", justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>
                {ActorToggle &&     //이게 참일떄만 보여주는뜻
                <Row gutter={[16, 16]}>
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                image={cast.profile_path ?
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                charcterName={cast.name}

                            />
                        </React.Fragment>

                    ))}


                </Row>
                }
            </div>

        </div>
    )
}

export default MovieDetail;