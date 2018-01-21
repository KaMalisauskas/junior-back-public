import CategoriesModel from './categoriesModel';
const { check, validationResult } = require('express-validator/check');

class CategoryServices {

    register({category}) {

        if(!category) {
            throw new Error("Category is missing")
        }

        try {

            return CategoriesModel.create({category});


        } catch(error) {

            throw error;
        }
    }
}


export default new CategoryServices();