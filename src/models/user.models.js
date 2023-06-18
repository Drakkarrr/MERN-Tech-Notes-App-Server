import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true, // unique email
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: String,
        default: "Employee",
    }],
    activeStatus: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;