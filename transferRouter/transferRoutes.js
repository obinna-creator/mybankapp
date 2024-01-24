const express= require("express")

const {createtransfer} = require("../transferCon/transfercontroller")

const router= express.Router()

router.post("/transfer", createtransfer)

module.exports= router