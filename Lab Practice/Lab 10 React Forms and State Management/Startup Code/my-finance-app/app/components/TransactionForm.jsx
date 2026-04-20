"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { createTransactionAction, updateTransactionAction } from "@/app/actions/transactionActions";
import Link from "next/link";

export default function TransactionForm() {
    const transaction = null;  // TODO: Replace with Object.fromEntries(useSearchParams().entries()) + coerce id/amount
    const isEdit = false;      // TODO: Replace with !!transaction
    const action = null;       // TODO: Replace with isEdit ? updateTransactionAction : createTransactionAction
    // TODO: Wire useActionState: const [error, formAction, isPending] = useActionState(action, {});

    return (
        <main className="page">
            {/* TODO: Change to {isEdit ? "Edit" : "Add"} Transaction */}
            <h1>Add Transaction</h1>
            <div className="form-container">
                {/* TODO: Pass the server action to the form: action={formAction} */}
                <form>
                    {isEdit && <input type="hidden" name="id" value={transaction.id} />}
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        {/* TODO: Add className={error?.description ? "input-error" : ""} to this input */}
                        <input id="description" name="description" type="text" placeholder="e.g. Grocery Shopping"
                            defaultValue={transaction?.description || ""} />
                        {/* TODO: Add error display: {error?.description && <p className="error-message">{error.description}</p>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount (QAR)</label>
                        {/* TODO: Add className={error?.amount ? "input-error" : ""} to this input */}
                        <input id="amount" name="amount" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={transaction?.amount || ""} />
                        {/* TODO: Add error display: {error?.amount && <p className="error-message">{error.amount}</p>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select id="type" name="type" defaultValue={transaction?.type || "expense"}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select id="category" name="category" defaultValue={transaction?.category || "Food"}>
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
                        <label htmlFor="date">Date</label>
                        <input id="date" name="date" type="date"
                            defaultValue={transaction?.date || new Date().toISOString().split("T")[0]}
                            className={error?.date ? "input-error" : ""} />
                        {error?.date && <p className="error-message">{error.date}</p>}
                    </div>
                    <div className="form-actions">
                        {/* TODO: Add disabled={isPending} and show "Saving..." when pending */}
                        <button type="submit" className="btn btn--primary">
                            {isEdit ? "Save Changes" : "Add Transaction"}
                        </button>
                        {isEdit && <Link href="/transactions" className="btn btn--danger">Cancel</Link>}
                    </div>
                </form>
            </div>
        </main>
    );
}
