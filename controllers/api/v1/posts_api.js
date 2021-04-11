const Post = require('../../../models/post');
const Comment =require('../../../models/comment');
module.exports.index =async function(req,res){
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments', // same name in the model of the path.js
            populate :{
                path:'user'
            }
        });
            return res.json(200,{
        message:"List of posts",
        posts:posts
    })
    
    
    // populate the user we can also post the user  
    

}


// module.exports.index = function(req,res){
//     return res.json(200,{
//         message:"List of posts",
//         posts:posts
//     })
// }

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.json(200,{
                message:"Post and assosiated comments deleted successfully!!"
            });
        }else{
            return res.json(401,{
                message:"You cannot delete the post"
            })
        }

    }catch(err){
        console.log('****',err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
    
}