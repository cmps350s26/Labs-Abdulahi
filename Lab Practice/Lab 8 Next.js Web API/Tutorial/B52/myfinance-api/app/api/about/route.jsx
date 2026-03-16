import { NextResponse } from "next/server";

export async function GET(params) {

    return NextResponse.json(
        {
            message: "This returns data and not page"
        }
    )
}
