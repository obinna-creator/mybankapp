const mongoose = require("mongoose")
// const mongose= require("mongoose")
 require('dotenv').config()
const DBLink = process.env.DBLink

 
mongoose.connect(DBLink).then(() => {
    console.log(`database is connected sucessfully`)
}).catch((err) => {
    console.log(err.message)
})