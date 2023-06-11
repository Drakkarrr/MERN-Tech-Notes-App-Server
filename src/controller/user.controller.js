import asyncHandler from 'express-async-handler'
import User from '../models/user.models.js'

const authUser = asyncHandler(async (req, res) => {
    
    res.status(200).json({ message: "Auth user" })
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400).json({ message: "User already exist" })
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400).json({ message: "Invalid user data" })
    }

    res.status(200).json({ message: "Register user" })
})

const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logged Out successfully" })
})

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "User Profile" })
})

const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update User Profile" })
})



export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile }