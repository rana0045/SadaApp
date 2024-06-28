import { NextResponse } from "next/server";
import quote from "@/quotes/quote";

function selectRandomQuote(quote) {
    const randomIndex = Math.floor(Math.random() * quote.length);
    return quote[randomIndex];
}

export async function GET() {
    try {


        const data = selectRandomQuote(quote);

        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}