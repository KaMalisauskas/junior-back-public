import LanguageModel from './Languages-model';
const { check, validationResult } = require('express-validator/check');

class LanguageServices {

    register({language}) {

        if(!language) {
            throw new Error("Language is missing")
        }
        try {
            return LanguageModel.create({language});
        } catch(error) {

            throw error;
        }
    }
}


export default new LanguageServices();