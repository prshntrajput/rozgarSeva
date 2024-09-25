const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../utils/config")
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");
const User  = require("../models/user");


userRouter.get("/me",auth, async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");
    res.send(user)
})

userRouter.post("/", async (req, res)=>{
    /**const {error} = User.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);**/

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

    res.header('x-header-token', token).send({_id: req.body._id,name: req.body.name, email:req.body.email});
})

module.exports = userRouter;