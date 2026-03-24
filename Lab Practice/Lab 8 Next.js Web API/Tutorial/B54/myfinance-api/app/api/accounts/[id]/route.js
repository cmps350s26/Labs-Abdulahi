import { NextResponse } from "next/server";

import { promises as fs, write } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "accounts.json");

// create the reading and writing functions

async function readAccounts() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
}

async function writeAccounts(data) {
    fs.writeFile(dataPath, JSON.stringify(data, null, 4))
}


export async function GET(request, { params }) {
    const accounts = await readAccounts()
    const { id } = await params

    const account = accounts.find(a => a.id == id)

    if (!account)
        return NextResponse.json("Account not found", { status: 404 })

    return NextResponse.json(account, { status: 200 })
}

export async function DELETE(request, { params }) {
    try {
        const accounts = await readAccounts()
        const { id } = await params

        const index = accounts.findIndex(a => a.id == id)

        if (index < 0)
            return NextResponse.json("Account not found", { status: 404 })

        // let us delete this account
        accounts.splice(index, 1)

        // write 
        await writeAccounts(accounts)

        return NextResponse.json({ message: `Successfully delete account with id ${id}` }, { status: 200 })
    } catch (e) {
        return NextResponse.json("Error happened on the server side, unable to delete", { status: 500 })
    }
}
export async function PUT(request, { params }) {
    try {
        const newUpdatedAccount = await request.json()

        const accounts = await readAccounts()
        const { id } = await params

        const index = accounts.findIndex(a => a.id == id)

        if (index < 0)
            return NextResponse.json("Account not found", { status: 404 })

        accounts[index] = { ...accounts[index], ...newUpdatedAccount }

        // write 
        await writeAccounts(accounts)

        return NextResponse.json({ message: `Successfully updated account with id ${id}` }, { status: 200 })
    } catch (e) {
        return NextResponse.json("Error happened on the server side, unable to update", { status: 500 })
    }
}