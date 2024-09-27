const jobRouter = require("express").Router();
const Job = require("../models/jobs");
const User = require("../models/user")
const auth = require("../middleware/authMiddleware")

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

jobRouter.get("/:userId", async (req,res)=>{
    try{
        const jobs = await Job.find({ createdBy: req.params.userId });
        res.status(200).send(jobs)
    }catch(error){
       console.log(error);
    }
})

jobRouter.get("/:id", (req,res)=>{
    try {
        const userid = req.user._id;
        const id= req.params.id;

    } catch (error) {
        
    }
})


jobRouter.put("/:id/edit", auth ,async(req,res)=>{
    const {id} = req.params;

    const { projectName, projectOwnerName, jobDescription, phoneNo, address, category } = req.body;

    const job = Job.findById(id);
    if(!job){
        return res.status(404).send("Job not found")
    }

    const jobs = await Job.findByIdAndUpdate(id, { projectName, projectOwnerName, jobDescription, phoneNo, address, category } , {new:true} );
    res.status(200).send(jobs)
})

jobRouter.post("/", auth, async (req, res) => {
  try {
    const { projectName, projectOwnerName, jobDescription, phoneNo, address, category } = req.body;

    // Validate that all required fields are present
    if (!projectName || !projectOwnerName || !jobDescription || !phoneNo || !address || !category) {
      return res.status(400).send("All fields are required.");
    }

    // Create new job instance
    const job = new Job({
      projectName,
      projectOwnerName,
      jobDescription,
      phoneNo,
      address,
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