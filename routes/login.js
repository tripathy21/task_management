const express = require('express');
const router = express.Router()
const Users = require('../models/UserModel')
const { check, validationResult } = require('express-validator/check');
const becrypt = require('bcryptjs');

// api to login
router.post('/', [
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is reqiured').exists()

],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
           return res.json({
                statusCode: 400,
                message: errors,
                data: ""
            });
        }
        const { email, password } = req.body
        console.log(req.body)
        try {
            //see if user exists
            let users = await Users.findOne({ email })
            if (!users) {
                return res.json({
                    statusCode: 400,
                    message: 'invalid credentials',
                    data: ""
                });
            }

            const ismatch = await becrypt.compare(password, users.password)

            if (!ismatch) {
                return res.json({
                    statusCode: 400,
                    message: 'invalid credentials',
                    data: ""
                });
            } else {
                return res.json({
                    statusCode: 200,
                    message: 'logged in successfully',
                    data: ""
                });
            }


        } catch (err) {
            console.error(err.message);
            return res.json({
                statusCode: 500,
                message: 'server error',
                data: ""
            });
        }
    })


module.exports = router;