// pages/api/meetings/index.js
import connectDB from '@/DB/connect';
import Meeting from '@/app/models/meeting.model';
import User from '@/app/models/user.model';
import Therapist from '@/app/models/therapist.model';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectDB();
        const reqBody = await req.json();
        const { date, time, duration, userId, therapistId, notes } = reqBody;

        // Validate User and Therapist existence
        const user = await User.findById(userId);
        const therapist = await Therapist.findById(therapistId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (!therapist) {
            return NextResponse.json({ message: "Therapist not found" }, { status: 404 });
        }

        // Create a new meeting
        const newMeeting = new Meeting({
            date,
            time,
            duration,
            user: user._id,
            therapist: therapist._id,
            notes
        });

        await newMeeting.save();

        // Update the user and therapist models to include the new meeting
        user.sessions.push(newMeeting._id);


        await user.save();
        await therapist.save();

        return NextResponse.json({ meeting: newMeeting, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
