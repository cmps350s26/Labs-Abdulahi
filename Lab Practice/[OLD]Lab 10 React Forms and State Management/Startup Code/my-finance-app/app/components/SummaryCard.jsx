export default function SummaryCard({ title, amount, variant }) {
    return (
        <div className={`card card--${variant}`}>
            <h3>{title}</h3>
            <p className="amount">{amount.toLocaleString()} QAR</p>
        </div>
    );
}
