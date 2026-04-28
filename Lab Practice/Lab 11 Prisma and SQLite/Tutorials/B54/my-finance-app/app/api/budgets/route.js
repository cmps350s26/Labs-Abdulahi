import { NextResponse } from "next/server";
import budgetsRepo from "@/repos/BudgetsRepo";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");

    let budgets;
    if (q) {
        budgets = await budgetsRepo.search(q);
    } else {
        budgets = await budgetsRepo.getAll();
    }

    return NextResponse.json(budgets);
}

export async function POST(request) {
    const body = await request.json();

    if (!body.category || body.budgeted === undefined || !body.month || !body.year) {
        return NextResponse.json(
            { error: "category, budgeted, month, and year are required" },
            { status: 400 }
        );
    }

    const newBudget = await budgetsRepo.create(body);
    return NextResponse.json(newBudget, { status: 201 });
}
