import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { JWT_EXPIRES, JWT_KEY } from "../config/Index.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        phone:{
            type:String,
            required:true,
            trim:true,
        },
        address:{
            type:String,
            trim:true,
        },
    },
    {timestamps: true}
);

// FOR HASHING PASSWORD
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})


// COMPARE PASSWORD
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// GENERATING JSON WEB TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, JWT_KEY, {expiresIn : JWT_EXPIRES})
}

export default mongoose.model('User', userSchema);