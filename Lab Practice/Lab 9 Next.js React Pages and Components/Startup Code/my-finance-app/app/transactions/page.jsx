"use client";

import { useState, useEffect } from "react";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");

    async function loadTransactions(type = "all") {
        const url = type === "all" ? "/api/transactions" : `/api/transactions?type=${type}`;
        const res = await fetch(url);
        const data = await res.json();
        setTransactions(data);
    }
    useEffect(() => {
        loadTransactions();
    }, []);

    function handleTypeChange(type) {
        setFilterType(type);
        loadTransactions(type);
    }

    return (
        <main className="page">
            <h1>Transactions</h1>

            <div className="filter-bar">
                <label htmlFor="type-filter">Filter by type:</label>
                <select
                    id="type-filter"
                    value={filterType}
                    onChange={e => handleTypeChange(e.target.value)}
                >
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
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t) => (
                            <tr key={t.id}>
                                <td>{t.description}</td>
                                <td>{t.category}</td>
                                <td><span className={`badge badge--${t.type}`}>{t.type}</span></td>
                                <td className={t.type === "income" ? "text-success" : "text-danger"}>
                                    {t.type === "income" ? "+" : "-"}{t.amount.toLocaleString()} QAR
                                </td>
                                <td>{t.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}