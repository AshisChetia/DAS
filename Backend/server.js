import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import adminRouter from "./routes/adminRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors())

//API endpoints
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    console.log(`Server started on port ${port}`);
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});

export default app;

