import RegistrationModel from './Registration-model';
import { authLocal } from "./passport";
import { authJwt } from "./passport";
import validator from 'validator';

class RegistrationServices {
    register({email, password, username, rePassword}) {

        //validation
        if(!validator.isEmail(email)) {
            throw new Error(`${email} is not an email`);
        } else if(!email && !password && !username && !rePassword) {
            throw new Error('All fields must written');
        } else if(!password && !username && !rePassword) {
            throw new Error('All fields must written');
        } else if(!username && !rePassword) {
            throw new Error('All fields must written');
        }  else if(!email) {
            throw new Error('Email is required');
        } else if(!password && password.length <= 6) {
            throw new Error('Password is required and must be at least 6 letters long');
        } else if(!username) {
            throw new Error('Username is required');
        } else if(rePassword !== password) {
            throw new Error('Password does not match');
        }

        //if every thing is good, create ne user
        try {
            return RegistrationModel.create({email, password, username});
        }
        catch (error){
            throw error;
        }

    }

    //send info to passport and return what it gives
    loginMiddleware(req, res, next) {
        return authLocal(req, res, next);
    }
    authMiddleware(req, res, next) {
        return authJwt(req, res, next);
    }
}

export default new RegistrationServices();