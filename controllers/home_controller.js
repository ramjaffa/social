const Post = require('../models/post')
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    //just post on the page without user
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts:posts
    //     })
    // })


    
    // populate the user we can also post the user  
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts:posts
        })
    })
}

