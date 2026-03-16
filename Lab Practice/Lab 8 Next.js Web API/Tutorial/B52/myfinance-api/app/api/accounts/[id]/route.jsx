import { NextResponse } from "next/server";
import { promises as fs, write } from "fs";
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
    try {
        // localhost/api/accounts/3
        const { id } = await params;

        // get all the accounts and search for the account with this id
        // we use the find array method

        const accounts = await readAccounts()
        const account = accounts.find(a => a.id == id)

        // either we have an account found or not

        if (!account) {
            return NextResponse.json({ error: `Unable to find the account ${id}` })
        }

        return NextResponse.json(account)
    } catch (error) {
        return NextResponse.json({ error: "Unable to read the accounts" })
    }

}

// http://localhost:3001/api/accounts/11

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        // get all the accounts and search for the account with this id
        // we use the find array method

        const accounts = await readAccounts()
        const index = accounts.findIndex(a => a.id == id)

        // either we have an account found or not

        if (index == -1) {
            return NextResponse.json({ error: `Unable to find the account ${id}` })
        }

        // delete the account
        accounts.splice(index, 1)

        await writeAccounts(accounts)

        return NextResponse.json({ message: `Delete the account with ID=  ${id}` })

    } catch (error) {
        return NextResponse.json({ error: "Unable to delete the account" })
    }
}

// given id update the account

export async function PUT(request, { params }) {
    //the updates
    const account = await request.json()

    const { id } = await params;

    const accounts = await readAccounts()
    const index = accounts.findIndex(a => a.id == id)

    if (index == -1) {
        return NextResponse.json({ error: `Unable to find the account ${id} for update` })
    }

    accounts[index] = { ...accounts[index], ...account }

    await writeAccounts(accounts)

    return NextResponse.json({ error: `Updated the account with id ${id}` })

}
