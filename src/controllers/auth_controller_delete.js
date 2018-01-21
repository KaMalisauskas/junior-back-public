import RegistrationModel from './../modules/auth/Registration-model';

export const userDelete = async (req, res) => {

    let email = req.params.email;
    RegistrationModel.findOne({email: email})

        .catch( (err) => {
            throw err;
        })
        .then( (user) => {
            if(!user) {
                res.status(400).json({
                    success: false,
                    message: "User by given email doesn't exist"
                })
            }
            user.remove({email: email})
                .catch( (error) => {
                    throw error;
                })
                .then( () => {
                    console.log('User deleted');
                    res.status(200).json({
                        success: true,
                        message: "User deleted successfully"
                    })
                });
            console.log(user);
        })
};