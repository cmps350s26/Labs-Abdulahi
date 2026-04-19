"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BudgetCard from "@/app/components/BudgetCard.jsx";
// TODO 8a: Import deleteBudgetAction from "@/app/actions/budgetActions"

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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
    //   2. Calls await loadBudgets() to refresh the list

    const filtered = budgets.filter(b =>
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                {filtered.map(budget => (
                    // TODO 8c: Pass onDelete={handleDelete} to BudgetCard
                    <BudgetCard key={budget.id} budget={budget} />
                ))}
            </div>
        </main>
    );
}
