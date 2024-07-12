const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    profilePicture:[ 
         {
        type: String,
        required: true,
    },],
 
       userName:{
        type: String,
        
       },
    gender: {
        type: String,
        
    },

    email: {
        type: String,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    confirmPassword:{
        type: String
    },
    dateOfBirth: {
        type: String,
        
    },
    
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

}, {
    timeStamp: true
});


UserSchema.method.createResetPasswordTokken = function(){
    const resetTokken = crypto.randomBytes(32, this.toString('hex'));
    this.passwordResetToken = crypto.createHash('sha256').update(resetTokken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    console.log(resetTokken, this.passwordResetToken)

    return resetTokken;
}

module.exports=mongoose.model('User',UserSchema)
