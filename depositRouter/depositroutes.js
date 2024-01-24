const express = require("express")
const {createDeposit,getAll}= require("../depositCon/depositcontroller")
//const {authenticateUser}= require("../authentication")

const router= express.Router()

router.post("/createdeposit", createDeposit)
router.get("/getalldeposit",getAll)
module.exports= router

//65a7bec2624dc8760d33c5ef"