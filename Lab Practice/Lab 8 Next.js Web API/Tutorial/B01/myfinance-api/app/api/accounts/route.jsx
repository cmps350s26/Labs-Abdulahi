import { NextResponse } from 'next/server'
import React from 'react'

const accounts = [
    {
        "id": 3,
        "name": "Emergency Fund",
        "type": "savings",
        "balance": 10000.00,
        "status": "active"
    },
    {
        "id": 4,
        "name": "Old Account",
        "type": "checking",
        "balance": 0,
        "status": "closed"
    }
]

export async function GET(request, { params }) {
    return NextResponse.json(accounts)
}

export async function POST(request, { params }) {
    const account = await request.json()
    accounts.push(account)
    return NextResponse.json({ message: "successfully added the account" })
}