import React, {useEffect, useState} from "react";
import "./favorite.css"
import Axios from "axios";
import {Popover} from "antd";
import {IMAGE_BASE_URL} from "../../Config";

function FavoritePage() {
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFav()
    }, [])

const fetchFav=()=>{
    Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
        .then(response => {
            if (response.data.success) {
                setFavorites(response.data.favorites)
            } else {
                alert("영화정보를 가져오기 실패했습니다.")
            }
        })
}


    const renderCards = Favorites.map((fav, index) => {

        const content = (
            <div>
                {fav.moviePost ?

                    <img src={`${IMAGE_BASE_URL}w500${fav.moviePost}`}/> : "no image"
                }
            </div>
        )
        const onClickDelete=(movieId,userFrom)=>{

            const variables={
                movieId,
                userFrom
            }

            Axios.post('/api/favorite/removeFromFavorite',variables)
                .then(response=>{
                    if(response.data.success)
                    {
                        fetchFav()
                    }
                    else{
                        alert("리스트에서 삭제하지못했습니다")
                    }
                })


        }


        return <tr key={index}>

            <Popover content={content} title={`${fav.movieTitle}`}>
                <td>{fav.movieTitle}</td>
            </Popover>
            <td>{fav.movieRunTime} mins</td>
            <td>
                <button onClick={()=>onClickDelete(fav.movieId,fav.userFrom)}> Remove</button>
            </td>
        </tr>
    })


    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h2> Favorite Movie</h2>
            <hr/>
            <table>
                <thead>
                <tr>
                    <th>Movie Title</th>

                    <th>Movie Runtime</th>
                    <td>Remove from favorites</td>
                </tr>
                </thead>
                <tbody>

                {renderCards}
                </tbody>


            </table>
        </div>
    )

}

export default FavoritePage






