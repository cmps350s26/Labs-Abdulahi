import { NextResponse } from 'next/server'
import React from 'react'

// This is an API route that responds to GET requests with a JSON message
export async function GET(request, { params }) {
    return NextResponse.json({ message: 'Hello, Pickachu World!' })
}

export async function POST(request, { params }) {
    const data = await request.json()
    console.log(data)
    return NextResponse.json({ message: 'Pokemon added successfully!' })
}

// actions you can do on this resource
// GET, POST, PUT, DELETE, PATCH, etc.

// HTTP Methods: [RESTFUL API]

// GET - Retrieve data from the server
// POST - add a new pokemon to the database
// PUT - update an existing pokemon in the database
// DELETE - remove a pokemon from the database
// PATCH - partially update a pokemon in the database