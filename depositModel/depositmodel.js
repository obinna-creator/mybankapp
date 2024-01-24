const mongoose= require("mongoose")

const depositSchema = new mongoose.Schema({
  userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    Amount: {
        type:String,
        require:true,
    }
})


const depositModel= mongoose.model("Deposit",depositSchema)
module.exports=depositModel