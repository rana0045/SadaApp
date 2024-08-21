import connectDB from "@/DB/connect";
import User from "@/app/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        connectDB()
        const reqBody = await req.json()
        const { email, password } = reqBody

        //check if user exists
        const user = await User.findOne({ email })

        if (!user) return NextResponse.json({ Message: "User not found" }, { status: 404 });
        const hashPassword = await bcrypt.compare(password, user.password);
        if (hashPassword === false) {
            return NextResponse.json({ Message: "Incorrect password" }, { status: 400 });
        }
        const accessToken = await Jwt.sign(
            {
                id: user._id,
                fullName: user.fullName,
                email: user.email


            }, process.env.JWT_SECRET);

        const response = { id: user._id, email: user.email, nickName: user.nickName, fullName: user.fullName }

        return NextResponse.json({ User: response, accessToken: accessToken, Success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}