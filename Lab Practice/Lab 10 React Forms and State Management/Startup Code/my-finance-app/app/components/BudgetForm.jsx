"use client";

// TODO 11a: Import useActionState from "react"
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
    // TODO 11b: Wire useActionState: const [error, formAction, isPending] = useActionState(action, {});

    return (
        <main className="page">
            <h1>{isEdit ? "Edit" : "Add"} Budget</h1>
            <div className="form-container">
                {/* TODO 11c: Change action={action} to action={formAction} */}
                <form action={action}>
                    {isEdit && <input type="hidden" name="id" value={budget.id} />}
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        {/* TODO 11d: Add className={error?.category ? "input-error" : ""} */}
                        <select id="category" name="category" defaultValue={budget?.category || "Food"}>
                            <option value="Salary">Salary</option>
                            <option value="Food">Food</option>
                            <option value="Housing">Housing</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                        {/* TODO 11e: {error?.category && <p className="error-message">{error.category}</p>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="budgeted">Budget Amount (QAR)</label>
                        {/* TODO 11f: Add className={error?.budgeted ? "input-error" : ""} */}
                        <input id="budgeted" name="budgeted" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={budget?.budgeted || ""} />
                        {/* TODO 11g: {error?.budgeted && <p className="error-message">{error.budgeted}</p>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="spent">Amount Spent (QAR)</label>
                        <input id="spent" name="spent" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={budget?.spent ?? 0} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="month">Month</label>
                        {/* TODO 11h: Add className={error?.month ? "input-error" : ""} */}
                        <select id="month" name="month" defaultValue={budget?.month || "March"}>
                            {months.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                        {/* TODO 11i: {error?.month && <p className="error-message">{error.month}</p>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        {/* TODO 11j: Add className={error?.year ? "input-error" : ""} */}
                        <input id="year" name="year" type="number"
                            defaultValue={budget?.year || 2026} />
                        {/* TODO 11k: {error?.year && <p className="error-message">{error.year}</p>} */}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn--primary">
                            {isEdit ? "Save Changes" : "Add Budget"}
                        </button>
                        {isEdit && <Link href="/budgets" className="btn btn--danger">Cancel</Link>}
                    </div>
                </form>
            </div>
        </main>
    );
}
