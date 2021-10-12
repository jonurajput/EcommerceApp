const express = require("express")

 if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({ path: "./config.env" })
 }

const PORT = process.env.PORT || 5000
const app = express()
const cookieparser = require("cookie-parser")
require("./DbConnection/conn")();


app.use(express.json())
app.use(cookieparser())
app.use(require("./Router/product"))
app.use(require("./Router/user"))
app.use(require("./Router/cart"))
app.use(require("./Router/payment"))
app.use(require("./Router/adminProduct"))
app.use(express.json())


if(process.env.NODE_ENV == 'production') {
    const path = require("path");
    app.get("/", (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


app.listen(PORT, () => {
    console.log("server is running");

})