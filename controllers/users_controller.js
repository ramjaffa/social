const User = require("../models/user");

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user:user
        })
    })
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','Updated!')
            return res.redirect('back');
        })
    }else{
        req.flash('error','Unauthorised!')
        res.status((401).send('Unauthorised'));
    }
}
//render the sign up page
module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial| Sign Up"
    })
}

//render the sign In page
module.exports.signIn = function(req,res){
    
    if (req.isAuthenticated()){
        // return res.redirect('/users/profile/');
        return res.redirect('/')
    }

    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the signup data

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error','Passwords do not match!!')
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){req.flash('error',err); return; }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){req.flash('error',err);return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    })
    
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.flash('success','You have Logged Out');
    req.logout();
    return res.redirect('/')
}