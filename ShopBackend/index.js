const express = require("express")
const cors = require("cors")
const path = require("path")
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser")
const cloudinary = require('cloudinary').v2;
const app = express()
const mongoose = require("mongoose")
require("dotenv").config();
app.use(
    express.urlencoded({extended:false})
)
app.use(cors({
    origin:"http://localhost:5173"
}) )
app.use(bodyParser.json({ limit: "10mb" })); // Change "10mb" to your desired limit
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use('/uploads', express.static(path.join(__dirname,  'upload')));


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
  
  // Check if the credentials are loaded
  console.log(process.env.CLOUD_NAME);  // Debugging
  console.log(process.env.API_KEY);
  console.log(process.env.API_SECRET);



app.use(express.json())
app.use("/api/auth",userRoutes)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser :true,
    useUnifiedTopology:true
})
.then(() => console.log( 

    "Mongodb connected successfully"))
.catch((err) => console.log("Error while handling the mongodb ", err))
app.listen(process.env.PORT, () => {
    console.log( `Server is started at ${process.env.PORT}`)
})
