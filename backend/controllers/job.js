const jobRouter = require("express").Router();
const Job = require("../models/jobs");
const User = require("../models/user")
const auth = require("../middleware/authMiddleware")
const Joi = require("joi")


// validations schema
const JobSchema = Joi.object({
    projectName:Joi.string().min(4).max(30).required(),
    projectOwnerName:Joi.string().min(3).max(30).required(),
    jobDescription:Joi.string().min(3).max(200).required(),
    phoneNo:Joi.string().min(10).max(11).required(),
    address:Joi.string().min(3).max(200).required(),
    category:Joi.string().min(3).max(30).required(),
    pincode:Joi.string().min(6).max(6).required(),
});


// get job that is created by all users
jobRouter.get('/', async (req, res) => {
  try {
    // Fetch all jobs from the database
    const jobs = await Job.find()
      .populate('createdBy', 'name email') // Populate the createdBy field with user's name and email
      .sort({ datePosted: -1 }); // Sort by datePosted, newest first

    // Send the jobs back to the client
    res.status(200).send(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Server error");
  }
});


// get job that is created by user
jobRouter.get("/:userId", async (req,res)=>{
    try{
        const jobs = await Job.find({ createdBy: req.params.userId });
        res.status(200).send(jobs)
    }catch(error){
       console.log(error);
    }
})

// get job with id

jobRouter.get("/:id" ,auth , async (req,res)=>{
    const {id}= req.params;
    try {
        const job = await Job.findById(id);

        if(!job){
            return res.status(404).send("Job not found")
        }

        res.status(200).send(job)
    
    } catch (error) {
        console.log(error.message)
    }
    
})


// edit a job

jobRouter.put("/:id/edit", auth ,async(req,res)=>{

    const { error } = JobSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    try{
    const {id} = req.params;

    const { projectName, projectOwnerName, jobDescription, phoneNo, address, category } = req.body;

    const job = Job.findById(id);
    if(!job){
        return res.status(404).send("Job not found")
    }

    const jobs = await Job.findByIdAndUpdate(id, { projectName, projectOwnerName, jobDescription, phoneNo, address, category } , {new:true} );
    res.status(200).send(jobs)} 
    catch{
        console.log(error)
        res.status(500).send("Server Error")
    }
})


// delete a job
jobRouter.delete("/:id",auth,async (req,res)=>{
    const { id} = req.params;
    const userId = req.user._id;

   try {
     const job = await Job.findByIdAndDelete(id);
    if(!job) {
        return res.status(404).send("Job not found");
    }

    // Delete job from user's jobsPosted array
    await User.findByIdAndUpdate(userId, {
      $pull: { jobsPosted: id }
    });

    res.status(200).send("Job deleted successfully");
    
   } catch (error) {
     consple.log(error)
     res.status(500).send("Server error.");
   }

   
})

// create a new job
jobRouter.post("/", auth, async (req, res) => {

    const { error } = JobSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

  try {
    const { projectName, projectOwnerName, jobDescription, phoneNo, address, category ,pincode } = req.body;

    // Validate that all required fields are present
    if (!projectName || !projectOwnerName || !jobDescription || !phoneNo || !address || !category || !pincode) {
      return res.status(400).send("All fields are required.");
    }

    // Create new job instance
    const job = new Job({
      projectName,
      projectOwnerName,
      jobDescription,
      phoneNo,
      address,
      pincode,
      category,
      createdBy: req.user._id, // User who is posting the job
    });

    // Save the job to the database
    const savedJob = await job.save();
    
     await User.findByIdAndUpdate(req.user._id, {
      $push: { jobsPosted: savedJob._id }
    })

    res.status(201).send(savedJob);
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).send("Server error.");
  }
});

module.exports = jobRouter;