import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    university: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
}, { timestamps: true })

const User = new mongoose.model('User', userSchema);

export default User;