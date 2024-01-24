const mongoose=require ("mongoose")
const bettingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"user",
        require: true
        
    },
    Amount: {
        type: String,
        require: true,
        
    },
    betpin: {
        type:String,
    },
    betName: {
        type: String,
        enum:['betnaija','sportybet','betKing'],
        default:'betnaija'
    }
})

const bettingModel = mongoose.model("betting",bettingSchema)
module.exports=bettingModel