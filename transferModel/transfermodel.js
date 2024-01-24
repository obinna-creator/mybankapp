const mongoose=require("mongoose")

const transferSchema = new mongoose.Schema({
   myonboardingId: [{
         type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        require:true
    }],
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    Amount: {
        type: String,
        require:true
    }
    


       
    
})

const transfermodel = mongoose.model('Transfer', transferSchema)
module.exports=transfermodel