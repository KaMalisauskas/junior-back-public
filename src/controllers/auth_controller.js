import RegistrationServices from '../modules/auth/registration-services';

export const signup = async (req, res) => {
    try {
        const user = await RegistrationServices.register(req.body);
        console.log('Person saved');
        return res.status(200).json(user);

    } catch (error) {
        console.log('Something whent wrong');
        return res.status(400).json({error: String(error) });
    }
};

//if passport does not throw errors, res(200)
export const login = (req, res, next) => {
    res.status(200).json(req.user.toAuthJSON());
    return next();
};