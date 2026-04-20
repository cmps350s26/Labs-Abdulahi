import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="navbar">
            <span className="brand">MyFinance</span>
            <ul className="nav-links">
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/transactions">Transactions</Link></li>
                <li><Link href="/budgets">Budgets</Link></li>
            </ul>
        </nav>
    );
}
