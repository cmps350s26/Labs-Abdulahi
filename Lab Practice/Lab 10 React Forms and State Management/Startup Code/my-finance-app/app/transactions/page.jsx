"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// TODO 4a: Import deleteTransactionAction from "@/app/actions/transactionActions"

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");
    // TODO 4c: Add state for deleteId (controls the confirmation dialog)
    //   const [deleteId, setDeleteId] = useState(null);

    async function loadTransactions() {
        const url = filterType === "all"
            ? "/api/transactions"
            : `/api/transactions?type=${filterType}`;
        const res = await fetch(url);
        const data = await res.json();
        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, [filterType]);

    // TODO 4b: Create handleDelete(id) that:
    //   1. Calls await deleteTransactionAction(id)
    //   2. Sets deleteId back to null
    //   3. Removes the item from local state: setTransactions(prev => prev.filter(t => t.id !== id))

    return (
        <main className="page">
            <div className="page-header">
                <h1>Transactions</h1>
                <Link href="/transactions/form" className="btn btn--primary">+ Add Transaction</Link>
            </div>

            <div className="filter-bar">
                <label htmlFor="type-filter">Filter by type:</label>
                <select id="type-filter" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(t => (
                            <tr key={t.id}>
                                <td>{t.description}</td>
                                <td>{t.category}</td>
                                <td><span className={`badge badge--${t.type}`}>{t.type}</span></td>
                                <td className={t.type === "income" ? "text-success" : "text-danger"}>
                                    {t.type === "income" ? "+" : "-"}{t.amount.toLocaleString()} QAR
                                </td>
                                <td>{t.date}</td>
                                <td>
                                    <Link href={{ pathname: "/transactions/form", query: t }} className="btn btn--small btn--primary">Edit</Link>
                                    {/* TODO 4d: Change onClick to () => setDeleteId(t.id) instead of calling handleDelete directly */}
                                    <button className="btn btn--small btn--danger" onClick={() => handleDelete(t.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TODO 4e: Add confirmation dialog:
                {deleteId && (
                    <div className="confirm-overlay">
                        <div className="confirm-dialog">
                            <h3>Delete Transaction</h3>
                            <p>Are you sure? This action cannot be undone.</p>
                            <div className="form-actions">
                                <button className="btn btn--danger" onClick={() => handleDelete(deleteId)}>Delete</button>
                                <button className="btn btn--primary" onClick={() => setDeleteId(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            */}
        </main>
    );
}
