import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Button} from "antd";

function Favorite(props) {

    const movieId = props.moiveId;
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {


        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                    console.log(response.data)
                } else {
                    alert("숫자 정보를 가져오는데 실패했습니다.")
                }
            })


        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                    console.log(response.data)
                } else {
                    alert("정보를 가져오는데 실패했습니다..")
                }
            })


    }, [])

    const onClickFavorite = () => {

        if (Favorited) {
            Axios.post('/api/favorite/removeFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert("favorite리스트에 지우는것을 실패했습니다.")
                    }
                })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert("favorite리스트에 추가하는것을 실패했습니다.")
                    }
                })
        }
    }


    return (
        <div>
            <Button onClick={onClickFavorite}>
                {Favorited ? "Not Favorite" : "ADD to Favorite"} {FavoriteNumber}

            </Button>

        </div>
    )
}

export default Favorite






