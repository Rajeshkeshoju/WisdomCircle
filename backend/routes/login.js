import bcrypt from 'bcrypt';
import User from '../models/User.js';

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email});

    try {
        if(!user) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }

        const isPasswordMatched = await bcrypt.compareSync(password, user.password, (err, result) => {});
        if(!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect password!",
            });
        } else {
            return res.status(200).json({
                message: "Logged in",
            });
        }

    } catch (error) {
        res.status(400).json({
            message: "An error occured while logging in",
            error: error.message,
        });
    }


};

export default login