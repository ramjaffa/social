const Friend = require('../models/friendship');

module.exports.createFriend = async function(req,res){
    try{
        let newFriend = await Friend.create({
            from_user: req.user._id,
            to_user: req.query._id
        })

    }catch(err){
        console.log('Error in making a friend: ' + err);
    }
}