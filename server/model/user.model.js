const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const { restart } = require("nodemon");
const { nextTick } = require("process");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please! Enter your name"],
        maxLength: 30,
        minLength: [4, "Name should have more than 4 charecter"]
    },
    email: {
        type: String,
        require: [true, "Please! Enter email"],
        unique: true,
        validate: [validator.isEmail, "Please! Enter a valid email"],

    },
    password: {
        type: String,
        require: [true, "Please! Enter password"],
        minLength: [8, "Password length should have 8 or more charector"],
        select: false
    },
    avatar:
    {
        public_id: {
            type: String,
            required: true,

        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});



//-----------------------jwt token-----------------
userSchema.methods.getJWToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// ------------------------compare passwors--------------------

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//--------------reset password-------------------------------

userSchema.methods.resetPassword = function () {

    //---genereate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    // const tokenCrypto=crypto.createHash('sha256').update(resetToken).digest('hex')
    return resetToken;
}



module.exports = mongoose.model("user", userSchema);