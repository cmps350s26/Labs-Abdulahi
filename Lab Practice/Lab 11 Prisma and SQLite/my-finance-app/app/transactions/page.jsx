"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { deleteTransactionAction } from "@/app/actions/transactionActions";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    async function loadTransactions() {
        const params = new URLSearchParams();
        if (filterType !== "all") params.set("type", filterType);
        if (searchTerm) params.set("q", searchTerm);
        const query = params.toString();
        const url = `/api/transactions${query ? `?${query}` : ""}`;
        const res = await fetch(url);
        const data = await res.json();
        setTransactions(data);
    }

    useEffect(() => {
        loadTransactions();
    }, [filterType, searchTerm]);

    async function handleDelete(id) {
        await deleteTransactionAction(id);
        setTransactions(prev => prev.filter(t => t.id !== id));
    }

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
                <label htmlFor="search">Search:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="e.g. Salary, Food..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                                    <button className="btn btn--small btn--danger" onClick={() => handleDelete(t.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
