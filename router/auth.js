const express = require('express')
const bcrypt = require('bcryptjs')
require('../database/connection')
const User = require('../model/userSchema')
const router = express.Router();
router.get('/', (req, res) => {
    res.send(`Route Message`);
});
//using promises 
// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpass } = req.body;
//     if (!name ||
//         !email ||
//         !phone ||
//         !work ||
//         !password ||
//         !cpass) {
//         return res.status(422).json({ error: "Please fill all details" })
//     }
//     User.findOne({ email: email })
//         .then((userExist) => {
//             if (userExist) {
//                 return res.status(422).json({ error: "Email Already exist" });
//             }
//             const user = new User({ name, email, phone, work, password, cpass });
//             user.save().then(() => {
//                 res.status(201).json({ message: "Successfully Registered" });
//             }).catch((err) => res.status(500).json({ error: "Registration failed" }))
//         }).catch(err => { console.log(err); })
// });


//using async await 
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpass } = req.body;
    if (!name || !email || !phone || !work || !password || !cpass) {
        return res.status(422).json({ error: "???" })
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email Already exist" });
        }
        else if (password != cpass) {
            return res.status(422).json({ error: "Password not matched" });
        } else {
            const user = new User({ name, email, phone, work, password, cpass });
            await user.save();
            res.status(201).json({ message: "Successfully Registered" });
        }
    } catch (err) {
        console.log(err);
    }
});
//login route 
router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Pls fill data" })
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken();
            //password  matching for login 
            if (!isMatch) { //if password wrong
                res.json({ error: "INVALID CREDENTIAL" })
            } else {
                res.json({ message: "Login Successfully" });
            }
        } else { //if email wrong
            res.json({ error: "INVALID CREDENTIAL" })
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;