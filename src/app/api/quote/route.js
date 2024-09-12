import { NextResponse } from "next/server";
// import quote from "@/quotes/quote";
import axios from "axios";
// function selectRandomQuote(quote) {
//     const randomIndex = Math.floor(Math.random() * quote.length);
//     return quote[randomIndex];
// }

export async function GET() {
    try {
        const response = await axios.get('https://api.kanye.rest/')

        const data = response.data
        return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}