// rfce
'use client'
import TransactionRow from '@/components/TransactionRow';
import React, { useEffect, useState } from 'react'

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('all')

    async function fetchTransactions(type) {
        const url = type == "all" ? "/api/transactions" : `/api/transactions?type=${type}`
        const data = await fetch(url)
        const newTransactions = await data.json()
        setTransactions(newTransactions)
    }

    useEffect(() => {
        fetchTransactions(type)
    }, [type])

    return (
        <>
            <main class="page">
                <h1>Transactions</h1>
                <div class="filter-bar">
                    <label for="type-filter">Filter by type:</label>
                    <select id="type-filter" onChange={e => setType(e.target.value)}>
                        <option value="all" >All</option>
                        <option value="income" >Income</option>
                        <option value="expense" >Expense</option>
                    </select>
                </div>

                <div class="table-container">
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
                            {transactions.map(t => <TransactionRow transaction={t}></TransactionRow>)}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Transactions