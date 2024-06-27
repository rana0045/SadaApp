import { NextResponse } from 'next/server';
import Jwt from 'jsonwebtoken';
import connectDB from '@/DB/connect';  // Make sure to use the correct path to your connectDB function
import User from '@/app/models/user.model';      // Make sure to use the correct path to your User model

const verifyAccessToken = async (accessToken) => {
    try {
        const decoded = await Jwt.verify(accessToken, process.env.JWT_SECRET);
        return decoded;

    } catch (error) {
        return null
    }
}



export async function GET(req) {
    try {
        await connectDB();

        const accessToken = req.nextUrl.searchParams.get("accessToken");
        if (!accessToken) {
            return NextResponse.json({ error: "Access token not provided" }, { status: 400 });
        }

        let token = await verifyAccessToken(accessToken)


        if (!token) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const user = await User.findById(token.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ data: user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        connectDB()
        const accessToken = req.nextUrl.searchParams.get("accessToken");
        const reqBody = await req.json()
        const { feeling } = reqBody

        let token = await verifyAccessToken(accessToken)


        if (!token) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const user = await User.findById(token.id);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        user.feeling = feeling;
        const updatedUser = await user.save();
        return NextResponse.json({ Message: "user updated successfully", data: updatedUser }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



export async function DELETE(req) {
    try {
        connectDB()
        const accessToken = req.nextUrl.searchParams.get("accessToken");


        let token = await verifyAccessToken(accessToken)


        if (!token) {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        const deletedUser = await User.findByIdAndDelete(token.id);
        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ Message: "user deleted successfully", data: deletedUser }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



