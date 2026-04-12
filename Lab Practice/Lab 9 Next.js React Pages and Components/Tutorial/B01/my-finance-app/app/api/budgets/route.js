import { NextResponse } from "next/server";
import budgetsRepo from "@/repos/BudgetsRepo";

export async function GET(request) {
    let budgets = await budgetsRepo.getAll();

    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const category = searchParams.get("category");

    if (month) budgets = budgets.filter(b => b.month === month);
    if (year) budgets = budgets.filter(b => b.year === Number(year));
    if (category) budgets = budgets.filter(b => b.category === category);

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
