import { NextResponse } from "next/server";
import budgetsRepo from "@/repos/BudgetsRepo";

export async function GET(request, { params }) {
    const { id } = await params;
    const budget = await budgetsRepo.getById(id);

    if (!budget) {
        return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    return NextResponse.json(budget);
}

export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const updated = await budgetsRepo.update(id, body);

    if (!updated) {
        return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const success = await budgetsRepo.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Budget deleted" });
}
