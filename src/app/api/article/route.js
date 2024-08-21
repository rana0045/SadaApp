import Article from "@/app/models/article.model";
import connectDB from "@/DB/connect";
import { NextResponse } from "next/server";




export async function POST(req) {
    await connectDB();
    try {
        const reqBody = await req.json()
        const { title, description, author, url } = reqBody
        if (!title || !description || !author) {
            return NextResponse.json({ message: "all fields required" }, { status: 400 })
        }
        const article = await Article.create({ title, description, author, url })
        return NextResponse.json({ message: "article created successfully", article }, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        connectDB()
        const articles = await Article.find()

        return NextResponse.json({ articles }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}