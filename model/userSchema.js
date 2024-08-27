const mongoose = require('mongoose')
const jwt =require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpass: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            requiresd: true
        }
    }]

});
// hasing password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpass =await bcrypt.hash(this.cpass, 12);
    }
    next();
});
// // //generating auth token
userSchema.methods.generateAuthToken=async function() {
    try {
        let token=jwt.sign({_id:this._id},process.env.KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        return token;
    }catch(err){
        console.log(err);
    }
}
const User = mongoose.model('users', userSchema);
module.exports = User;