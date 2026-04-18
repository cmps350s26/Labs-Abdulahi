'use client'
import React, { useEffect, useState } from 'react'
import TransactionRow from '@/components/TransactionRow'

function Transactions() {

    const [transactions, setTransactions] = useState([])
    const [type, setType] = useState("all")

    async function fetchTransactions(type) {

        const url = type == 'all' ? `/api/transactions` : `/api/transactions?type=${type}`
        console.log(url);

        const response = await fetch(url);
        const data = await response.json();
        setTransactions(data)
    }

    useEffect(() => {
        fetchTransactions(type)
    }, [type])


    return (
        <main className="page">
            <h1>Transactions</h1>

            <div className="filter-bar">
                <label htmlFor="type-filter">Filter by type:</label>
                <select id="type-filter" value={type} onChange={e => setType(e.target.value)}>
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
                        {transactions.map(t => <TransactionRow transaction={t}></TransactionRow>)}
                    </tbody>
                </table>
            </div>
        </main >
    )
}

export default Transactions