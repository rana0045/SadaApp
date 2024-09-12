import { NextResponse } from "next/server";
import quote from "@/quotes/quote";

function selectRandomQuote(quote) {
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomIndex = Math.floor((timestamp % quote.length)); // Use timestamp as seed
    return quote[randomIndex];
}

export async function GET() {
    try {
        const data = selectRandomQuote(quote);

        const response = NextResponse.json({ data }, { status: 200 });
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
