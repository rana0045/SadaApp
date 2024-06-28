import mongoose from 'mongoose';

const MeetingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number, // duration in minutes
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Meeting = mongoose.models.Meeting || mongoose.model('Meeting', MeetingSchema);

export default Meeting;
