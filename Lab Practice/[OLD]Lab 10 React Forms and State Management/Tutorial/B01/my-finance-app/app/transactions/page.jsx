"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// TODO 4a: Import deleteTransactionAction from "@/app/actions/transactionActions"
import { deleteTransactionAction } from "@/app/actions/transactionActions";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");

    async function handleDelete(id) {
        await deleteTransactionAction(id)
        await loadTransactions()
    }

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
    //   2. Calls await loadTransactions() to refresh the list

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
                            <></>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
