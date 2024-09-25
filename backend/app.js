const express = require("express");
const app = express();
const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose");
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")


//mongoose connection
mongoose.set("strictQuery",false);
mongoose.connect(config.MONGODB_URL).then((result)=>{
    logger.info("connected to mongoDB")
}).catch((err)=>{
    logger.error(err.message)
})

app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);


//middlewares
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports= app;