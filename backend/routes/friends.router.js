import { Router } from "express";
import checkUserLogin from "../midllewares/auth.midlleware.js"
import {
    getAllusers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    viewPendingRequests,
    cancelFriendRequest,
    viewAllFriends
} from "../controllers/freind.controller.js"

const friendsRouter = Router()

friendsRouter.get("/allusers", checkUserLogin, getAllusers)
friendsRouter.get("/sendrequest/:userName", checkUserLogin, sendFriendRequest)
friendsRouter.get("/pendingrequests", checkUserLogin, viewPendingRequests)
friendsRouter.get("/rejectrequest/:userName", checkUserLogin, rejectFriendRequest)
friendsRouter.get("/cancelrequest/:userName", checkUserLogin, cancelFriendRequest)
friendsRouter.get("/acceptrequest/:userName", checkUserLogin, acceptFriendRequest)
friendsRouter.get("/allfriends", checkUserLogin, viewAllFriends)


export default friendsRouter