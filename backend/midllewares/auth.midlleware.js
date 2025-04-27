import { getuser } from "../utils.js";

const checkUserLogin = async (req, res, next) => {
    const token = req.cookies.uid
    

    if (!token) return res.json({ error: "please login first" })

    try {
        const decodeduser = getuser(token)
        req.user = decodeduser
        next()

    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

}

export default checkUserLogin