import User from '../models/user.models.js'
import Note from '../models/note.models.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) return res.status(400).json({ message: 'User not found' })
    res.json(users)
})

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body
    if(typeof roles !== 'object') return res.status(400).json({ message: 'Roles must be an array' })
    if(!username || !password ||!Array.isArray(roles) || !roles.length ) return res.status(400).json({ message: 'All fields are required' })

    const duplicate = await User.findOne({ username }).lean().exec()
    if(duplicate) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashedPassword, roles })
    if(user) return res.status(201).json({ message: 'User created' })
    return res.status(400).json({ message: 'Opss! user not created' })
})

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, password, roles, activeStatus } = req.body

    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof activeStatus !== 'boolean') return res.status(400).json({ message: 'All fields are required!' })

    const user = await User.findById(id).exec()
    if(!user) return res.status(400).json({ message: 'User not found' })

    const duplicate = await User.findOne({ username }).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id) return res.status(409).json({ message: 'Duplicate username' })

    user.username = username
    user.roles = roles
    user.activeStatus = activeStatus

    if(password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
    }

    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated successfully` })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if(!id) return res.status(400).json({ message: 'User id is required' })

    const notes = await Note.find({ user: id }).exec().lean()
    if (notes?.length) {
        return res.status(400).json({ message: 'User has notes, delete them first' })
    }

    const user = await User.findByIdAndDelete(id).exec()
    if(!user) return res.status(400).json({ message: 'User not found' })
    res.json({ message: 'User deleted' })
})

export default { getAllUsers, createNewUser, updateUser, deleteUser }