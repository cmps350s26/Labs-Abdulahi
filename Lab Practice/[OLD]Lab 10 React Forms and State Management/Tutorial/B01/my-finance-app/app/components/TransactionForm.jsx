"use client";

import { useSearchParams } from "next/navigation";
import { createTransactionAction, updateTransactionAction } from "@/app/actions/transactionActions";
import Link from "next/link";

export default function TransactionForm() {
    const searchParams = useSearchParams();
    const params = Object.fromEntries(searchParams.entries());
    const transaction = params.id
        ? { ...params, id: Number(params.id), amount: Number(params.amount) }
        : null;

    const isEdit = !!transaction;
    const action = isEdit ? updateTransactionAction : createTransactionAction;

    return (
        <main className="page">
            <h1>{isEdit ? "Edit" : "Add"} Transaction</h1>
            <div className="form-container">
                <form action={action}>
                    {isEdit && <input type="hidden" name="id" value={transaction.id} />}
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input id="description" name="description" type="text" placeholder="e.g. Grocery Shopping"
                            defaultValue={transaction?.description || ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount (QAR)</label>
                        <input id="amount" name="amount" type="number" min="0" step="0.01" placeholder="0.00"
                            defaultValue={transaction?.amount || ""} />
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
                            defaultValue={transaction?.date || new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="form-actions">
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
