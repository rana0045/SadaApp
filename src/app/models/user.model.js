import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    feeling: [
        {
            type: String,
            default: []
        }
    ],
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meeting"
    }],
    Doc: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist'
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
