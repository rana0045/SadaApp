// pages/api/meetings/index.js
import connectDB from '@/DB/connect';
import Meeting from '@/app/models/meeting.model';
import User from '@/app/models/user.model';
import Therapist from '@/app/models/therapist.model';
import { NextResponse } from 'next/server';
import Jwt from 'jsonwebtoken';

const verifyAccessToken = async (accessToken) => {
    try {
        const decoded = await Jwt.verify(accessToken, process.env.JWT_SECRET);
        return decoded;

    } catch (error) {
        return null
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const reqBody = await req.json();
        const { date, time, duration, userId, therapistId, notes, meetingUrl } = reqBody;

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
        const newMeeting = await Meeting.create({
            date,
            time,
            duration,
            user: user._id,
            therapist: therapist._id,
            notes,
            meetingUrl
        });



        // Update the user and therapist models to include the new meeting
        user.sessions.push(newMeeting._id);


        await user.save();
        await therapist.save();

        return NextResponse.json({ meeting: newMeeting, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();

        // const accessToken = await req.nextUrl.searchParams.get("accessToken");

        // if (!accessToken) {
        //     return NextResponse.json({ error: "Access token not provided" }, { status: 400 });
        // }

        // const token = await verifyAccessToken(accessToken);

        // if (!token) {
        //     return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        // }

        const meetings = await Meeting.find().populate("therapist");

        return NextResponse.json({ meetings }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



