import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import config from './../../config/prod.json';



//user schema
const registrationSchema = new Schema ({
    username: {
        type: String,
        required: true ,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    updated: { type: Date, default: Date.now }
});


registrationSchema.plugin(uniqueValidator, {
    message: `{VALUE} already exists`
});


registrationSchema.pre('save', function(next) {
    //checking if it is not an update
    if(this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});


registrationSchema.methods = {
    //Password hashing method
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    //creating jwt token
    createToken() {
        return jwt.sign({_id: this._id}, config.development.JWT_SECRET);
    },

    toAuthJSON() {
      return {
          token: this.createToken(),
          ...this.toJSON()
      }
    },
    //change login output, that it would not send password
    toJSON() {
        return {
            _id: this._id,
            username: this.username,
            email: this.email,
        }
    }
};

export default mongoose.model('Registration', registrationSchema);