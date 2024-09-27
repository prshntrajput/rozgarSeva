const mongoose = require("mongoose")
const config = require("../utils/config")
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String,minlength:5, maxlenght:240,required: true },
  email: { type: String, required: true, minlenght:5,maxlenght:240, unique: true },
  password: { type: String, minlenght:5, maxlength:1024, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  bio: String,
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
});

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, config.JWT_KEY);
    return token;
}


const User = mongoose.model('User', userSchema);

/**jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]**/

   
 /**  const schema = Joi.object({
      name: Joi.string().min(4).max(240).required(),
      email: Joi.string().email().min(4).max(240).required(),
      password: Joi.string().min(8).max(244).required()
    });**/

  

module.exports = User;
