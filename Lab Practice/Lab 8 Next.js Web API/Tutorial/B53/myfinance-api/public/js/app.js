// =================================
// MyFinance Client - App Logic
// =================================

// ============================================
// Section 1: API Helpers - Generic HTTP calls
// ============================================

async function fetchAll(resource) {
    const response = await fetch(`/api/${resource}`);
    return await response.json();
}

async function create(resource, data) {
    const response = await fetch(`/api/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function update(resource, id, data) {
    const response = await fetch(`/api/${resource}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function remove(resource, id) {
    const response = await fetch(`/api/${resource}/${id}`, {
        method: "DELETE"
    });
    return await response.json();
}

// ============================================
// Section 2: State - Global data for each resource
// ============================================

let accounts = [];
let accountEditingId = null;

let transactions = [];
let transactionEditingId = null;

let budgets = [];
let budgetEditingId = null;

let goals = [];
let goalEditingId = null;

// ============================================
// Section 3: Helpers - Formatting, navigation
// ============================================

function formatAmount(amount) {
    return Number(amount).toLocaleString() + " QAR";
}

async function loadPage(page) {
    // Fetch the page HTML and inject it
    const response = await fetch(`pages/${page}.html`);
    document.querySelector("#main").innerHTML = await response.text();

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.textContent.toLowerCase() === page);
    });

    // Wire up the form and load data for the page
    if (page === "accounts") {
        document.querySelector("#account-form")
            .addEventListener("submit", handleAccountSubmit);
        await loadAccounts();
    } else if (page === "transactions") {
        document.querySelector("#transaction-form")
            .addEventListener("submit", handleTransactionSubmit);
        await populateAccountsDropdown();
        await loadTransactions();
    } else if (page === "budgets") {
        document.querySelector("#budget-form")
            .addEventListener("submit", handleBudgetSubmit);
        await loadBudgets();
    } else if (page === "goals") {
        document.querySelector("#goal-form")
            .addEventListener("submit", handleGoalSubmit);
        await loadGoals();
    }
}

// ============================================
// Section 4: Accounts Resource
// ============================================

function accountToHTMLRow(a) {
    return `
        <tr>
            <td>${a.name}</td>
            <td>${a.type}</td>
            <td>${formatAmount(a.balance)}</td>
            <td><span class="badge badge-${a.status}">${a.status}</span></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="startEditAccount(${a.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteAccount(${a.id})">Delete</button>
            </td>
        </tr>`;
}

function renderAccounts() {
    const tbody = document.querySelector("#accounts-table-body");
    if (accounts.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-message">No accounts found</td></tr>`;
        return;
    }
    tbody.innerHTML = accounts.map(a => accountToHTMLRow(a)).join("");
}

// most redundant code [framework -> react] react is a framework 
// on top of this react [Next JS] -> server side rendering, static site generation, API routes, etc
async function loadAccounts() {
    try {
        accounts = await fetchAll("accounts");
        renderAccounts();
    } catch (error) {
        console.error("Failed to load accounts:", error);
    }
}

async function handleAccountSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.balance = Number(data.balance);

    try {
        if (accountEditingId) {
            await update("accounts", accountEditingId, data);
            cancelEditAccount();
        } else {
            await create("accounts", data);
        }
        e.target.reset();
        await loadAccounts();
    } catch (error) {
        console.error("Failed to save account:", error);
    }
}

function startEditAccount(id) {
    const account = accounts.find(a => a.id === id);
    if (!account) return;

    accountEditingId = id;
    document.querySelector("#account-name").value = account.name;
    document.querySelector("#account-type").value = account.type;
    document.querySelector("#account-balance").value = account.balance;
    document.querySelector("#accounts-form-title").textContent = "Edit Account";
    document.querySelector("#accounts-submit-btn").textContent = "Update Account";
    document.querySelector("#accounts-cancel-btn").classList.remove("hidden");
};

function cancelEditAccount() {
    accountEditingId = null;
    document.querySelector("#account-form").reset();
    document.querySelector("#accounts-form-title").textContent = "Add Account";
    document.querySelector("#accounts-submit-btn").textContent = "Add Account";
    document.querySelector("#accounts-cancel-btn").classList.add("hidden");
};

