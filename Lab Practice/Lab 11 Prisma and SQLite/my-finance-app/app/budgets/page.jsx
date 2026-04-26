"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BudgetCard from "@/app/components/BudgetCard.jsx";
import { deleteBudgetAction } from "@/app/actions/budgetActions";

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    async function loadBudgets() {
        const url = searchTerm
            ? `/api/budgets?q=${searchTerm}`
            : "/api/budgets";
        const res = await fetch(url);
        const data = await res.json();
        setBudgets(data);
    }

    useEffect(() => {
        loadBudgets();
    }, [searchTerm]);

    async function handleDelete(id) {
        await deleteBudgetAction(id);
        setDeleteId(null);
        setBudgets(prev => prev.filter(b => b.id !== id));
    }

    return (
        <main className="page">
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
                {budgets.map(budget => (
                    <BudgetCard key={budget.id} budget={budget} onDelete={setDeleteId} />
                ))}
            </div>

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
