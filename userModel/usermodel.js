const mongoose= require("mongoose")

const userSchema = new  mongoose.Schema({
  
 AcountNumber: {
    type: String,
    unique: true,
   require:true
  },
   pin: {
        type: String,
        require: true,
        maxlength:4
    },
  balance: {
    type: String,
    default:0
  },
  myonboardingId: [{
       type: mongoose.Schema.Types.ObjectId,
      ref:"onboarding"
    }]
 
})

const userModel = mongoose.model("user", userSchema)
module.exports= userModel