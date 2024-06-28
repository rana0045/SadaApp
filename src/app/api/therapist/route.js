
import connectDB from "@/DB/connect";
import Therapist from "@/app/models/therapist.model";
import { NextResponse, userAgent } from "next/server";
import User from "@/app/models/user.model";

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


        const newTherapist = new Therapist({
            fullName,
            specialization,
            email,
            phone,
            experience
        });

        const user = await User.findById(userId);
        user.Doc.push(newTherapist._id)
        const data = await user.save();


        const saveData = await newTherapist.save();


        return NextResponse.json({ therapist: saveData, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function GET(req) {
    try {
        connectDB()

        const id = await req.nextUrl.searchparams.get('id')
        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }
        const therapist = await Therapist.findById(id)
        if (!therapist) {
            return NextResponse.json({ error: "Therapist not found" }, { status: 404 });
        }
        return NextResponse.json({ therapist: therapist }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}
