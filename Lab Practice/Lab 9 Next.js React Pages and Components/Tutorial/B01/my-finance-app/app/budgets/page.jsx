import React from 'react'

function Budgets() {

    const budgets = [
        {
            id: 1,
            name: "Food",
            amount: 2000,
            spent: 1500
        },
        {
            id: 2,
            name: "Entertainment",
            amount: 1000,
            spent: 500
        },
        {
            id: 3,
            name: "Utilities",
            amount: 500,
            spent: 300
        }
    ]
    return (
        <>
            {budgets.map(b => <BudgetCard key={b.id} budget={b} />)}
        </>
    )
}

export default Budgets