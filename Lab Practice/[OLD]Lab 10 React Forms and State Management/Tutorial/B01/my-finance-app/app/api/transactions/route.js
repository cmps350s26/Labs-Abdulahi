import { NextResponse } from "next/server";
import transactionsRepo from "@/repos/TransactionsRepo";

export async function GET(request) {
    let transactions = await transactionsRepo.getAll();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    if (type) transactions = transactions.filter(t => t.type === type);
    if (category) transactions = transactions.filter(t => t.category === category);

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
