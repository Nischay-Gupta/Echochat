import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const secret =process.env.JWT_SECRET


const setuser = (userName,password) => {
    const payload = {
        userName,
        password
    }
    const token = jwt.sign(payload,secret)
    
    return token
}

const getuser = (token) => {
    try {
        const user = jwt.verify(token, secret);
        return user;
    } catch (error) {
        throw new Error("Invalid token");
    }
}


export {
    setuser, getuser

}