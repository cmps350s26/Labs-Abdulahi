"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { createBudgetAction, updateBudgetAction } from "@/app/actions/budgetActions";
import Link from "next/link";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function BudgetForm() {
    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const budget = params.id
        ? { ...params, id: Number(params.id), budgeted: Number(params.budgeted), spent: Number(params.spent), year: Number(params.year) }
        : null;

    const isEdit = !!budget;
    const action = isEdit ? updateBudgetAction : createBudgetAction;
    const [error, formAction, isPending] = useActionState(action, {});

    return (
        <main className="page">
            <h1>{isEdit ? "Edit" : "Add"} Budget</h1>
            <div className="form-container">
                <form action={formAction}>
                    {isEdit && <input type="hidden" name="id" value={budget.id} />}
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" defaultValue={budget?.category || "Food"}
                            className={error?.category ? "input-error" : ""}>
                            <option value="Salary">Salary</option>
                            <option value="Food">Food</option>
                            <option value="Housing">Housing</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                        {error?.category && <p className="error-message">{error.category}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="budgeted">Budget Amount (QAR)</label>
                        <input id="budgeted" name="budgeted" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={budget?.budgeted || ""}
                            className={error?.budgeted ? "input-error" : ""} />
                        {error?.budgeted && <p className="error-message">{error.budgeted}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="spent">Amount Spent (QAR)</label>
                        <input id="spent" name="spent" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={budget?.spent ?? 0} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="month">Month</label>
                        <select id="month" name="month" defaultValue={budget?.month || "March"}
                            className={error?.month ? "input-error" : ""}>
                            {months.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        {error?.month && <p className="error-message">{error.month}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input id="year" name="year" type="number"
                            defaultValue={budget?.year || 2026}
                            className={error?.year ? "input-error" : ""} />
                        {error?.year && <p className="error-message">{error.year}</p>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn--primary" disabled={isPending}>
                            {isPending ? "Saving..." : isEdit ? "Save Changes" : "Add Budget"}
                        </button>
                        {isEdit && <Link href="/budgets" className="btn btn--danger">Cancel</Link>}
                    </div>
                </form>
            </div>
        </main>
    );
}
