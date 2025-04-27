import { getuser } from "../utils.js";
import { User } from "../modles/user.models.js";
import { setuser } from "../utils.js";
const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        if (!userName || !email || !password) {
            return res.json({ error: "every feild is required" })
        }
        const user = await User.create({
            userName,
            email,
            password
        })
        return res.json({
            success: true,
            successMessage: "user created sucessfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body

        if (!userName || !password) {
            return res.json({ error: "every feild is required" })
        }
        const user = await User.findOne({ userName })
        if (!user) return res.json({ error: "invaild username" })

        if (user.password !== password) {
            return res.json({ error: "invaild password" })
        }
        const token = setuser(userName, password)


        res.cookie("uid", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })
        return res.json({
            success: true,
            successMessage: "User logged in sucsessfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            error: error
        })
    }
}
const cheakAuth = async (req, res) => {
    try {
        // Get token from cookies
        const token = req.cookies.uid;

        // If no token, return failure response
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

    
        const decodedUser = getuser(token)

        // Return success response with the decoded user info
        return res.status(200).json({ success: true, user: decodedUser });
    } catch (error) {
        // Handle any errors related to token verification
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

export { registerUser, loginUser ,cheakAuth}