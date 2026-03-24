import { NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "transactions.json");

// create the reading and writing functions

async function readTransactions() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
}


async function writeTransactions(data) {
    fs.writeFile(dataPath, JSON.stringify(data, null, 4))
}


export async function GET() {
    const transactions = await readTransactions()
    return NextResponse.json(transactions, { status: 200 })
}

export async function POST(request) {
    // read what they gave
    const transaction = await request.json()
    const transactions = await readTransactions()

    transactions.push(transaction)

    await writeTransactions(transactions);

    return NextResponse.json("Successfully added the new transaction", { status: 201 })
}