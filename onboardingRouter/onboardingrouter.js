const express= require("express")
const {creatOnboarding,LoginOnboarding} = require("../onboardingCon/onboardingcontroller")
const router= express.Router()
router.post("/onboarding", creatOnboarding)
router.post("/Login",LoginOnboarding)

module.exports=router
