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
    // http://localhost:3001/api/accounts? 
    // type=savings&status=active  [search params]
    // put it into a map
    // it will be like { type: "savings", status: "active" }
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")


    const accounts = await readAccounts()

    if (!type || !status) {
        return NextResponse.json(accounts)
    }

    const filteredAccounts = accounts.filter(a => a.type == type && a.status == status)
    return NextResponse.json(filteredAccounts)
}

// adding a new data
export async function POST(request, { params }) {
    // get the data the user sent us
    const account = await request.json()

    // we did not check if this account isa a valid account


    // read the data we have in our json file
    const accounts = await readAccounts()

    // add this account to the list of accounts
    accounts.push(account)

    // rewrite into our file
    await writeAccounts(accounts)

    // respond to the user that you added the account successfully
    return NextResponse.json({ message: "successfully added the account" })
}

// localhost:3000/api/accounts [return all the accounts]

// GET, POST, PUT, and DELETE