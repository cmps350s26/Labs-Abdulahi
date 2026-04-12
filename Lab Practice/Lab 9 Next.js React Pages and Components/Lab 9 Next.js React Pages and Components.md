<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 9: Next.js React Pages and Components

# Build a Multi-Page Finance Dashboard with React

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 9 of 11
**Prerequisites:** Labs 1-8 completed

---

## Overview

In Lab 8 you built the backend, a REST API with endpoints for transactions and budgets. Then you wired that API up to a vanilla JS frontend (the app under `public/client/`) using everything you learned in Labs 1-7: HTML, CSS, DOM manipulation, event handlers, fetch, template literals, `innerHTML`. It works, but look at `public/client/js/app.js` for a minute. Every page manually does `fetch → parse → build HTML string → innerHTML → attach event listeners`. Adding a new feature means touching five files and hoping you didn't miss a selector.

This lab is where you see why React exists. React lets you write UI as **components**: small pieces that return JSX (HTML-like syntax that lives inside JavaScript). Instead of manually building HTML strings with template literals and shoving them into the DOM, you return JSX from a function and React handles the rendering. Instead of `document.querySelector("#transactions-table-body").innerHTML = ...`, you just return `<tbody>{filtered.map(t => <tr>...</tr>)}</tbody>` and React figures out what changed.

The single-row HTML is almost identical between vanilla and React. The real pain (and the real payoff) shows up when the data changes. Look at what happens in your vanilla code when the user picks a different filter:

**Vanilla JS** (your current `public/client/js/app.js`):
```js
// 1. attach listener manually
document.querySelector("#type-filter")
    .addEventListener("change", async (e) => {
        filterType = e.target.value;        // 2. update global variable
        await loadTransactions();           // 3. re-fetch
        renderTransactions();               // 4. rebuild HTML string
    });

function renderTransactions() {
    const tbody = document.querySelector("#transactions-table-body");
    tbody.innerHTML = transactions          // 5. wipe the DOM
        .filter(t => filterType === "all" || t.type === filterType)
        .map(t => transactionToHTMLRow(t))
        .join("");
    // 6. re-attach delete listeners for every new row (they got blown away)
    document.querySelectorAll(".delete-btn")
        .forEach(btn => btn.addEventListener("click", handleDelete));
}
```

