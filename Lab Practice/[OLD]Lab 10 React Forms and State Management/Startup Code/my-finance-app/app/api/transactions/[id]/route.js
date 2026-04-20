import { NextResponse } from "next/server";
import transactionsRepo from "@/repos/TransactionsRepo";

export async function GET(request, { params }) {
    const { id } = await params;
    const transaction = await transactionsRepo.getById(id);

    if (!transaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(transaction);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const updated = await transactionsRepo.update(id, body);

    if (!updated) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const success = await transactionsRepo.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transaction deleted" });
}
