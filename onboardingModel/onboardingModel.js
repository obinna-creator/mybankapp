const mongoose =  require ("mongoose")
const bcrypt = require("bcryptjs")
const validator= require("validator")
const onboardingSchema = new  mongoose.Schema({
    firstname: {
        type: String,
        require:[true,"please enter firstname"]
    },
     lastname: {
        type: String,
      require:[true,"please enter lastname"] 
    },
    email: {
        type: String,
       validate:[validator.isEmail,"please enter valid email"]
    },
    phoneNumber: {
        type:String,
        require:true
    },
    pin: {
        type: String,
        required: [true,"please enter your pin"],
        maxlength:4
    },
    password: {
        type: String,
        require: [true, "please enter your password"],
       // minlength:12,
          select:false
    },
    confirmPassword:{
        type: String,
        require: [true, "please enter your password"],
        validate:{
            //this validator works for save( and create()
            validator: function (val) {
                return val == this.password
            },
            message:`password and comfirm password does not match`
        }
        
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]

})

onboardingSchema.pre('save', async function (next) {
      // check if the password was modified or updated
    if  (!this.isModified('password')) return next() 
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmPassword = undefined
    next()
})


// a function thats used to compare password from the re.body and from the database
// first arguement in the function is the req.body and the other arguement is from the database

onboardingSchema.methods.comparepasswordInDB = async function (pass, passDB) {
    return await bcrypt.compare(pass, passDB)
}
const onboardingmodel= mongoose.model("onboarding",onboardingSchema )

module.exports=onboardingmodel