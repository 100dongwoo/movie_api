const mongoose = require('mongoose');
const Schema = mongoose.Schema
const FavoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String,
    },
    moviePost: {
        type: String
    },
    movieRuntime: {
        type: String
    }
},{timestamp:true})


const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = {Favorite}