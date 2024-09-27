const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");
const User  = require("../models/user");
const Joi = require("joi")


// Joi validation schema
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    pincode: Joi.number().min(6).required()
});


userRouter.get("/me",auth, async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");
    res.send(user)
})

userRouter.post("/", async (req, res)=>{

      // Validate the request body
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


   try{
        
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User alrrady exits!");

     user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        pincode: req.body.pincode
    }); 


    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    
    //generating jwt token in response header
     const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({_id: user._id,name: user.name, email:user.email, pincode:user.pincode, token:token});

}catch(error){
    res.send(error.message)
}
})

module.exports = userRouter;