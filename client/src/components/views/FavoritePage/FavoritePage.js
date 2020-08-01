import React, {useEffect, useState} from "react";
import {Row} from "antd";
import "./favorite.css"
import Axios from "axios";

function FavoritePage() {
    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        Axios.post('/api/favorite/getFavoredMovie', {userFrom: localStorage.getItem('userId')})
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setFavorites(response.data.favorites)
                } else {
                    alert("영화정보를 가져오기 실패했습니다.")
                }
            })
    }, [])

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
                {Favorites.map((fav, index) => (
                <tr key={index}>
                    <td>{fav.movieTitle}</td>
                    <td>{fav.movieRunTime} mins</td>
                    <td>
                        <button> Remove</button>
                    </td>
                </tr>
                ))}
                </tbody>


            </table>
        </div>
    )

}

export default FavoritePage