async function deleteAccount(id) {
    if (!confirm("Are you sure you want to delete this account?")) return;
    try {
        await remove("accounts", id);
        await loadAccounts();
    } catch (error) {
        console.error("Failed to delete account:", error);
    }
};

// ============================================
// Section 5: Transactions Resource
// ============================================

function transactionToHTMLRow(t) {
    return `
        <tr>
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.category}</td>
            <td><span class="badge badge-${t.type}">${t.type}</span></td>
            <td>${formatAmount(t.amount)}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="startEditTransaction(${t.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${t.id})">Delete</button>
            </td>
        </tr>`;
}

function renderTransactions() {
    const tbody = document.querySelector("#transactions-table-body");
    if (transactions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-message">No transactions found</td></tr>`;
        return;
    }
    tbody.innerHTML = transactions.map(t => transactionToHTMLRow(t)).join("");
}

async function loadTransactions() {
    try {
        transactions = await fetchAll("transactions");
        renderTransactions();
    } catch (error) {
        console.error("Failed to load transactions:", error);
    }
}

async function handleTransactionSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.accountId = Number(data.accountId);
    data.amount = Number(data.amount);

    try {
        if (transactionEditingId) {
            await update("transactions", transactionEditingId, data);
            cancelEditTransaction();
        } else {
            await create("transactions", data);
        }
        e.target.reset();
        await loadTransactions();
    } catch (error) {
        console.error("Failed to save transaction:", error);
    }
}

function startEditTransaction(id) {
    const t = transactions.find(t => t.id === id);
    if (!t) return;

    transactionEditingId = id;
    document.querySelector("#txn-accountId").value = t.accountId;
    document.querySelector("#txn-description").value = t.description;
    document.querySelector("#txn-amount").value = t.amount;
    document.querySelector("#txn-type").value = t.type;
    document.querySelector("#txn-category").value = t.category;
    document.querySelector("#txn-date").value = t.date;
    document.querySelector("#transactions-form-title").textContent = "Edit Transaction";
    document.querySelector("#transactions-submit-btn").textContent = "Update Transaction";
    document.querySelector("#transactions-cancel-btn").classList.remove("hidden");
};

function cancelEditTransaction() {
    transactionEditingId = null;
    document.querySelector("#transaction-form").reset();
    document.querySelector("#transactions-form-title").textContent = "Add Transaction";
    document.querySelector("#transactions-submit-btn").textContent = "Add Transaction";
    document.querySelector("#transactions-cancel-btn").classList.add("hidden");
};

async function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
        await remove("transactions", id);
        await loadTransactions();
    } catch (error) {
        console.error("Failed to delete transaction:", error);
    }
};

async function populateAccountsDropdown() {
    try {
        const allAccounts = await fetchAll("accounts");
        const select = document.querySelector("#txn-accountId");
        const options = allAccounts.map(a => `<option value="${a.id}">${a.name} (#${a.id})</option>`).join("");
        const firstOption = select.innerHTML.split("\n")[0]; // Keep the placeholder
        select.innerHTML = firstOption + options;
    } catch (error) {
        console.error("Failed to populate accounts dropdown:", error);
    }
}

// ============================================
// Section 6: Budgets Resource
// ============================================

function budgetToHTMLRow(b) {
    return `
        <tr>
            <td>${b.category}</td>
            <td>${formatAmount(b.budgeted)}</td>
            <td>${formatAmount(b.spent)}</td>
            <td>${b.month} ${b.year}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="startEditBudget(${b.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBudget(${b.id})">Delete</button>
            </td>
        </tr>`;
}

function renderBudgets() {
    const tbody = document.querySelector("#budgets-table-body");
    if (budgets.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-message">No budgets found</td></tr>`;
        return;
    }
    tbody.innerHTML = budgets.map(b => budgetToHTMLRow(b)).join("");
}

async function loadBudgets() {
    try {
        budgets = await fetchAll("budgets");
        renderBudgets();
    } catch (error) {
        console.error("Failed to load budgets:", error);
    }
}

