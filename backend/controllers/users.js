const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");
const User  = require("../models/user");



userRouter.get("/me",auth, async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");
    res.send(user)
})

userRouter.post("/", async (req, res)=>{


   try{
        
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User alrrady exits!");

     user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password
    }); 


    // hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    
    //generating jwt token in response header
     const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({_id: user._id,name: user.name, email:user.email, token:token});

}catch(error){
    res.send(error.message)
}

    
    
})

module.exports = userRouter;