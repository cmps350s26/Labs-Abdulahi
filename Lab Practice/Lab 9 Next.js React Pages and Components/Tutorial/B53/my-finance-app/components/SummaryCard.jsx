import React from 'react'

function SummaryCard({ title, amount, variant }) {
    return (
        <div className={`card card--${variant}`}>
            <h3>{title}</h3>
            <p className="amount">{Number(amount).toLocaleString() + " QAR"}</p>
        </div>
    )
}

export default SummaryCard