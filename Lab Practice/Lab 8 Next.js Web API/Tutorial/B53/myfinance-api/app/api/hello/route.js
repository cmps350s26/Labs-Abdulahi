// HTTP METHODS I WANT TO SUPPORT UNDER THIS RESOURCE
// GET /hello
// POST /hello
// PUT /hello
// DELETE /hello

import { NextResponse } from "next/server";

// to activate the get and return json data

//GET DATA
export async function GET(request, { params }) {
    const message = "Welcome to Finances GET API End point /api/account"
    return NextResponse.json(message)
}
//ADD DATA
export async function POST(request, { params }) {
    const message = "Welcome to Finances POST API End point /api/account"
    return NextResponse.json(message)
}

//UPDATE DATA
export async function PUT(request, { params }) {
    const message = "Welcome to Finances PUT API End point /api/account"
    return NextResponse.json(message)
}
//DELETE DATA
export async function DELETE(request, { params }) {
    const message = "Welcome to Finances DELETE API End point /api/account"
    return NextResponse.json(message)
}