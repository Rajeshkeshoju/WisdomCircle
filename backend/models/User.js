import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        minlength: 6,
        required: true,
    }
});

const User = Mongoose.model('users', UserSchema);
export default User;