import React from 'react'

function signedAmount(transaction) {
    const sign = transaction.type === "income" ? "+" : "-";
    return `${sign}${transaction.amount.toLocaleString()} QAR`;
}

function TransactionRow({ transaction }) {

    const t = transaction;
    const amountClass = t.type === "income" ? "text-success" : "text-danger";

    return (
        <tr>
            <td>{t.description}</td>
            <td>{t.category}</td>
            <td><span className={"badge badge--" + t.type}>{t.type}</span></td>
            <td className={amountClass}>{signedAmount(t)}</td>
            <td>{t.date}</td>
            <td><button className="btn btn--small btn--danger">Delete</button></td>
        </tr >
    )

}

export default TransactionRow