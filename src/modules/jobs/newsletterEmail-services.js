import newsletterEmail from './newsletterEmail-model';


class NewesletterServices {

    register({email}) {

        if(!email) throw new Error('Must fill "email" field');
        console.log('Services email: ' + email);

        try {
            return newsletterEmail.create({email});
        }
        catch (error){
            throw error;
        }

    }

}

export default new NewesletterServices();