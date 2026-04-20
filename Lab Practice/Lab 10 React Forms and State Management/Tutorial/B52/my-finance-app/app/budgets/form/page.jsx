"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { createBudgetAction, updateBudgetAction } from "@/app/actions/budgetActions";
import Link from "next/link";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function BudgetFormPage() {
    const searchParams = useSearchParams()
    const budget = Object.fromEntries(searchParams);  // TODO 10a: Replace with Object.fromEntries(useSearchParams().entries())
    const isEdit = !!budget.id; // TODO 10b: Replace with !!budget.id
    const action = isEdit ? updateBudgetAction : createBudgetAction;  // TODO 10c: Replace with isEdit ? updateBudgetAction : createBudgetAction
    // TODO 10d: Wire useActionState: const [error, formAction, isPending] = useActionState(action, {})
    const [error, formAction, isPending] = useActionState(action, {})

    return (
        <main className="page">

            {/* TODO 10e: Change to {isEdit ? "Edit" : "Add"} Budget */}
            <h1>{isEdit ? 'Edit' : 'Add'} Budget</h1>
            <div className="form-container">
                {/* TODO 10d: Pass the server action to the form: action={action} */}
                <form action={formAction}>
                    {isEdit && <input name="id" defaultValue={budget.id} readOnly type="hidden" />}
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" defaultValue={budget?.category || "Food"}>
                            <option value="Salary">Salary</option>
                            <option value="Food">Food</option>
                            <option value="Housing">Housing</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="budgeted">Budget Amount (QAR)</label>
                        <input id="budgeted" name="budgeted" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={budget?.budgeted || ""} />

                        {error?.budgeted && <p className="error-message">{error.budgeted}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="spent">Amount Spent (QAR)</label>
                        <input id="spent" name="spent" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={budget?.spent ?? 0} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="month">Month</label>
                        <select id="month" name="month" defaultValue={budget?.month || "March"}>
                            {months.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input id="year" name="year" type="number"
                            defaultValue={budget?.year || 2026} />
                    </div>
                    <div className="form-actions">
                        {/* TODO: Add disabled={isPending} and show "Saving..." when pending */}
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
