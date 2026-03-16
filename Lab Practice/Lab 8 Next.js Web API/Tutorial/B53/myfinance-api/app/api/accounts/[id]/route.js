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


// http://localhost/api/accounts/1 <- the account with id 1

export async function GET(request, { params }) {
    try {
        const { id } = await params

        // we will try to find the matching account
        const accounts = await readAccounts()
        const account = accounts.find(a => a.id == id)

        if (!account) {
            return NextResponse.json({ message: `Unable to find account with id ${id}` })
        }

        return NextResponse.json(account)

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
// http://localhost/api/accounts/33
// delete account
export async function DELETE(request, { params }) {
    try {
        const { id } = await params
        const accounts = await readAccounts()

        const index = accounts.findIndex(a => a.id == id)

        if (index < 0) {
            return NextResponse.json({ message: `Unable to find account with id ${id}` })
        }

        // we can use the splice
        accounts.splice(index, 1)

        // write back to the file the accounts without the deleted account
        await writeAccounts(accounts)

        return NextResponse.json({ message: `Successfully delete the account with id ${id}` })


    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

//update account
