const { populate } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
module.exports.home =async function(req,res){
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments', // same name in the model of the path.js
            populate :{
                path:'user'
            }
        });
        let users = await User.find({})
        return res.render('home',{
            title: "Codeial | Home",
            posts:posts,
            all_users: users
        })
    }catch(err){
        console.log(err);
    }
    
    // populate the user we can also post the user  
    

}




   
   
//using then 
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then();

