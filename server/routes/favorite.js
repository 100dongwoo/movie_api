const express = require('express');
const router = express.Router();
const {User} = require("../models/User");
const {Favorite} = require("../models/Favorite")
const {auth} = require("../middleware/auth");

//=================================
//             favorite
//=================================
router.post('/favoriteNumber', (req, res) => {
    //req를통해받는다 /body =index.js에 bodyparer를 통해 front에서 보내준것을 받을수있따
    //monggo db에서 favorte숫자 받앙기

    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, favoriteNumber: info.length})

            // 프론트에 다시 보내주기
        })
})


router.post('/favorited', (req, res) => {
//내가 이영화를 favor리스트에넣었는지 정보확인
    //->그러므로 userfrom정보도 필요

    Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            //만약null이면 아직 favorite리스트에 안넣었다는거
            let result = false;
            if (info.length !== 0) {
                result = true
            }

            res.status(200).json({success: true, favorited: result})
        })

})


router.post('/removeFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, doc})
        })
})


//////////////////////////////////

router.post('/addToFavorite', (req, res) => {

    //db에넣어주기만하면됨


    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})




router.post('/getFavoredMovie', (req, res) => {

    Favorite.find({'userFrom':req.body.userFrom})
        .exec((err,favorites)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true,favorites})
        })
})


router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId:req.body.movieId,userFrom:req.body.userFrom})
        .exec((err,result)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})
    })
})




module.exports = router;