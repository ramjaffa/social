const mongoose = require('mongoose');

const postSchema = new mongoose.Mongoose.Schema({
 content:{
    type: String,
    required:true
 },
 user:{
     type:monggose.Schema.Types.ObjectId,
     ref:'User'
 }
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;