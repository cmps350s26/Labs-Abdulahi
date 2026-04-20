import Link from "next/link";

export default function BudgetCard({ budget, onDelete }) {
    const percentage = Math.round((budget.spent / budget.budgeted) * 100);
    const color = percentage > 90 ? "danger" : percentage > 70 ? "warning" : "success";

    return (
        <div className="budget-card">
            <h3>{budget.category}</h3>
            <div className="amounts">
                <span>Spent: {budget.spent.toLocaleString()} QAR</span>
                <span>Budget: {budget.budgeted.toLocaleString()} QAR</span>
            </div>
            <div className="progress-container">
                <div
                    className={`progress-bar progress-bar--${color}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>
            <p className="text-muted">{percentage}% used</p>
            <div className="card-actions">
                {/* TODO 9a: Add href={{ pathname: "/budgets/form", query: budget }} to this Link */}
                <Link href="" className="btn btn--small btn--primary">Edit</Link>
                {onDelete && (
                    // TODO 9b: Add onClick={() => onDelete(budget.id)} to this button
                    <button className="btn btn--small btn--danger">
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}
