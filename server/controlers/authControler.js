const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

async function registration(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json('Error with registration')
        }
        const { username, password } = req.body;
        const cadidate = await User.findOne({ username });
        if (cadidate) {
            return res
                .status(400)
                .json({message: "This name is already busy"})
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        const user = new User({ username, password: hashPassword });
        await user.save();
        return res.json({ message: "Успешно зарегистрирован" });
    } catch (e) {
        console.log(e);
    }
}



