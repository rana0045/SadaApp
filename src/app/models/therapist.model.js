import mongoose from 'mongoose';

const TherapistSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    phone: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Therapist = mongoose.models.Therapist || mongoose.model('Therapist', TherapistSchema);

export default Therapist;
