const { default: mongoose } = require("mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema)

module.exports = User