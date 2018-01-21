import JobModel from './Job-model';
import validator from 'validator';
const { check, validationResult } = require('express-validator/check');


class JobServices {

    register({jobTitle, location,  companyName, experience, requirements, languages, summery, benefits, salary, level, category, image}) {

        //validation
        if(!jobTitle || !location || !companyName || !experience || !languages || !summery || !benefits || !salary || !level || !category) {
            throw new Error(`Not all fields were submitted`)
        }
        try {

            return JobModel.create({jobTitle, location,  companyName, experience, requirements, languages, summery, benefits, salary, level, category, image});
        }
        catch (error){
            throw error;
        }

    }

}

export default new JobServices();