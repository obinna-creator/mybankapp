const express= require("express")
const {createUser,getAll  }= require("../userController/userCon")
const router= express.Router()
router.post("/createnewuser", createUser)
router.get("/getalls",getAll  )
module.exports=router