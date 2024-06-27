import connectDB from "@/DB/connect";
import User from "@/app/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        connectDB()

        const reqBody = await req.json()

        const { fullName, email, password, nickName } = reqBody

        if (!fullName || !email || !password || !nickName) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 })
        }
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User(
            {
                fullName,
                email,
                password: hashPassword,
                nickName,

            }
        )

        const savedUser = await newUser.save()


        return NextResponse.json({ Message: "User registered successfully", user: savedUser }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}