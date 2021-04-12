const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
module.exports.create =async function(req,res){
    //post is the hidden input we give from home.ejs
    try{
        let post =await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user','name email').execPopulate();
        // commentsMailer.newComment(comment);
        let job = queue.create('emails',comment).save(function(err){
            if(err){
                console.log('error in creating a queue');
                return;
            }
            console.log(job.id);
        })
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"PostCreated"
            });
        }
        req.flash('success', 'Comment published!');

        res.redirect('/')
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id)
        
    if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();
        let post = await Post.findByIdAndUpdate(postId,
            {$pull :{comments:req.params.id}});
            req.flash('success', 'Comment deleted!');

        return res.redirect('back');
        
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}