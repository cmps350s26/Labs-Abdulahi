import React from 'react'

function BudgetCard({ key, budget }) {
    return (
        <div>
            <h3>{budget.name}</h3>
            <p>Amount: {budget.amount}</p>
            <p>Spent: {budget.spent}</p>
            <p>Remaining: {budget.amount - budget.spent}</p>
        </div>
    )
}

export default BudgetCard