
import connectDB from "@/DB/connect";
import Therapist from "@/app/models/therapist.model";
import { NextResponse, userAgent } from "next/server";
import User from "@/app/models/user.model";
import Jwt from "jsonwebtoken";
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
        const { fullName, specialization, email, phone, experience, userId } = reqBody;

        // Check if therapist already exists
        const existingTherapist = await Therapist.findOne({ email });
        if (existingTherapist) {
            return NextResponse.json({ message: "Therapist already exists" }, { status: 400 });
        }

        const users = []
        if (userId) {
            users.push(userId);
        }
        const newTherapist = new Therapist({
            fullName,
            specialization,
            email,
            phone,
            experience,
            users
        });
        if (userId) {
            const user = await User.findById(userId);
            user.Doc.push(newTherapist._id)
            const data = await user.save();
        }

        const saveData = await newTherapist.save();


        return NextResponse.json({ therapist: saveData, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(req) {
    try {
        // Ensure the database is connected
        await connectDB();

        // Get the access token from query parameters
        const accessToken = req.nextUrl.searchParams.get('accessToken');

        // Validate the access token
        if (!accessToken) {
            return NextResponse.json({ error: "Access token is required" }, { status: 400 });
        }

        // Verify the access token
        const token = await verifyAccessToken(accessToken);

        // Find the therapist
        const therapists = await Therapist.find({ users: token.id }); // Assuming you want to find a single therapist

        // Validate the therapist object
        if (!therapists) {
            return NextResponse.json({ error: "Therapist not found" }, { status: 404 });
        }



        // If the token id is not found in users array
        return NextResponse.json({ therapists: therapists }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}