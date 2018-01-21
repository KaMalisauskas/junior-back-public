import CategoriesModel from './../modules/categories/categoriesModel'
import JobModel from './../modules/jobs/Job-model';
import LanguagesModel from './../modules/languages/Languages-model';
import algoliasearch from 'algoliasearch';


/*
*
* @languages
*
 */

const client = algoliasearch('E0WYNROWLP', '1f7672b14a8a8026cccc0d54857ad4cf');
const index = client.initIndex('dev_languages');

export const languageDelete = async (req, res) => {

    let id = req.params.id;
    LanguagesModel.findOne({_id: id})

        .catch( (err) => {
            throw err;
        })
        .then( (language) => {

            if(!language) {
                res.status(400).json({
                    success: false,
                    message: "Language by given ID doesn't exist"
                })
            }
            language.remove({_id: id})
                .catch( (error) => {
                    throw error;
                })
                .then( () => {
                    console.log('Language deleted');
                    res.status(200).json({
                        success: true,
                        message: "Language deleted successfully"
                    })
                });
            console.log(language);
        })
};


export const languagesCompliteDelete = async (req, res) => {

   LanguagesModel.remove()

        .catch( (err) => {
            throw err;
        })
        .then( () => {
            res.status(200).json({
                success: true,
                message: 'Languages table is successfully deleted'
            })
        })
};

/*
*
* @Categories
*
 */

export const categoryDelete = async (req, res) => {

    let id = req.params.id;

    CategoriesModel.findOne({_id: id})

        .catch( (err) => {
            throw err;
        })
        .then( (category) => {

            if(!category) {
                res.status(400).json({
                    success: false,
                    message: "Category by given ID doesn't exist"
                })
            }

            category.remove({_id: id})
                .catch( (error) => {
                    throw error;
                })
                .then( () => {
                    console.log('Category deleted');
                    res.status(200).json({
                        success: true,
                        message: "Category deleted successfully"
                    })
                });

            console.log(category);
        })

};

export const categoriesCompliteDelete = async (req, res) => {

    CategoriesModel.remove()

        .catch( (err) => {
            throw err;
        })
        .then( () => {
            res.status(200).json({
                success: true,
                message: 'Categories table is successfully deleted'
            })
        })
};

/*
*
* @Jobs
*
 */

export const jobDelete = async (req, res) => {

    let id = req.params.id;

    index.deleteByQuery({
        query: id,
    }, (err) => {
        if(err) res.status(400).json(err);
        console.log('Job deleted from Algolia');
    });

    JobModel.findOne({_id: id})

        .catch( (err) => {
            throw err;
        })
        .then( (job) => {

            if(!job) {
                res.status(400).json({
                    success: false,
                    message: "Job by given ID doesn't exist"
                })
            }

            job.remove({_id: id})
                .catch( (error) => {
                    throw error;
                })
                .then( () => {
                    console.log('Job deleted from MongoDb');
                    res.status(200).json({
                        success: true,
                        message: "Job deleted successfully"
                    })
                });
        })
};

export const jobsCompliteDelete = async (req, res) => {

    JobModel.remove()

        .catch( (err) => {
            throw err;
        })
        .then( () => {
            res.status(200).json({
                success: true,
                message: 'Jobs table is successfully deleted'
            })
        })
};