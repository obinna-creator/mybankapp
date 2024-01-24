const userModel= require ("../userModel/usermodel")
const onboardingModel= require("../onboardingModel/onboardingModel")
//const jwt= require("jsonwebtoken")
exports.createUser = async (req, res) => {
    try {
        const id = req.body.id
        const onboarding = await onboardingModel.findById(id)
        
        if (!onboarding) {
            return res.status(404).json({
                message:"onboarding does not exists"
            })
        }




        const {  onboardingId, phoneNumber, pin} = req.body
        
         const user = await  userModel.create({
            AcountNumber:phoneNumber.slice(1),
             onboardingId,
             pin
            
         })
        // const token = jwt.sign({ id: onboarding }, process.env.json_Secret, {
        //     expiresIn:process.env.Login_Expires
        // })

        //  const user = await userModel.create({
        //     AcountNumber:phoneNumber.slice(1),
        //     onboardingId
        // })
    
        onboarding.users.push(user._id)
           user.myonboardingId =  onboarding._id
           await user.save()   
           await onboarding.save()
     res.status(200).json({
        message:"user created successfully",
        user,
         onboarding,
       // token 
     })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    
}

exports.getAll = async (req, res) => {
    try {
        const getAll = await userModel.find();

        if (!getAll || getAll.length === 0) {
            // If no users are found, you can use a 404 status code
            res.status(404).json({
                message: "No users found",
            });
            console.log(getAll)
        } else {
            res.status(200).json({
                message: "These are the users available",
                getAll,
            });
        }
    } catch (error) {
        // Handle potential errors during the database query
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};




