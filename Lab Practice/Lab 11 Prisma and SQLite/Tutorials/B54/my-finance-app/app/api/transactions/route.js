import { NextResponse } from "next/server";
import transactionsRepo from "@/repos/TransactionsRepo";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const q = searchParams.get("q");

    let transactions;
    if (q) {
        transactions = await transactionsRepo.search(q);
    } else {
        transactions = await transactionsRepo.getAll();
    }

    if (type) transactions = transactions.filter(t => t.type === type);

    return NextResponse.json(transactions);
}

export async function POST(request) {
    const body = await request.json();

    if (!body.description || !body.amount || !body.type || !body.category) {
        return NextResponse.json(
            { error: "description, amount, type, and category are required" },
            { status: 400 }
        );
    }

    const newTransaction = await transactionsRepo.create(body);
    return NextResponse.json(newTransaction, { status: 201 });
}
