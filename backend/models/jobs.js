const { required } = require('joi');
const mongoose = require('mongoose');

// Job Schema
const jobSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectOwnerName:{type:String, required:true},  
  jobDescription: { type: String, required: true },
  phoneNo:{type:String, required:true},
  pincode:{type:Number, required:true},
  /**location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },**/
  address:{type: String, required:true},
  category: { type: String, required: true }, // Example: Plumber, Electrician, etc.
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
 /**  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },**/
  datePosted: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
