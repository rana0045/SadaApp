// pages/api/therapists/index.js
import connectDB from "@/utils/dbConnect";
import Therapist from "@/models/therapist.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new therapist
        const newTherapist = new Therapist({
            fullName,
            specialization,
            email,
            password: hashedPassword
        });

        await newTherapist.save();

        const response = {
            fullName: newTherapist.fullName,
            specialization: newTherapist.specialization,
            email: newTherapist.email
        };

        return NextResponse.json({ therapist: response, success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
