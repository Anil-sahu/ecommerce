const { use } = require("../app");
const sendToken = require("../utils/JWToken");
const usermodel = require("./../model/user.model");
const sendEmail = require("./../utils/sendEmail");


//--------------------create new product admin--------------------------
exports.createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await usermodel.create({
        name, email, password,
        avatar: {
            public_id: "This is a simple",
            url: "profile url"
        }
    });
    // const token = user.getJWToken();
    // res.status(200).json({ succes: true, token });
    sendToken(user, 201, res);

}


// ------------------------login user-------------------------

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            succes: false,
            message: "Please Enter email and password",
        });
    }

    const user = await usermodel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            succes: false,
            message: "Ivalid username and password"
        })
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return res.status(401).json({
            succes: false,
            message: "Ivalid username and password"
        })
    }

    // const token = user.getJWToken();
    // res.status(200).json({ succes: true, token });

    sendToken(user, 200, res);
}


//--------------logout---------------

exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()), httpOnly: true,
    })

    res.status(200).json({ succes: true, message: "LogOut successful" });
}

//-------forgot password----------



exports.forgotPassword = async (req, res, next) => {

    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ succes: false, message: "User is not exist" });
    }
    //get reset password token
    const resetToken = this.resetPassword;
    user.save({ valiidateBeforeSave: false });
    //creating link for reset password
    const resetPasswordUrl = '${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}';

    const message = "Your reset password has token is :\n\n ${resetPasswordUrl} \n\n If you have not requested this then ignore it";

    try {
        await sendEmail({
            email: user.email,
            subject: "Eccommerce website passwors recovery",
            message: message
        });
        res.status(200).json({
            success: true,
            message: "Email send to ${user.email} successfully"
        });

    } catch (error) {

        this.resetPasswordToken = undefined,
            this.resetPasswordExpire = undefined;
        await user.save({ valiidateBeforeSave: false });
        return res.status(500).json({ success: false, message: "this is catch block ${error.message}" });

    }

}



// GET USER DETAILS

exports.getUserDetails = async (req, res, next) => {
    const user = await usermodel.findById(req.body.id);
    res.status(200).json({
        success: true,
        user,
    })
}