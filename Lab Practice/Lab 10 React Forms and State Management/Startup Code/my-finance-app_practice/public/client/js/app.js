// =================================================================
// MyFinance - Vanilla JS Client (Lab 10: Forms & State Management)
//
// This is the fully working vanilla JS version of the app.
// In this lab you will convert this code to Next.js + React,
// adding forms for creating and editing transactions and budgets.
//
// Each function below maps to a React component or page:
//
//   navBarHTML()                           →  <NavBar />
//   summaryCardHTML({ title, ... })        →  <SummaryCard title={...} ... />
//   budgetCardHTML({ budget })             →  <BudgetCard budget={...} onDelete={...} />
//   transactionRowHTML({ transaction })    →  transactionRow in transactions/page.jsx
//   dashboardPage()                        →  app/page.jsx
//   transactionsPage()                     →  app/transactions/page.jsx
//   budgetsPage()                          →  app/budgets/page.jsx
//   transactionFormPage()                  →  app/transactions/form/page.jsx  (NEW in Lab 10)
//   budgetFormPage()                       →  app/budgets/form/page.jsx       (NEW in Lab 10)
// =================================================================

// ------------------------------------------------------------------
// API helpers
// ------------------------------------------------------------------
async function fetchJSON(url) {
    const res = await fetch(url);
    return await res.json();
}

async function postJSON(url, data) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.ok;
}

async function putJSON(url, data) {
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.ok;
}

async function deleteResource(resource, id) {
    const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
    return res.ok;
}

// ------------------------------------------------------------------
// URL query-string helpers (used for edit forms)
// ------------------------------------------------------------------
function getQueryParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
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
               <a class="btn btn--small btn--primary"
                  href="transaction-form.html?id=${t.id}&description=${encodeURIComponent(t.description)}&amount=${t.amount}&type=${t.type}&category=${encodeURIComponent(t.category)}&date=${t.date}">Edit</a>
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
                <a class="btn btn--small btn--primary"
                   href="budget-form.html?id=${b.id}&category=${encodeURIComponent(b.category)}&budgeted=${b.budgeted}&spent=${b.spent}&month=${encodeURIComponent(b.month)}&year=${b.year}">Edit</a>
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

// -- Transactions page (with filter + edit/delete) --
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
            <div class="page-header">
                <h1>Transactions</h1>
                <a href="transaction-form.html" class="btn btn--primary">+ Add Transaction</a>
            </div>

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

// -- Transaction Form page (add / edit) --
function transactionFormPage() {
    const params = getQueryParams();
    const isEdit = !!params.id;
    const today = new Date().toISOString().split("T")[0];

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page">
            <h1>${isEdit ? "Edit" : "Add"} Transaction</h1>
            <div class="form-container">
                <form id="transaction-form" onsubmit="handleTransactionSubmit(event)">
                    ${isEdit ? `<input type="hidden" name="id" value="${params.id}">` : ""}
                    <div class="form-group">
                        <label for="description">Description</label>
                        <input id="description" name="description" type="text" placeholder="e.g. Grocery Shopping"
                            value="${params.description || ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount (QAR)</label>
                        <input id="amount" name="amount" type="number" min="0" step="0.01" placeholder="0.00"
                            value="${params.amount || ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="type">Type</label>
                        <select id="type" name="type">
                            <option value="income"  ${params.type === "income"  ? "selected" : ""}>Income</option>
                            <option value="expense" ${params.type === "expense" || !params.type ? "selected" : ""}>Expense</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category">
                            ${["Salary","Food","Housing","Transport","Utilities","Entertainment","Other"]
                                .map(c => `<option value="${c}" ${params.category === c ? "selected" : ""}>${c}</option>`)
                                .join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input id="date" name="date" type="date"
                            value="${params.date || today}">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn--primary">
                            ${isEdit ? "Save Changes" : "Add Transaction"}
                        </button>
                        <a href="transactions.html" class="btn btn--danger">Cancel</a>
                    </div>
                </form>
            </div>
        </main>
    `;
}

async function handleTransactionSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    data.amount = Number(data.amount);

    const isEdit = !!data.id;
    let success;

    if (isEdit) {
        data.id = Number(data.id);
        success = await putJSON(`/api/transactions/${data.id}`, data);
    } else {
        success = await postJSON("/api/transactions", data);
    }

    if (success) {
        window.location.href = "transactions.html";
    }
}

// -- Budgets page (with search + edit/delete) --
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
            <div class="page-header">
                <h1>Budgets</h1>
                <a href="budget-form.html" class="btn btn--primary">+ Add Budget</a>
            </div>

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

// -- Budget Form page (add / edit) --
function budgetFormPage() {
    const params = getQueryParams();
    const isEdit = !!params.id;
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    document.querySelector("#root").innerHTML = `
        ${navBarHTML()}
        <main class="page">
            <h1>${isEdit ? "Edit" : "Add"} Budget</h1>
            <div class="form-container">
                <form id="budget-form" onsubmit="handleBudgetSubmit(event)">
                    ${isEdit ? `<input type="hidden" name="id" value="${params.id}">` : ""}
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category">
                            ${["Salary","Food","Housing","Transport","Utilities","Entertainment","Other"]
                                .map(c => `<option value="${c}" ${params.category === c ? "selected" : ""}>${c}</option>`)
                                .join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="budgeted">Budget Amount (QAR)</label>
                        <input id="budgeted" name="budgeted" type="number" min="0" step="0.01" placeholder="0.00"
                            value="${params.budgeted || ""}" required>
                    </div>
                    <div class="form-group">
                        <label for="spent">Amount Spent (QAR)</label>
                        <input id="spent" name="spent" type="number" min="0" step="0.01" placeholder="0.00"
                            value="${params.spent ?? 0}" required>
                    </div>
                    <div class="form-group">
                        <label for="month">Month</label>
                        <select id="month" name="month">
                            ${months.map(m => `<option value="${m}" ${params.month === m ? "selected" : ""}>${m}</option>`).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="year">Year</label>
                        <input id="year" name="year" type="number"
                            value="${params.year || 2026}" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn--primary">
                            ${isEdit ? "Save Changes" : "Add Budget"}
                        </button>
                        <a href="budgets.html" class="btn btn--danger">Cancel</a>
                    </div>
                </form>
            </div>
        </main>
    `;
}

async function handleBudgetSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    data.budgeted = Number(data.budgeted);
    data.spent = Number(data.spent);
    data.year = Number(data.year);

    const isEdit = !!data.id;
    let success;

    if (isEdit) {
        data.id = Number(data.id);
        success = await putJSON(`/api/budgets/${data.id}`, data);
    } else {
        success = await postJSON("/api/budgets", data);
    }

    if (success) {
        window.location.href = "budgets.html";
    }
}
