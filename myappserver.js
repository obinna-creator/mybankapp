const express= require("express")

const onboardingrouter = require("./onboardingRouter/onboardingrouter")
const userrouter = require("./userRouter/userrouter")
const depositroutes = require("./depositRouter/depositroutes")
const transferRoutes = require("./transferRouter/transferRoutes")
require("./config")
const app = express()
const port = 3000



app.use(express.json())
app.use("/api/v1/createuser",onboardingrouter)
app.use("/api/v1/createuser", userrouter)
app.use("/api/v1/createuser", depositroutes)
app.use("/api/v1/createuser", transferRoutes)

app.listen(port, () => {
     console.log(`server is listening on port ${port}`)
})