const bettingmodel= require("../bettingModel/bettingmodel")
const usermodel=require("../userModel/usermodel")
exports.betting =async (req, res) => {
    try {
        
        const { betName, betpin,Amount } = req.body
        const userId = req.user.userId
        const user = await usermodel.findById(userId)
        
        if (!betpin ) {
            res.status(404).json({
                message:"please input your pin"
            })
        }
        if (betpin !== user.pin) {
            res.status(400).json({
                message:"please input correct pin"
            })
        }
        if (!Amount) {
            res.status(404).json({
                message:"please input amount"
            })

        }
        if (!user ) {
            res.status(404).json({
                message:"you are not a user"
            })
        }
        if (user.balance < Amount) {
            res.status(404).json({
                message:"insufficient balance for bet"
            })
        }

        const bet = await bettingmodel.create({
            betName,
            Amount,
            pin
        })
        // if (Amount < 10 || Amount === 0) {
        //     res.status(404).json({
        //         message:""
        //     })
        // }

    } catch (error) {
        res.satus(500).json({
            message:error.message
        })
    }
}