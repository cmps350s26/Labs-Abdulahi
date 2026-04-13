import Link from 'next/link'
import React from 'react'

function NavBar({ title, extra }) {
    return (
        <nav className="navbar">

            <span class="brand">{title}</span>
            <ul class="nav-links">
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/transactions">Transactions</Link></li>
                <li><Link href="/budgets">Budgets</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar