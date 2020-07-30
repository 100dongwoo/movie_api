import React from "react";
import {Col} from "antd"


function GridCards(props) {


    return (
        //1COL 이 24인데 여기 lg 6 이면 4개 md 8 이면 3개 xs 는 24면 1개 이렇게 조정
        <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img
                        style={{width:'100%', height:'320px'}}
                        src={props.image} alt={props.movieName}/>
                </a>
            </div>
        </Col>

)

}

export default GridCards





