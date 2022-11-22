import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

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
            return res.status(200).json({
                isLoggedIn: false,
                message: "Incorrect password!",
            });
        } else {

            const jwtSecretKey = process.env.JWT_SECRET_KEY;
            const payloadData = {
                time: Date(),
                id: user.id,
            };

            const token = jwt.sign(payloadData, jwtSecretKey, {
                expiresIn: 86400 // 24 hours
            });

            return res.status(200).json({
                isLoggedIn: true,
                message: "Logged in",
                accesstoken: token,
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