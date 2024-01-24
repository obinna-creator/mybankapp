const depositmodel= require("../depositModel/depositmodel")
const usermodel = require("../userModel/usermodel")
exports.createDeposit = async (req, res) => {
    try {
        
        const {  userId, Amount } = req.body
         
        const user = await usermodel.findById(userId)
        
        if (!user) {
            res.status(404).json({
                message:"user not found"
            })
        }

        const deposit = await depositmodel.create({
            user,
            Amount
        })
        user.balance = (parseFloat(user.balance) + parseFloat(Amount)).toString();

      
        // deposit.userId.user._id
        // user.myonboardingId = deposit._id

        
        // deposit.userId = user._id;
        // user.myonboardingId = deposit._id;

        await user.save()
        await deposit.save()
        res.status(200).json({
            message: "sucessfully created",
            user,
            deposit
            
        })
           
    } catch (error){
        res.status(500).json({
            message:error.message
        })
    }
    
}

exports.getAll = async (req, res) => {
    try {
        
  const getAll= await depositmodel.find()
        if (getAll.length === 0) {
            res.status(400).json({
          message:"no user found"
      })
        }else{
            res.status(200).json({
                message: "these are this deposit available",
                getAll
            })
        }
        


    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}