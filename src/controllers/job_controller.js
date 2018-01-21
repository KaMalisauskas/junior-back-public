import CategoriesModel from './../modules/categories/categoriesModel'
import JobModel from './../modules/jobs/Job-model';
import LanguagesModel from './../modules/languages/Languages-model';
import NewsletterEmailModel from './../modules/jobs/newsletterEmail-model'


import JobServices from './../modules/jobs/job-services';
import CategoryServices from './../modules/categories/category-services';
import LanguagesServices from './../modules/languages/languages-services';
import NewesletterServices from './../modules/jobs/newsletterEmail-services'

import config from './../config/prod.json';
//For indexing
import algoliasearch from 'algoliasearch';

//email
import nodemailer from 'nodemailer';

const client = algoliasearch(config.algolia.applicationID, config.algolia.apiKey);
const index = client.initIndex(config.algolia.index);


export const addJob = async (req, res) => {
    try {

         const job = await JobServices.register(req.body);
         console.log('Job added to Database');

         index.addObject(job, (err) => {
             if(err) throw err;
             console.log('Job added to Algolia');
         });

         return res.status(200).json(job);
    } catch (error) {
        console.log('Something went wrong registering job to Mongo');
        return res.status(400).json({
            error: String(error)
        });
    }
};

export const getJobs = async (req, res) => {
    try {
        const jobs = await JobModel.find().sort({updated: -1});
        return res.status(200).json(jobs);
    } catch (error) {
        console.log('Something went wrong getting jobs');
        return res.status(400).json({
            error: String(error)
        });

    }
};

export const jobQuery = async (req, res) => {
    try {
        const id = req.params.id;
        req.sanitize(id).escape();
        console.log('FInding one');
        const jobById = await JobModel.findOne({
            _id: id
        });
        if(jobById.length === 0) {
            console.log("Job does not exist by this id");
            return res.status(404).json({
                error: "Job does not exist by that id"
            });
        } else {
            console.log('Job by id send');
            return res.status(200).json(jobById);
        }
    } catch(error) {
        console.log('Something went wrong in getting job by id');
        return res.status(400).json({
            error: String(error)
        });
    }
};
//Subscribe to newsletter
export const subEmail = (req, res) => {

    try {
        const newslettersEmail = NewesletterServices.register(req.body);
        console.log(newslettersEmail);

        let email =  config.creds.email,
            password = config.creds.password;

        req.sanitizeBody('email').escape();

        const userEmail = req.body.email;
        const emailVal = '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
        if ( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail) ) {
            console.log('Wrong email input');
            return res.status(400).json({error: "State is not a an email"});
        }

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: false,
            port: 25,
            auth: {
                user: email,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log(`This is cred ${config.creds.email}`);
        let HelperOptions = {
            from: `"Karolis - Junior devs" <${config.creds.email}`,
            to: userEmail,
            subject: 'Welcome to junior',
            text: 'You have subscribed to Junior Dev Notifications! Thank you for believing in us!'
        };

        transporter.sendMail(HelperOptions, (error, info) => {
            (error) ? res.status(400).json({error: error}) : res.status(200).json({
                success: true,
                message: "Succesfully subscribed",
                newEmail: newslettersEmail

            });
        })


    } catch(error) {
        console.log('Something went wrong on subscribing to newsletters');
        res.status(401).json({
            success: false,
            error: String(error)
        })
    }


};
//Sending newsletter to every one who is subscribed
export const newsletterEmail = async (req, res) => {

    try {

        if(!req.body.subject && !req.body.text) {
            res.status(404)
                .json({
                    success: false,
                    message: 'Error: Bad request! Not all fields submitted'
                })

        }

        let email =  config.creds.email,
            password = config.creds.password;

        //getting all emails from db
        const allUsersEmails = await NewsletterEmailModel.find();

        let usersEmails = [];

        allUsersEmails.map( (data) => {
            usersEmails += ` ${data.email},`
        } );

        usersEmails = usersEmails
            .substring(0, (usersEmails.length - 1))
            .trim();

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            secure: false,
            port: 25,
            auth: {
                user: email,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let HelperOptions = {
            from: `"Karolis - Junior devs" <${config.creds.email}`,
            to: usersEmails,
            subject: req.body.subject,
            text: req.body.text
        };

        transporter.sendMail(HelperOptions, (error, info) => {
            (error) ? res.status(400).json({error: error}) : res.status(200).json({
                success: true,
                message: "Newsletter successfully send",

            });
        })

    } catch(error) {
        console.log('Something went wrong on subscribing to newsletters');
        res.status(401).json({
            success: false,
            error: String(error)
        })
    }

};

export const addCategory = async (req, res) => {
    try {
        const category = await CategoryServices.register(req.body);
        console.log('Category added');
        return res.status(200).json(category);

    } catch (error) {
        console.log('Something went wrong registering a category');
        return res.status(400).json({
            error: String(error)
        });
    }
};

export const languageQuery = async (req, res) => {
    const language = req.params.language;
    req.sanitize(language).escape();
    const foundJob = await JobModel.find({
        languages: language
    });
    try {
        if (foundJob.length === 0) {
            console.log('There is no languages with this name');
            return res.status(404).json({
                error: 'There is no languages with this name'
            })
        } else {
            return res.status(200).json(foundJob);
        }
    } catch (error) {
        console.log(`Error on finding job ${String(error)} `);
        return res.status(400).json({
            error: String(error
            )})
    }

};

export const addLanguage = async (req, res) => {
    try{
        const language = await LanguagesServices.register(req.body);
        console.log(`Language added: ${language}`);
        res.status(200).json(language);

    }  catch (error) {
        console.log(`Error adding language: ${String(error)}`);
        return res.status(400).json({
            error: String(error
            )})
    }
};

export const getCategories = async (req, res) => {
    try{

        const categories = await CategoriesModel.find();

        res.status(200).json(categories);

    } catch (error) {
        console.log(`Error getting all categories: ${error}`);
        return res.status(400).json({
            error: String(error
            )});
    }
};

export const getLanguages = async (req, res) => {

    try {

        const language = await LanguagesModel.find();
        console.log(`Languages found`);
        res.status(200).json(language);

    } catch (error) {
        console.log(`Error getting all languages ${error}`);
        return res.status(400).json({
            error: error
        });
    }

};

export const categoryQuery = async (req, res) => {

    const category = req.params.category;
    req.sanitize(category).escape();
    const foundJob = await JobModel.find({
        category: category
    });
    try {
        if (foundJob.length === 0) {
            console.log('There is no category with this name');
            return res.status(404).json([]);
        } else {
            return res.status(200).json(foundJob);
        }
    } catch (error) {
        console.log(`Error on finding job ${String(error)} `);
        return res.status(400).json({
            error: String(error)
        })
    }


};

export const jobLevelQuery = async (req, res) => {

    try {
        let level = req.params.level;
        let job = await JobModel.find({level: level});
        if(job.length === 0 ) {
            console.log(`There is no job with this level: ${level}`);
            res.status(404).json({
                success: false,
                message: `There is no job with this level: ${level}`
            })
        } else {
            return res.status(200).json({job})
        }

    } catch (err) {
        console.log(`Error in finding job by level: ${err}`);
        return res.status(400).json({
            error: String(error
            )})
    }

};
