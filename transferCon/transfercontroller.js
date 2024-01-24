
const transfermodel= require("../transferModel/transfermodel")
const usermodel= require("../userModel/usermodel")
exports.createtransfer = async (req, res,  next) => {
    
    try {
        
        const { myonboardingId, receiverId, Amount  } = req.body
        
        // const balance= await usermodel.find()
    const sender = await usermodel.findById(myonboardingId) 
        const reciever = await usermodel.findById(receiverId)
        if (!sender || !reciever) {
            res.status(400).json({
                message:"sender or receiver doesnt exists"
            })
            return next()
        }
        if (sender.balance < Amount) {
            res.status(404).json({
                message:"insufficient balance for the transfer"
            })
            return 
        }else{
            
        sender.balance -= Amount
        reciever.balance = (parseFloat(reciever.balance)+parseFloat(Amount)).toString()
        }
        
        //const transfer= await
        //   user.balance = (parseFloat(user.balance) + parseFloat(Amount)).toString();
        
   //reciever.balance = (parseFloat(reciever.balance) + parseFloat(Amount)).toString();

//        sender.balance =  (parseFloat(sender.balance)+ parseFloat(Amount)).toString()

        
        
        await sender.save()
        await  reciever.save()

   res.status(200).json({
       message: "successfully transfered",
       sender,
        reciever
   })



    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
    

}