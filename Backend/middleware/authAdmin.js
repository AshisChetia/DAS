import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers;

        console.log("--- AUTH DEBUG ---");
        console.log("1. Token Received:", atoken);

        if(!atoken) {
            return res.json({success: false, message: "Not authorized. Login again"})   
        }
        
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        console.log("3. Token Valid! Decoded:", token_decode);


        next();

    } catch (error) {
        console.log("2. Error verifying token:", error.message);
        res.json({ success: false, message: "Token Error: " + error.message });
    }
}

export default authAdmin;