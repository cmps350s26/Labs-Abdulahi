// =================================================================
// MyFinance - Vanilla JS Client
//
// Notice how every block of HTML is wrapped in a function that
// takes "props" (just like a React component will). When you port
// this to Next.js, each *HTML function below becomes a React
// component with almost no code changes:
//
//   navBarHTML()                        →  <NavBar />
//   summaryCardHTML({ title, ... })     →  <SummaryCard title={...} ... />
//   budgetCardHTML({ budget, onDelete}) →  <BudgetCard budget={...} onDelete={...} />
//   transactionRowHTML({ transaction }) →  <TransactionRow transaction={...} />
//   dashboardPage()                     →  app/page.jsx
//   transactionsPage()                  →  app/transactions/page.jsx
//   budgetsPage()                       →  app/budgets/page.jsx
// =================================================================

// ------------------------------------------------------------------
// API helpers
// ------------------------------------------------------------------
async function fetchJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

async function deleteResource(resource, id) {
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    return res.ok;
}

// ------------------------------------------------------------------
// Formatting helpers
// ------------------------------------------------------------------
function formatAmount(n) {
    return Number(n).toLocaleString() + " QAR";
}

function signedAmount(transaction) {
    const sign = transaction.type === "income" ? "+" : "-";
    return `${sign}${transaction.amount.toLocaleString()} QAR`;
}

// ==================================================================
// COMPONENTS (each returns an HTML string)
// ==================================================================

// NavBar - shown on every page
function navBarHTML() {
    return `
        <nav class="navbar">
            <span class="brand">MyFinance</span>
            <ul class="nav-links">
                <li><a href="/client/index.html">Dashboard</a></li>
                <li><a href="/client/pages/transactions.html">Transactions</a></li>
                <li><a href="/client/pages/budgets.html">Budgets</a></li>
            </ul>
        </nav>
    `;
}

// SummaryCard - used on the dashboard
function summaryCardHTML({ title, amount, variant }) {
    return `
        <div class="card card--${variant}">
            <h3>${title}</h3>
            <p class="amount">${formatAmount(amount)}</p>
        </div>
    `;
}

// TransactionRow - used in transaction tables
function transactionRowHTML({ transaction, withActions }) {
    const t = transaction;
    const amountClass = t.type === "income" ? "text-success" : "text-danger";
    const actionsCell = withActions
        ? `<td>
               <button class="btn btn--small btn--danger"
                       onclick="handleDeleteTransaction(${t.id})">Delete</button>
           </td>`
        : "";
    return `
        <tr>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td><span class="badge badge--${t.type}">${t.type}</span></td>
            <td class="${amountClass}">${signedAmount(t)}</td>
            <td>${t.date}</td>
            ${actionsCell}
        </tr>
    `;
}

// BudgetCard - used on the budgets page
function budgetCardHTML({ budget }) {
    const b = budget;
    const percentage = Math.round((b.spent / b.budgeted) * 100);
    const color = percentage > 90 ? "danger" : percentage > 70 ? "warning" : "success";
    const width = Math.min(percentage, 100);

    return `
        <div class="budget-card">
            <h3>${b.category}</h3>
            <div class="amounts">
                <span>Spent: ${formatAmount(b.spent)}</span>
                <span>Budget: ${formatAmount(b.budgeted)}</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar progress-bar--${color}"
                     style="width: ${width}%"></div>
            </div>
            <p class="text-muted">${percentage}% used</p>
            <div class="card-actions">
                <button class="btn btn--small btn--danger"
                        onclick="handleDeleteBudget(${b.id})">Delete</button>
            </div>
        </div>
    `;
}

// ==================================================================
// PAGES (each renders the full page into #root)
// ==================================================================

// -- Dashboard page --
async function dashboardPage() {
    const transactions = await fetchJSON("/api/transactions");
    const budgets = await fetchJSON("/api/budgets");

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const totalBudgeted = budgets.reduce((sum, b) => sum + b.budgeted, 0);

    const recentTransactions = transactions.slice(-5).reverse();

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page">
            <h1>Dashboard</h1>

            <div class="dashboard-grid">
                ${summaryCardHTML({ title: "Total Income",    amount: totalIncome,    variant: "success" })}
                ${summaryCardHTML({ title: "Total Expenses",  amount: totalExpenses,  variant: "danger"  })}
                ${summaryCardHTML({ title: "Balance",         amount: balance,        variant: "warning" })}
                ${summaryCardHTML({ title: "Monthly Budget",  amount: totalBudgeted,  variant: "primary" })}
            </div>

            <h2 class="section-title">Recent Transactions</h2>
            <div class="table-container">
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
                        ${recentTransactions.map(t => transactionRowHTML({ transaction: t, withActions: false })).join("")}
                    </tbody>
                </table>
            </div>
        </main>
    `;
}

// -- Transactions page (with filter + delete) --
let transactions = [];
let filterType = "all";

async function transactionsPage() {
    transactions = await fetchJSON("/api/transactions");
    renderTransactionsPage();
}

function renderTransactionsPage() {
    const filtered = filterType === "all"
        ? transactions
        : transactions.filter(t => t.type === filterType);

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page">
            <h1>Transactions</h1>

            <div class="filter-bar">
                <label for="type-filter">Filter by type:</label>
                <select id="type-filter" onchange="handleFilterChange(event)">
                    <option value="all"     ${filterType === "all"     ? "selected" : ""}>All</option>
                    <option value="income"  ${filterType === "income"  ? "selected" : ""}>Income</option>
                    <option value="expense" ${filterType === "expense" ? "selected" : ""}>Expense</option>
                </select>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtered.map(t => transactionRowHTML({ transaction: t, withActions: true })).join("")}
                    </tbody>
                </table>
            </div>
        </main>
    `;
}

function handleFilterChange(event) {
    filterType = event.target.value;
    renderTransactionsPage();
}

async function handleDeleteTransaction(id) {
    if (!confirm("Delete this transaction?")) return;
    if (await deleteResource("transactions", id)) {
        transactions = transactions.filter(t => t.id !== id);
        renderTransactionsPage();
    }
}

// -- Budgets page (with search + delete) --
let budgets = [];
let searchTerm = "";

async function budgetsPage() {
    budgets = await fetchJSON("/api/budgets");
    renderBudgetsPage();
}

function renderBudgetsPage() {
    const filtered = budgets.filter(b =>
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page">
            <h1>Budgets</h1>

            <div class="filter-bar">
                <label for="search">Search by category:</label>
                <input id="search" type="text" placeholder="e.g. Food, Housing..."
                       value="${searchTerm}" oninput="handleSearchChange(event)">
            </div>

            <div class="dashboard-grid">
                ${filtered.map(b => budgetCardHTML({ budget: b })).join("")}
            </div>
        </main>
    `;

    // After innerHTML wipes the input, restore focus + caret
    const input = document.querySelector("#search");
    if (input && document.activeElement !== input && searchTerm !== "") {
        input.focus();
        input.setSelectionRange(searchTerm.length, searchTerm.length);
    }
}

function handleSearchChange(event) {
    searchTerm = event.target.value;
    renderBudgetsPage();
}

async function handleDeleteBudget(id) {
    if (!confirm("Delete this budget?")) return;
    if (await deleteResource("budgets", id)) {
        budgets = budgets.filter(b => b.id !== id);
        renderBudgetsPage();
    }
}
