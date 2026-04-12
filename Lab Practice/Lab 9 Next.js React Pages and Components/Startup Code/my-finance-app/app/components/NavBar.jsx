import React from 'react'
import Link from 'next/link'

function NavBar() {
    return (
        <nav className={"navbar"}>
            <span className="brand">MyFinance</span>
            <ul className="nav-links">
                <li><Link href={"/"}>Dashboard</Link></li>
                <li><Link href={"/transactions"}>Transactions</Link></li>
                <li><Link href={"/budgets"}>Budgets</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar

