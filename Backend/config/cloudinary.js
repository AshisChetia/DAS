import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = async () => {

    console.log("DEBUG CLOUDINARY CONFIG:");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY);
    // Do NOT print the full secret, just the length to see if it exists
    console.log("Secret Length:", process.env.CLOUDINARY_SECRET_KEY ? process.env.CLOUDINARY_SECRET_KEY.length : "MISSING");

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
}

export default connectCloudinary;