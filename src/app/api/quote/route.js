import { NextResponse } from "next/server";
import quote from "@/quotes/quote";
import Quote from "@/app/models/qoute.model";
import connectDB from "@/DB/connect";

function selectRandomQuote(quote) {
    const randomIndex = Math.floor(Math.random() * quote.length);
    return quote[randomIndex];
}


export async function POST(req) {
    try {
        connectDB()
        // Parse the request body
        const reqBody = await req.json();
        const { quote } = reqBody;

        // Validate the input
        if (!quote || typeof quote !== 'string') {
            return NextResponse.json({ error: "Quote is required and must be a string." }, { status: 400 });
        }

        // Create a new Quote document
        const data = new Quote({
            quote: quote
        });

        // Save the quote to the database
        const savedQuote = await data.save();

        // Return the saved quote with a 200 status code
        return NextResponse.json({ savedQuote }, { status: 200 });
    } catch (error) {
        // Handle any errors that occur
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function GET() {
    try {
        // Connect to the database
        await connectDB();

        // Get a random quote using MongoDB's $sample aggregation
        const randomQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);

        // If no quotes found
        if (randomQuote.length === 0) {
            return NextResponse.json({ error: "No quotes found" }, { status: 404 });
        }

        // Return the random quote with a 200 status code
        return NextResponse.json({ data: randomQuote[0] }, { status: 200 });
    } catch (error) {
        // Handle any errors that occur
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}