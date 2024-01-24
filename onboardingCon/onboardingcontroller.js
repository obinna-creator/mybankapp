const onboardingmodel = require("../onboardingModel/onboardingModel")
const jwt=require("jsonwebtoken")
exports.creatOnboarding = async (req, res) => {
    try {
        const { firstname, lastname,email, phoneNumber, pin, password, confirmPassword } = req.body
        const onboarding = await onboardingmodel.create({ 
            firstname,
            lastname,
            email,
            phoneNumber,
            password,
            confirmPassword,
             pin
         } ) 

        pin.length === 4
        if (pin.length < 4) {
            res.status(404).json({
                message:"incorrect pin inputed,shouldnt be less than 4"
            })
        }
        if (!onboarding ) {
            res.status(400).json({
                message:"signed up not created"
            })
        }
         
      

        const token = jwt.sign({ id: onboarding }, process.env.json_Secret, {
            expiresIn:process.env.Login_Expires
        })
        
            res.status(201).json({
                status: "signed up successfully",
                message:"pin created sucessfully",
                token,
                onboarding,
                pin
          })
      

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        }
    
}


exports.LoginOnboarding = async (req, res,next) => {
    try {

        const { email,password } = req.body
        //check if user input email and password
        if (!email || !password) {
            res.status(404).json({
                message:"please input email and password"
            })
            return next()
        }
        //check if user exists with given email
        const user = await onboardingmodel.findOne({ email }).select('+password')
        console.log(user );
        //check if user exists in the database and if password from the req.body and database matches
       // const isMatch= await user.comparepasswordInDB(password,user.password)
        if (!user || !(await user.comparepasswordInDB(password, user.password))) {
            res.status(404).json({
                message:"user doesnt exists and password doesnt match"
            })
        }
        
   // log in the userby sending a token
      const token = jwt.sign({ id: user._id }, process.env.json_Secret, {
       expiresIn:process.env.Login_Expires
      })
        console.log(token );
      res.status(200).json({
          message: "logged in successfuully",
          token,
          user
      })
            
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
