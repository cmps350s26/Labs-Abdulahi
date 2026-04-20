"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BudgetCard from "@/app/components/BudgetCard.jsx";
// TODO 8a: Import deleteBudgetAction from "@/app/actions/budgetActions"
import { deleteBudgetAction } from "@/app/actions/budgetActions";

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // TODO 8d: Add state for deleteId: const [deleteId, setDeleteId] = useState(null);

    const [deleteId, setDeleteId] = useState(null)

    async function loadBudgets() {
        const res = await fetch("/api/budgets");
        const data = await res.json();
        setBudgets(data);
    }

    useEffect(() => {
        loadBudgets();
    }, []);

    // TODO 8b: Create handleDelete(id) that:
    //   1. Calls await deleteBudgetAction(id)
    //   2. Sets deleteId back to null
    //   3. Calls await loadBudgets() to refresh the list

    async function handleDelete(id) {
        await deleteBudgetAction(id);
        setDeleteId(null)
        await loadBudgets();
    }

    const filtered = budgets.filter(b =>
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="page">
            {/* {null && <h1>Hide and Show</h1>} */}

            <div className="page-header">
                <h1>Budgets</h1>
                <Link href="/budgets/form" className="btn btn--primary">+ Add Budget</Link>
            </div>

            <div className="filter-bar">
                <label htmlFor="search">Search by category:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="e.g. Food, Housing..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="dashboard-grid">
                {filtered.map(budget => (
                    // TODO 8c: Pass onDelete={setDeleteId} to BudgetCard
                    <BudgetCard key={budget.id} budget={budget} onDelete={(setDeleteId)} />
                ))}
            </div>

            {/* { TODO 8e: Add confirmation dialog (same pattern as transactions page):} */}
            {deleteId && (
                <div className="confirm-overlay">
                    <div className="confirm-dialog">
                        <h3>Delete Budget</h3>
                        <p>Are you sure? This action cannot be undone.</p>
                        <div className="form-actions">
                            <button className="btn btn--danger" onClick={() => handleDelete(deleteId)}>Delete</button>
                            <button className="btn btn--primary" onClick={() => setDeleteId(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}
