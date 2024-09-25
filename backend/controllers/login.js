const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router();
const config = require("../utils/config");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");
const User = require("../models/user");

loginRouter.get("/", auth, (req,res)=>{
    res.send("hello")
})

loginRouter.post("/", async (req,res)=>{
    
  let user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = user.generateAuthToken();
  res.send(token);



})

module.exports=loginRouter;