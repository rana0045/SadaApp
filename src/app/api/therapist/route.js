
import connectDB from "@/DB/connect";
import Therapist from "@/app/models/therapist.model";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDB();

        const reqBody = await req.json();
        const { fullName, specialization, email, phone, experience } = reqBody;

        // Check if therapist already exists
        const existingTherapist = await Therapist.findOne({ email });
        if (existingTherapist) {
            return NextResponse.json({ message: "Therapist already exists" }, { status: 400 });
        }

        // Hash the password


        // Create a new therapist
        const newTherapist = new Therapist({
            fullName,
            specialization,
            email,
            phone,
            experience
        });

        const saveData = await newTherapist.save();



        return NextResponse.json({ therapist: saveData, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function GET(req) {
    try {

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}
