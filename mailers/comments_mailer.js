const nodeMailer = require('../config/nodemailer');

//another way to export
//newComment is the function name
exports.newComment = (comment)=>{
    let htmlString = nodeMailer.renderTemplate({comment : comment},'/comments/new_comments.ejs');
    console.log('inside newComemnt mailer',comment);

    nodeMailer.transporter.sendMail({
        from: 'nagasitaram4@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html:htmlString
    },(err,info) =>{
        if(err){
            console.log('Error in sending mail', err);
            return
        }
        console.log("Message sent",info);
        return;
    })
}