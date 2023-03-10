const app = require("./app");
const dbconnect = require("./config/dbconn");
const dotenv = require("dotenv");

dotenv.config({ path: "server/config/config.env" });
const port = process.env.PORT;

app.get("/api/product", (req, res) => {
    res.send("get respond succesfull");
});
dbconnect();

app.listen(port,
    () => { console.log("Server is running at port :", port) }
);