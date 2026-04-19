import transactionsRepo from "@/repos/TransactionsRepo";
import budgetsRepo from "@/repos/BudgetsRepo";
import SummaryCard from "@/app/components/SummaryCard.jsx";

export default async function Dashboard() {
    const transactions = await transactionsRepo.getAll();
    const budgets = await budgetsRepo.getAll();

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);

    const recentTransactions = transactions.slice(-5).reverse();

    return (
        <main className="page">
            <h1>Dashboard</h1>

            <div className="dashboard-grid">
                <SummaryCard title="Total Income" amount={totalIncome} variant="success" />
                <SummaryCard title="Total Expenses" amount={totalExpenses} variant="danger" />
                <SummaryCard title="Balance" amount={balance} variant="warning" />
                <SummaryCard title="Monthly Budget" amount={totalBudgeted} variant="primary" />
            </div>

            <h2 className="section-title">Recent Transactions</h2>
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
                        {recentTransactions.map(t => (
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
