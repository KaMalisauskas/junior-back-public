import express from 'express';
//requesting controllers
import * as JobController from '../controllers/job_controller';
import * as JobDeleteController from '../controllers/job_controller_delete';
import RegistrationServices from './../modules/auth/registration-services';




const router = express.Router();

//post
router.post('/email/sub', JobController.subEmail);
router.post('/addJob', JobController.addJob);
router.post('/addCategory', JobController.addCategory);
router.post('/addLanguage', JobController.addLanguage);
router.post('/email/newsletter', JobController.newsletterEmail);


//get
router.get('/', JobController.getJobs);
router.get('/categories', JobController.getCategories);
router.get('/languages', JobController.getLanguages);
router.get('/id/:id', JobController.jobQuery);
router.get('/level/:level', JobController.jobLevelQuery);
router.get('/language/:language', JobController.languageQuery);
router.get('/categories/:category', JobController.categoryQuery);

//delete
router.delete('/language/delete/:id', RegistrationServices.authMiddleware, JobDeleteController.languageDelete);
router.get('/language/delete/all', RegistrationServices.authMiddleware, JobDeleteController.languagesCompliteDelete);
router.delete('/category/delete/:id', RegistrationServices.authMiddleware, JobDeleteController.categoryDelete);
router.get('/category/delete/all', RegistrationServices.authMiddleware, JobDeleteController.categoriesCompliteDelete);
router.delete('/delete/:id', RegistrationServices.authMiddleware, JobDeleteController.jobDelete);
router.get('/delete/all', RegistrationServices.authMiddleware, JobDeleteController.jobsCompliteDelete);






export default router;