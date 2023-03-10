const jwt = require("jsonwebtoken");
const { resource } = require("../app");
const usermodel = require("./../model/user.model");
exports.isAuthenticate = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false, message: "Please login to access this resource",
        })
    }

    if (token === null) {
        return res.status(401).json({
            success: false, message: "Please login to access this resource",
        })
    }


    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await usermodel.findById(decodedData.id);

    next();
}

exports.authorizedRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "user role is not allow to access this resource" });

        }
        next();
    }
}