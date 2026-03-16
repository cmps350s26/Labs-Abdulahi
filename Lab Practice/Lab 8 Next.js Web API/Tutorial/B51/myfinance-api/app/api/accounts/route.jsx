import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";


const accountsFilePath = path.join(process.cwd(), "data", "accounts.json"); // /data/accounts.json

async function readAccounts() {
    const data = await fs.readFile(accountsFilePath)
    return JSON.parse(data)
}

async function writeAccounts(accounts) {
    const data = JSON.stringify(accounts, null, 4)
    await fs.writeFile(accountsFilePath, data)
}


export async function GET(request, { params }) {
    const accounts = await readAccounts()
    return NextResponse.json(accounts)
}
// adding a new data
export async function POST(request, { params }) {
    // get the data the user sent us
    const account = await request.json()

    // read the data we have in our json file
    const accounts = await readAccounts()

    // add this account to the list of accounts
    accounts.push(account)

    // rewrite into our file
    writeAccounts(accounts)

    // respond to the user that you added the account successfully
    return NextResponse.json({ message: "successfully added the account" })
}

// localhost:3000/api/accounts [return all the accounts]

// GET, POST, PUT, and DELETE