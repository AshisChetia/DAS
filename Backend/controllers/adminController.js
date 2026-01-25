import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


//API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        //1. Check for all data
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        //2. Validate email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        //3. Validate strong password
        if (!strongPasswordRegex.test(password)) {
            return res.json({
                success: false,
                message: "Password must include 1 uppercase, 1 number, and 1 special character"
            });
        }

        //4. Hash the password (Encrypt it)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //5. Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        //6. Create doctor object
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        //7. Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0.5)
        }

        res.json({ success: true, dashData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, adminDashboard };