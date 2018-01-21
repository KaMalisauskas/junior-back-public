import express from 'express';
//requesting controllers
import * as AuthController from '../controllers/auth_controller';
import RegistrationServices from './../modules/auth/registration-services';
import * as AuthControllerDeletation from '../controllers/auth_controller_delete';

const router = express.Router();

//post
router.post('/register', RegistrationServices.authMiddleware, AuthController.signup);
router.post('/login',  RegistrationServices.loginMiddleware,  AuthController.login);

router.delete('/user/delete/:email', RegistrationServices.authMiddleware, AuthControllerDeletation.userDelete);



router.get('/main', RegistrationServices.authMiddleware, (req, res) => {
    res.send('If you see this, you are logged in here and you a');
});


export default router;