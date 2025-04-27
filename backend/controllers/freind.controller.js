
import { User } from "../modles/user.models.js";
const getAllusers = async (req, res) => {
    try {
        const currentUserName = req.user.userName; 
        const currentUser = await User.findOne({ userName: currentUserName }).populate('friends', 'userName');

        if (!currentUser) {
            return res.json({
                success: false,
                error: "User not found"
            });
        }
        const friendUserNames = currentUser.friends.map(friend => friend.userName);
        const nonFriendUsers = await User.find({
            userName: { 
                $ne: currentUserName,   
                $nin: friendUserNames    // Exclude users who are already friends by their usernames
            }
        }, {
            password: 0, // Exclude password for privacy
            email: 0     // Exclude email for privacy
        });

        return res.json({
            success: true,
            data: nonFriendUsers
        });
    } catch (error) {
        return res.json({ 
            success: false,
            message: "An error occurred while fetching users", 
            error: error.message 
        });
    }
};



const sendFriendRequest = async (req, res) => {
    try {
        const currentUserName = req.user.userName
        const targetuserName = req.params.userName

        const currentuser = await User.findOne({
            userName: currentUserName
        })
        if (!currentuser) return res.json({
            success: false,
            error: "User not found"
        })
        const targetUser = await User.findOne({
            userName: targetuserName
        })
        if (!targetUser) return res.json({
            success: false,
            error: "User not found"
        })
        const existingRequest = targetUser.friendRequests.find(request => request.sender.userName === currentUserName);

        if (existingRequest) {
            return res.json({
                success: false,
                error: "Friend request already sent"
            });
        }

        await targetUser.updateOne({
            $push: {
                friendRequests: {
                    sender: currentUserName
                }
            }
        })
        return res.json({
            sucess: true,
            sucessMessage: "friend request sent sucessfully"
        })


    } catch (error) {
        return res.json({ "an error occoured while sending friend request ": error.message })
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const currentUserName = req.user.userName
        const requestSenderUserName = req.params.userName
        const currentuser = await User.findOne( { userName: currentUserName },"-password")
        if (!currentuser) {
            return res.json({
                success: false,
                error: "Current user not found"
            });
        }
        const requestSender = await User.findOne({ userName: requestSenderUserName  },"-password")
        if (!requestSender) {
            return res.json({
                success: false,
                error: "Request sender user not found"
            });
        }
await currentuser.updateOne({
    $pull:{
        friendRequests:{sender:requestSenderUserName}
    },
    $addToSet:{
        friends:requestSender
    },
 
})

await requestSender.updateOne({
    $addToSet:{
        friends:currentuser
    },
})
        return res.json({
            success: true,
            sucessMessage: "friend request accepted"
        })


    } catch (error) {
        return res.json({ "an error occoured while accepting friend request ": error.message })
    }
}

const rejectFriendRequest = async (req, res) => {
    try {
        const currentUserName = req.user.userName
        const requestSenderUserName = req.params.userName
        const currentuser = await User.findOneAndUpdate(
            { userName: currentUserName },
            {
                $pull:
                {
                    friendRequests:
                        { sender: requestSenderUserName }
                }
            },
            { new: true })

        if (!currentuser) {
            return res.json({
                success: false,
                error: "Current user not found"
            });
        }
        return res.json({
            success: true,
            sucessMessage: "friend request rejected"
        })

    } catch (error) {
        return res.json({ "an error occoured while rejecting friend request ": error.message })

    }
}

const viewPendingRequests = async (req, res) => {
    try {
        const currentUserName = req.user.userName

        const currentUser = await User.findOne({
            userName: currentUserName
        })
        if (!currentUser) return res.json({
            success: false,
            error: "user not found"
        })
        const allPendingRequests = currentUser.friendRequests.filter(request => request.status === 'pending');

        return res.json({
            success: true,
            allPendingRequests: allPendingRequests
        })
    } catch (error) {
        return res.json({ "an error occoured while gettiing pending requests ": error.message })

    }
}

const cancelFriendRequest = async (req, res) => {
    try {
        const currentUserName = req.user.userName
        const targetuserName = req.params.userName
        const currentuser = await User.findOne({
            userName: currentUserName
        })
        if (!currentuser) return res.json({
            success: false,
            error: "User not found"
        })
        const targetUser = await User.findOne({
            userName: targetuserName
        })
        if (!targetUser) return res.json({
            success: false,
            error: "Target user not found"
        });
        const existingRequest = targetUser.friendRequests.filter(
            request => request.sender.userName === currentUserName
        );

        if (existingRequest === 0) {
            return res.json({
                success: false,
                error: "No friend request to cancel"
            });
        }
        targetUser.friendRequests = targetUser.friendRequests.filter(
            request => request.sender !== currentUserName
        );
        await targetUser.save();

        return res.json({
            success: true,
            message: "friend request cancelled successfully"
        })
    } catch (error) {
        return res.json({ "an error occoured while canceling friend request ": error.message })

    }
}
const viewAllFriends = async (req, res) => {
    try {
        const currentUserName = req.user.userName
        const currentuser = await User.findOne({
            userName: currentUserName
        })
        if (!currentuser) return res.json({
            success: false,
            error: "User not found"
        })
        const userFriends = currentuser.friends
        if (userFriends.length === 0) return res.json({
            success: true,
            successmessage: "you don't have any friends right now try adding friends to start chatting!"
        })
        const friendsDetails = await User.find({ _id: { $in: userFriends } });
        const friendList = friendsDetails.map(friend => friend.userName)

        return res.json({
            success: true,
            friendslist: friendList,
            userName:currentUserName
        })
    } catch (error) {
        return res.json({
            success: false,
            "there was an error while fetching all friends": error

        })
    }

}

export {
    getAllusers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    viewPendingRequests,
    cancelFriendRequest,
    viewAllFriends
}