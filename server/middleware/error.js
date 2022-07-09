const ErrorHandler = require("./../utils/errorhandler");
module.exports=(err,res,req,next)=>{
    err.statuseCode=err.statuseCode||500;
    err.message=err.message;
    res.status(err.statuseCode).json({
        success:false,
        error:err,
    })
}