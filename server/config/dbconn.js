const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, }).then((data) => {
        console.log("mongodba have connect successful at:", data.connection.host);
    }).catch = (err) => {
        console.log("The error is :", err);
    };

}
module.exports = dbconnection;