# Module 4: Client Components and Interactivity

**Time limit: 7 minutes**

## Concepts

Server Components can't respond to user actions. When you need clicks, typing, dropdowns, or any browser interaction, you create a Client Component by adding `"use client"` as the very first line of the file.

Client Components run in the browser, so they can't import server-only code like `fs` or your repos. Instead, they fetch data from your API routes using `fetch()`.

`useState` holds values that change over time (the selected filter, loaded data). `useEffect` runs side effects after the component renders. The dependency array controls *when* the effect re-runs: `[]` means "once on mount", while `[filter]` means "every time `filter` changes".

Instead of fetching everything and filtering locally, let the API do the filtering. The route at `app/api/transactions/route.js` already reads a `type` query parameter, so we just need to build the URL:

```
/api/transactions            → all transactions
/api/transactions?type=income    → only income
/api/transactions?type=expense   → only expenses
```

When state changes, React re-renders the component automatically. No manual DOM updates needed.

## Key Syntax

```jsx
"use client";

import { useState, useEffect } from "react";

export default function MyPage() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        async function loadItems() {
            const url = filter === "all"
                ? "/api/items"
                : `/api/items?type=${filter}`;
            const res = await fetch(url);
            const data = await res.json();
            setItems(data);
        }
        loadItems();
    }, [filter]); // re-run whenever `filter` changes

    return (/* JSX rendering items directly - server already filtered */);
}
```

Controlled select element:
```jsx
<select value={filter} onChange={(e) => setFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="typeA">Type A</option>
</select>
```

## Exercises

### Exercise 1: Create the Transactions Page

Create `app/transactions/page.jsx`. Complete the TODOs:

1. Add `"use client"` as the first line
2. Import `useState` and `useEffect` from `"react"`
3. Create state for `transactions` (starts as `[]`) and `filterType` (starts as `"all"`)
4. Inside `useEffect`, build the fetch URL:
   - If `filterType` is `"all"` → `"/api/transactions"`
   - Otherwise → `` `/api/transactions?type=${filterType}` ``
5. Fetch the URL and store the result with `setTransactions`
6. Pass `[filterType]` as the dependency array so the effect re-runs when the filter changes

### Exercise 2: Add the Filter Dropdown

Still in the transactions page:

1. Add a `<select>` with value tied to `filterType` and onChange calling `setFilterType`
2. Include options for "All", "Income", and "Expense"
3. Use `htmlFor` (not `for`) on the label

Notice there's no local `.filter()` call — the server already returns the filtered list.

### Exercise 3: Render the Table

Below the filter dropdown:

1. Render a `<table>` with headers: Description, Category, Type, Amount, Date
2. Use `transactions.map()` to render rows
3. Add `key={t.id}` to each row
4. Format amount with `.toLocaleString()` and " QAR"
5. Use a ternary to add `"text-success"` for income, `"text-danger"` for expense on the amount cell

## Expected Output

Navigate to `/transactions`:
- Page loads and shows all transactions in a table
- Dropdown defaults to "All"
- Selecting "Income" re-fetches from `/api/transactions?type=income` and shows only income transactions
- Selecting "Expense" re-fetches from `/api/transactions?type=expense`
- Switching back to "All" re-fetches the full list
- Income amounts appear green, expense amounts appear red

Open the browser Network tab and confirm a new request fires each time the dropdown changes.

## Self-Check

- [ ] Is `"use client"` the very first line of the file (before any imports)?
- [ ] Did you use `fetch(...)` with a URL you built from `filterType`, not a local `.filter()` call?
- [ ] Does `useEffect` have `[filterType]` as the dependency array (not `[]`)?
- [ ] Does the select's `onChange` call `setFilterType` (not modify DOM directly)?
- [ ] Does the table render directly from `transactions` (no local filtering)?
- [ ] In the Network tab, does changing the dropdown trigger a new `/api/transactions?type=...` request?
