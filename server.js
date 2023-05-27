require("./models/db")
const userController = require("./controllers/userController")
const dotenv = require("dotenv")
dotenv.config()
const checkToken = require("./middleware/auth")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const User = require("./models/user.model")
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




app.listen(8000, () => {
    console.log("Server started on port 8000...")
})

app.use(("/"), userController)