async function handleBudgetSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.budgeted = Number(data.budgeted);
    data.spent = Number(data.spent);
    data.year = Number(data.year);

    try {
        if (budgetEditingId) {
            await update("budgets", budgetEditingId, data);
            cancelEditBudget();
        } else {
            await create("budgets", data);
        }
        e.target.reset();
        await loadBudgets();
    } catch (error) {
        console.error("Failed to save budget:", error);
    }
}

function startEditBudget(id) {
    const b = budgets.find(b => b.id === id);
    if (!b) return;

    budgetEditingId = id;
    document.querySelector("#budget-category").value = b.category;
    document.querySelector("#budget-budgeted").value = b.budgeted;
    document.querySelector("#budget-spent").value = b.spent;
    document.querySelector("#budget-month").value = b.month;
    document.querySelector("#budget-year").value = b.year;
    document.querySelector("#budgets-form-title").textContent = "Edit Budget";
    document.querySelector("#budgets-submit-btn").textContent = "Update Budget";
    document.querySelector("#budgets-cancel-btn").classList.remove("hidden");
};

function cancelEditBudget() {
    budgetEditingId = null;
    document.querySelector("#budget-form").reset();
    document.querySelector("#budgets-form-title").textContent = "Add Budget";
    document.querySelector("#budgets-submit-btn").textContent = "Add Budget";
    document.querySelector("#budgets-cancel-btn").classList.add("hidden");
};

async function deleteBudget(id) {
    if (!confirm("Are you sure you want to delete this budget?")) return;
    try {
        await remove("budgets", id);
        await loadBudgets();
    } catch (error) {
        console.error("Failed to delete budget:", error);
    }
};

// ============================================
// Section 7: Goals Resource
// ============================================

function goalToHTMLRow(g) {
    return `
        <tr>
            <td>${g.name}</td>
            <td>${formatAmount(g.target)}</td>
            <td>${formatAmount(g.current)}</td>
            <td>${g.targetDate}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="startEditGoal(${g.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteGoal(${g.id})">Delete</button>
            </td>
        </tr>`;
}

function renderGoals() {
    const tbody = document.querySelector("#goals-table-body");
    if (goals.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="empty-message">No goals found</td></tr>`;
        return;
    }
    tbody.innerHTML = goals.map(g => goalToHTMLRow(g)).join("");
}

async function loadGoals() {
    try {
        goals = await fetchAll("goals");
        renderGoals();
    } catch (error) {
        console.error("Failed to load goals:", error);
    }
}

async function handleGoalSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.target = Number(data.target);
    data.current = Number(data.current);

    try {
        if (goalEditingId) {
            await update("goals", goalEditingId, data);
            cancelEditGoal();
        } else {
            await create("goals", data);
        }
        e.target.reset();
        await loadGoals();
    } catch (error) {
        console.error("Failed to save goal:", error);
    }
}

function startEditGoal(id) {
    const g = goals.find(g => g.id === id);
    if (!g) return;

    goalEditingId = id;
    document.querySelector("#goal-name").value = g.name;
    document.querySelector("#goal-target").value = g.target;
    document.querySelector("#goal-current").value = g.current;
    document.querySelector("#goal-targetDate").value = g.targetDate;
    document.querySelector("#goals-form-title").textContent = "Edit Goal";
    document.querySelector("#goals-submit-btn").textContent = "Update Goal";
    document.querySelector("#goals-cancel-btn").classList.remove("hidden");
};

function cancelEditGoal() {
    goalEditingId = null;
    document.querySelector("#goal-form").reset();
    document.querySelector("#goals-form-title").textContent = "Add Goal";
    document.querySelector("#goals-submit-btn").textContent = "Add Goal";
    document.querySelector("#goals-cancel-btn").classList.add("hidden");
};

async function deleteGoal(id) {
    if (!confirm("Are you sure you want to delete this goal?")) return;
    try {
        await remove("goals", id);
        await loadGoals();
    } catch (error) {
        console.error("Failed to delete goal:", error);
    }
};

// ============================================
// Section 8: Initialize app
// ============================================

document.addEventListener("DOMContentLoaded", async () => {
    await loadPage("accounts");
});
