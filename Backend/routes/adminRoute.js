import express from "express";
import { addDoctor, loginAdmin, allDoctors , appointmentsAdmin, adminDashboard } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/dashboard', authAdmin, adminDashboard);

export default adminRouter;