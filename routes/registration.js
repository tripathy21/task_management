const express = require('express');
const router = express.Router();
const becrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const Users = require('../models/UserModel');

//api for user registration
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password must be atleast 6 charcters or more').isLength({ min: 6 })

],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body
        console.log(req.body)
        try {
            //see if user exists
            let user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({ errors: [{ 'msg': 'user already exists' }] })
            }

            //creating users instance
            users = new Users({
                name,
                email,
                password
            })

            // encrypt password
            const salt = await becrypt.genSalt(10);

            users.password = await becrypt.hash(password, salt)

            //save the users
            await users.save()

            // return msg
            res.json({
                statusCode: 200,
                message: "Registration Sucessfull.",
                data: ""
            });

        } catch (err) {
            console.error(err.message);
            res.json({
                statusCode: 500,
                message: "server error.",
                data: ""
            });
        }
    })

module.exports = router;