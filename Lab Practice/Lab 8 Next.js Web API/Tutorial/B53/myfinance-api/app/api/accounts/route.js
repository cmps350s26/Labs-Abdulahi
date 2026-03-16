// we need to read the json files

import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "data", "accounts.json")

// read the content of the file located in filepath
async function readAccounts() {
    const data = await fs.readFile(filePath);
    return JSON.parse(data)
}

async function writeAccounts(accounts) {
    await fs.writeFile(filePath, JSON.stringify(accounts, null, 4))
}
// /api/account

export async function GET(request, { params }) {
    try {
        //return all the accounts
        const accounts = await readAccounts()
        return NextResponse.json(accounts)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
export async function POST(request, { params }) {
    try {
        // i will get a new account from the user
        const account = await request.json()

        // YOU CAN VALIDATE THE ACCOUNT OBJECT HERE
        if (!account.name || !account.balance) {
            return NextResponse.json({
                message: "Invalid account data"
            }, { status: 400 })
        }

        // we need to read all the accounts 
        const accounts = await readAccounts()

        accounts.push(account)

        writeAccounts(accounts)

        // i should write this back to the file

        //add that account to the list of accounts
        return NextResponse.json({
            message: "Added the account successful"
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

