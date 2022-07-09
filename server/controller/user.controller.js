const sendToken = require("../utils/JWToken");
const usermodel = require("./../model/user.model");


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