**React** (what you'll write in Lab 9):
```jsx
const [filterType, setFilterType] = useState("all");

const filtered = filterType === "all"
    ? transactions
    : transactions.filter(t => t.type === filterType);

return (
    <>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>

        <tbody>
            {filtered.map(t => (
                <tr key={t.id}>
                    <td>{t.description}</td>
                    <td><button onClick={() => handleDelete(t.id)}>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </>
);
```

Notice what's gone in the React version:

- No `querySelector`, no `addEventListener`, no `innerHTML`
- No global `filterType` variable - it's state, declared where it's used
- No separate `renderTransactions()` function - React re-renders automatically when state changes
- No re-attaching delete listeners - `onClick` stays wired because JSX re-renders don't destroy listeners

**State changes → UI updates. Automatically.** That's the whole pitch. You describe what the UI should look like for a given state, and React handles the DOM plumbing you wrote by hand all semester.

Next.js adds file-based routing on top of React. Create a file at `app/budgets/page.jsx` and it automatically becomes the `/budgets` page. No router configuration needed.

Your job this lab: convert the vanilla app in `public/client/` into a Next.js/React version. Same behavior, cleaner code.

### What You'll Build

- A navigation bar component with client-side routing (3 links: Dashboard, Transactions, Budgets)
- A Budgets page that fetches data directly in a Server Component
- A reusable BudgetCard component with props and a dynamic progress bar
- A Transactions page with client-side filtering and delete
- A Budgets page with text search and delete (converted to Client Component)
- A complete multi-page MyFinance dashboard with summary cards and recent activity

### Lab Structure

**Part A: React Fundamentals (60 minutes)**
Instructor demonstrates each concept, you practice immediately, repeat.

**Part B: Build the MyFinance Dashboard (60 minutes)**
Apply all concepts to build a 3-page finance platform with reusable components.

---

## Learning Objectives

By the end of this lab, you will be able to:

- Write JSX and create functional React components
- Set up a root layout with navigation using Next.js Link
- Create pages using the App Router file convention
- Fetch data in Server Components using async/await
- Pass data between components using props
- Use conditional styling with template literals
- Render lists with `.map()` and the `key` prop
- Create Client Components with `"use client"` for interactivity
- Use `useState` and `useEffect` hooks for state and data fetching
- Build a filter UI and a search UI that update the displayed data
- Delete items via fetch DELETE and update local state to reflect the change

---

## Prerequisites

- Lab 8 completed (Next.js API with JSON file storage)
- Node.js v18+ installed
- Text editor and browser

---

## Getting Started

### 1. Open the Project

Open `Startup Code/my-finance-app/` - the same project name you used in Lab 8, so everything feels continuous.

```bash
cd "Startup Code/my-finance-app"
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. You'll see the default Next.js welcome page - that's because nothing is built yet. Your job is to build the pages.

Keep the dev server running. Changes reload automatically.

### 2. See the Target First

Open `http://localhost:3000/client/` in a new tab. This is the **vanilla JS version** of the app you're about to build - the same app you wired up in Lab 8. Click around: navigate between Transactions and Budgets, try the filter, delete an item, use the search. **This is what your Next.js version should look like and do.** Keep this tab open while you work.

### 3. What's Already Provided

```
my-finance-app/
├── app/
│   ├── api/                    ← REST API from Lab 8 (don't touch)
│   │   ├── transactions/
│   │   └── budgets/
│   ├── layout.js               ← default create-next-app stub
│   ├── page.js                 ← default create-next-app welcome
│   ├── globals.css             ← default create-next-app styles (replace these)
│   └── favicon.ico
├── data/                       ← transactions.json, budgets.json
├── repos/                      ← TransactionsRepo, BudgetsRepo (from Lab 8)
├── public/
│   └── client/                 ← vanilla JS reference app
├── jsconfig.json               ← sets up @/ import alias
├── next.config.mjs
└── package.json
```

### 4. What You'll Create

Everything under `app/` except the API:
- `app/components/` - NavBar, BudgetCard, SummaryCard
- `app/transactions/page.jsx`
- `app/budgets/page.jsx`
- A proper `app/layout.js` and `app/page.jsx`
- Real CSS in `app/globals.css` (copy it from `public/client/css/styles.css`)

### 5. Data Schemas

**Transaction:**
```json
{ "id": 1, "description": "Monthly Salary", "amount": 12000, "type": "income", "category": "Salary", "date": "2026-03-01" }
```

**Budget:**
```json
{ "id": 1, "category": "Housing", "budgeted": 5000, "spent": 4500, "month": "March", "year": 2026 }
```

### 6. Import Style

This project uses the `@/` path alias (set up in `jsconfig.json`). So instead of fragile `../../../lib/stuff` paths, you write:

```jsx
import budgetsRepo from "@/repos/BudgetsRepo";
import BudgetCard from "@/app/components/BudgetCard.jsx";
```

The `@` resolves to the project root.

---

# Part A: React Fundamentals (60 minutes)

## Module 1: JSX, Layout, and Navigation (15 minutes)

### Instructor Demo (7 minutes)

React components are JavaScript functions that return JSX. JSX looks like HTML but lives inside your JS files. It compiles to regular JavaScript behind the scenes.

Next.js uses a special file `app/layout.js` as the root layout. Anything you put here wraps every page in your app.

```jsx
import "./globals.css";
import NavBar from "@/app/components/NavBar.jsx";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
```

The `{children}` is where each page gets rendered. The NavBar appears on every page because it's in the root layout.

Notice `className` instead of `class`. JSX uses camelCase for most HTML attributes because `class` is a reserved word in JavaScript.

The NavBar uses Next.js `Link` for navigation. Link is like an anchor tag, but it does client-side routing (no full page reload):

```jsx
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
```

### Your Turn (8 minutes)

First, copy the styles so your pages aren't unstyled:
- Open `public/client/css/styles.css`, select all, copy
- Open `app/globals.css`, replace its contents with what you copied

Now create the navigation:

1. **Create `app/components/NavBar.jsx`** with 3 links (Dashboard, Transactions, Budgets) using Next.js `Link`. Reference the vanilla nav in `public/client/index.html`.
2. **Replace `app/layout.js`** with a version that imports `globals.css` and `NavBar`, and renders `<NavBar />` above `{children}`.
3. **Replace `app/page.jsx`** (delete the default `page.js` first) with a simple welcome heading for now.

Visit `http://localhost:3000`. You should see the navigation bar with your styles. Clicking links changes the URL, but the Transactions and Budgets pages don't exist yet (404). That's fine, we build them next.

---

## Module 2: Server Components and Data Fetching (15 minutes)

### Instructor Demo (7 minutes)

Server Components run on the server, not in the browser. They can use async/await to fetch data directly. No useState, no useEffect, no fetch calls.

The file `app/budgets/page.jsx` automatically becomes the `/budgets` route.

```jsx
import budgetsRepo from "@/repos/BudgetsRepo";

export default async function BudgetsPage() {
    const budgets = await budgetsRepo.getAll();

    return (
        <main className="page">
            <h1>Budgets</h1>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Budgeted</th>
                            <th>Spent</th>
                            <th>Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.map((budget) => (
                            <tr key={budget.id}>
                                <td>{budget.category}</td>
                                <td>{budget.budgeted.toLocaleString()} QAR</td>
                                <td>{budget.spent.toLocaleString()} QAR</td>
                                <td>{budget.month} {budget.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
```

Notice we import directly from `@/repos/BudgetsRepo` - the same repo you built in Lab 8. Server Components run on the server, so they can use file-system code directly (no need to go through the API).

Three things to notice:

1. The component is `async`. Server Components can await data. Client Components cannot.
2. `.map()` returns an array of JSX. React renders arrays fine.
3. Every mapped item needs a unique `key` prop. React uses it to track items when the list changes.

The data fetch happens on the server. The client receives pre-rendered HTML. That's faster and better for SEO than fetching in the browser.

### Your Turn (8 minutes)

Create a new file at `app/budgets/page.jsx`:
1. Import `budgetsRepo` from `@/repos/BudgetsRepo`
2. Make the function `async`
3. `await budgetsRepo.getAll()`
4. Map over budgets to render table rows (don't forget `key={budget.id}`)

Visit `http://localhost:3000/budgets`. You should see the budgets table. Compare it to `http://localhost:3000/client/pages/budgets.html` - same data, same styling.

---

## Module 3: Reusable Components and Props (15 minutes)

### Instructor Demo (7 minutes)

Tables are fine for data, but cards look better. More importantly, we can turn each budget row into a reusable `BudgetCard` component. Components accept data through **props**, similar to parameters in a Java method.

```jsx
export default function BudgetCard({ budget }) {
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
        </div>
    );
}
```

The `{ budget }` syntax destructures the props object. The caller passes `<BudgetCard budget={someBudget} />` and this component receives `budget` as a variable.

The ternary `percentage > 90 ? "danger" : ...` picks a color class based on how much of the budget is spent. This is conditional styling without an if statement.

Template literals with `${}` build the className dynamically:

```
progress-bar--success  (if percentage <= 70)
progress-bar--warning  (if percentage > 70)
progress-bar--danger   (if percentage > 90)
```

Now the Budgets page uses the card:

```jsx
import budgetsRepo from "@/repos/BudgetsRepo";
import BudgetCard from "@/app/components/BudgetCard.jsx";

export default async function BudgetsPage() {
    const budgets = await budgetsRepo.getAll();

    return (
        <main className="page">
            <h1>Budgets</h1>
            <div className="dashboard-grid">
                {budgets.map((budget) => (
                    <BudgetCard key={budget.id} budget={budget} />
                ))}
            </div>
        </main>
    );
}
```

Notice `key={budget.id}` goes on the BudgetCard, not inside it. Keys live on the element you're mapping.

### Your Turn (8 minutes)

1. **Create `app/components/BudgetCard.jsx`**:
   - Accept `{ budget }` as a prop
   - Calculate the percentage
   - Pick a color based on percentage (>90 danger, >70 warning, else success)
   - Return the JSX with category, amounts, progress bar, and percentage text

2. **Update `app/budgets/page.jsx`**:
   - Import `BudgetCard` from `@/app/components/BudgetCard.jsx`
   - Replace the table with a `dashboard-grid` div
   - Map over budgets to render BudgetCard components

Visit `/budgets`. You should see budget cards with colored progress bars - matching what you see in the vanilla reference.

---

## Module 4: Client Components and Interactivity (15 minutes)

### Instructor Demo (7 minutes)

Server Components are great for static data. But what about interactivity? Filter dropdowns, counters, form inputs, anything that responds to clicks or keystrokes needs a Client Component.

Add `"use client"` at the top of the file. Now you can use React hooks like `useState` and `useEffect`.

Instead of fetching every transaction and filtering in the browser, we'll let the API do the filtering. The route at `app/api/transactions/route.js` already reads a `type` query parameter:

```
/api/transactions                 → all transactions
/api/transactions?type=income     → only income
/api/transactions?type=expense    → only expenses
```

Try those URLs in the browser to confirm.

Now the trick: we want `useEffect` to **re-run every time the filter changes**, not just on mount. That's what the dependency array is for — `[filterType]` means "re-run whenever `filterType` changes."

```jsx
"use client";

import { useState, useEffect } from "react";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState("all");

    useEffect(() => {
        async function loadTransactions() {
            const url = filterType === "all"
                ? "/api/transactions"
                : `/api/transactions?type=${filterType}`;
            const res = await fetch(url);
            const data = await res.json();
            setTransactions(data);
        }
        loadTransactions();
    }, [filterType]); // re-run when filterType changes

    return (
        <main className="page">
            <h1>Transactions</h1>

            <div className="filter-bar">
                <label htmlFor="type-filter">Filter by type:</label>
                <select
                    id="type-filter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

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
                        {transactions.map((t) => (
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
```

Walk through it:

1. `"use client"` marks this as a Client Component
2. `useState([])` creates state that starts empty
3. `useEffect(..., [filterType])` runs once after the first render **and every time `filterType` changes**. We define an inner `async` function for the fetch (using the async/await you learned in Lab 7), then call it. We can't make `useEffect`'s callback itself `async` because React expects that callback to return either nothing or a cleanup function, not a Promise.
4. The URL is built from `filterType`: `/api/transactions` for "all", `/api/transactions?type=income` otherwise
5. Changing the dropdown updates `filterType` → React re-runs the effect → new fetch with a new query param → `setTransactions` re-renders the table
6. No local `.filter()` call. The server already returned exactly the rows we want.

This is how React handles interactivity. State drives the UI — and here, state drives the URL we fetch.

### Your Turn (8 minutes)

Create a new file at `app/transactions/page.jsx`:
1. Add `"use client"` at the top
2. Import `useState, useEffect` from `"react"`
3. Create state for `transactions` and `filterType`
4. Inside `useEffect`, build the URL based on `filterType`:
   - `"all"` → `/api/transactions`
   - otherwise → `` `/api/transactions?type=${filterType}` ``
5. Pass `[filterType]` as the dependency array
6. Render the filter dropdown with `value={filterType}` and `onChange={setFilterType}`
7. Map over `transactions` directly in the table body (no local filtering)

Visit `/transactions`. Open the browser **Network tab** — every time you change the dropdown you should see a fresh request to `/api/transactions?type=...`. Compare to `http://localhost:3000/client/pages/transactions.html` - same behavior, but now the server does the filtering.

---

## Module 5: Deleting Data and Search (15 minutes)

### Instructor Demo (7 minutes)

Client Components can also mutate data. Deleting is the simplest mutation: send a DELETE request, then remove the item from local state so the UI updates without a re-fetch.

```jsx
async function handleDelete(id) {
    if (!confirm("Delete this transaction?")) return;
    const response = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (response.ok) {
        setTransactions(prev => prev.filter(t => t.id !== id));
    }
}
```

Three things to notice:

1. `confirm()` is a browser built-in. Quick safety check, no custom dialog needed (Lab 10 upgrades this).
2. `method: "DELETE"` tells the API to remove the resource.
3. After success, `setTransactions(prev => prev.filter(...))` removes the item from local state. The UI re-renders with one less row.

For budgets, we'll use a different kind of interactivity: **search**. Instead of a fixed dropdown, let the user type a search term:

```jsx
const [searchTerm, setSearchTerm] = useState("");

const filtered = budgets.filter(b =>
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
);

<input
    type="text"
    placeholder="e.g. Food, Housing..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>
```

Note: the Budgets page was a Server Component in Module 3. To add interactivity, you need to convert it to a Client Component (add `"use client"`, fetch in `useEffect`).

### Your Turn (8 minutes)

**Transactions - add delete (`app/transactions/page.jsx`):**
1. Write `handleDelete(id)` using the pattern above
2. Add an "Actions" column to the table header
3. Add a `<td>` with a Delete button that calls `handleDelete(t.id)`

**Budgets - convert to Client Component with search + delete:**
1. `app/budgets/page.jsx` - Add `"use client"`, remove `getBudgets` import and `async`, fetch in `useEffect`
2. Add `searchTerm` state and `handleDelete` function
3. Filter budgets by `searchTerm` (case-insensitive match on `category`)
4. Add a search `<input>` to the filter bar
5. Pass `onDelete={handleDelete}` to each `BudgetCard`
6. `app/components/BudgetCard.jsx` - Accept an `onDelete` prop, render a Delete button when it's provided

Test: search for "Food" - only the Food budget should show. Click Delete - the card disappears and the data is gone (refresh to confirm).

---

# Part B: Build the Dashboard (60 minutes)

## Project Overview

You've built Transactions and Budgets pages. Now build the home page: a Dashboard with summary cards and recent activity. This is where you combine data from both resources into a single view.

By the end of Part B, `/` should show:
- 4 summary cards (Total Income, Total Expenses, Balance, Monthly Budget)
- A Recent Transactions table with the last 5 entries

## Starting Point

Everything from Part A is already in place:
- API routes working
- `repos/TransactionsRepo` and `repos/BudgetsRepo` from Lab 8
- `NavBar` and `BudgetCard` components you built
- `Transactions` and `Budgets` pages fully interactive

Now you add the Dashboard on top.

## Tasks

### Task 1: SummaryCard Component (15 minutes)

Create `app/components/SummaryCard.jsx`. Props: `title` (string), `amount` (number), `variant` (string: `"success"`, `"danger"`, `"warning"`, `"primary"`).

```jsx
export default function SummaryCard({ title, amount, variant }) {
    return (
        <div className={`card card--${variant}`}>
            <h3>{title}</h3>
            <p className="amount">{amount.toLocaleString()} QAR</p>
        </div>
    );
}
```

The variant controls the left border color via the CSS classes `card--success`, `card--danger`, `card--warning`, `card--primary` (already in your `globals.css`).

### Task 2: Dashboard Page (45 minutes)

Replace `app/page.jsx` with an async Server Component that:
- Imports both repos
- Fetches transactions and budgets
- Computes totals (income, expenses, balance, total budgeted)
- Renders 4 `SummaryCard` components in a `dashboard-grid`
- Renders a "Recent Transactions" table showing the last 5 transactions

Calculation hints:
```jsx
import transactionsRepo from "@/repos/TransactionsRepo";
import budgetsRepo from "@/repos/BudgetsRepo";

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
```

Visit `/`. You should see the full dashboard. Now click around between Dashboard, Transactions, and Budgets - full multi-page React app, no page reloads.

---

## Self-Assessment Checklist

### Part A
- [ ] NavBar shows on every page with 3 working links
- [ ] Budgets page fetches and displays data as a table (Module 2)
- [ ] BudgetCard component works with props and shows a colored progress bar (Module 3)
- [ ] Transactions page filters live by selected type (Module 4)
- [ ] Transactions delete button removes rows via DELETE + state update (Module 5)
- [ ] Budgets page search input filters cards by category text (Module 5)
- [ ] Budgets delete button removes cards (Module 5)

### Part B
- [ ] SummaryCard accepts title, amount, and variant props
- [ ] Dashboard shows 4 summary cards with correct totals
- [ ] Dashboard shows the last 5 transactions in a table
- [ ] Navigating between pages does not cause a full reload
- [ ] The Next.js app at `/` behaves like the vanilla app at `/client/`

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| "useState is not defined" | Add `"use client"` at the top of the file. Server Components can't use hooks. |
| Server Component missing data | Make the function `async` and use `await` on the data call |
| "each child should have a unique key prop" | Add `key={item.id}` to mapped elements |
| Filter dropdown doesn't change anything | Make sure you map over `filtered`, not `transactions` |
| Page reloads on navigation | Use Next.js `Link`, not plain `<a>` tags |
| Expected accountId on transactions | Accounts have been removed. Transactions only have: id, description, amount, type, category, date |
| `className` vs `class` confusion | JSX uses `className`, not `class` |

---

## Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [React useState](https://react.dev/reference/react/useState)
- [React useEffect](https://react.dev/reference/react/useEffect)
- [Next.js Link](https://nextjs.org/docs/app/api-reference/components/link)

---

## What's Next?

In **Lab 10**, you'll add forms to your dashboard. Users will be able to create, edit, and delete transactions and budgets through React forms.

---

**Author:** Abdulahi Hassen
