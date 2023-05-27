const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user.model")
var router = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const checkToken = require("../middleware/auth")


router.get("/", (req, res) => {
    res.send("hello jobfinder")
})


router.post("/register", async(req, res) => {
    try {
        let email = req.body.email
        let password = req.body.password

        if (!email || !password) {
            res.status(400).send("fields are empty")
        } else {

            const oldUser = await User.findOne({ email })

            if (oldUser) {
                res.status(400).send("Already registered")
            } else {

                let encryptedPassword = await bcrypt.hash(password, 10);

                // Create user in our database
                const user = await User.create({
                    email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password: encryptedPassword,
                });
                res.status(200).send("Registered successfully")
            }
        }
    } catch (err) {
        res.status(500).send(`Error occured ${err} `)
    }

})

router.post("/login", async(req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            res.status(400).send("fields are empty")
        } else {
            const user = await User.findOne({ email })

            if (user && bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ email, password },
                    process.env.SECRET_KEY, {
                        expiresIn: "10h",
                    }
                );
                res.status(200).send(token)
            } else {
                res.send("Invalid details")
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).send(`Server Error`)
    }


})

router.post("/protected", checkToken, (req, res) => {
    res.status(200).send("This is protected route")
})




module.exports = router