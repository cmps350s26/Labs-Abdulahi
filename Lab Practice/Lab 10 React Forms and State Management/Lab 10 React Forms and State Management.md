<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 10: React Forms with Server Actions

# Building Interactive Forms for the MyFinance Platform

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 10 of 11
**Prerequisites:** Labs 1-9 completed, Node.js v18+

---

## Overview

Lab 9 built read-only pages. Users can view transactions and budgets, but they can't add, edit, or delete anything. Lab 10 fixes that using **Server Actions** — functions that run on the server but are called directly from your forms. No `fetch()` calls, no API routes for mutations.

Here's the core idea: instead of `fetch('/api/transactions', { method: 'POST', body: ... })`, you write a function marked with `"use server"` that receives `FormData` directly:

```jsx
// app/actions/transactionActions.js
"use server";
import transactionsRepo from "@/repos/TransactionsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransactionAction(prevState, formData) {
    const data = Object.fromEntries(formData);
    data.amount = Number(data.amount);

    // Validate
    const errors = {};
    if (!data.description?.trim()) errors.description = "Description is required";
    if (!data.amount || data.amount <= 0) errors.amount = "Amount must be greater than 0";
    if (!data.date) errors.date = "Date is required";

    if (Object.keys(errors).length > 0) {
        return errors;  // sent back to the form via useActionState
    }

    await transactionsRepo.create(data);
    revalidatePath("/transactions");
    redirect("/transactions");
}
```

```jsx
// In your form — using useActionState to get validation errors back:
import { useActionState } from "react";

const [error, formAction, isPending] = useActionState(createTransactionAction, {});

<form action={formAction}>
    <input name="description" type="text"
        className={error?.description ? "input-error" : ""} />
    {error?.description && <p className="error-message">{error.description}</p>}
    <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Add"}
    </button>
</form>
```

No `e.preventDefault()`. No `useState` per field. No `fetch()`. The `name` attribute on each input is what matters — `Object.fromEntries(formData)` converts all form fields into a plain object. If validation fails, the action returns the errors object, which `useActionState` passes back to the form as `error`. The third value, `isPending`, is `true` while the action is running — use it to disable the submit button.

### What You'll Build

- Server action functions for create, update, and delete
- Server-side validation that returns error messages to the form via `useActionState`
- Wire forms to server actions using `action={...}`
- Edit links that pass data through query params using `<Link href={{ pathname, query }}>`
- Delete with confirmation dialogs on list pages
- The same patterns applied to Budgets (Part B)

### Lab Structure

**Part A: Guided Practice - Transactions CRUD (60 minutes)**
Instructor demonstrates each concept, you practice immediately, repeat.

**Part B: Independent Project - Budgets CRUD (60 minutes)**
Apply the patterns to Budgets on your own. Same patterns, different resource.

---

## Learning Objectives

By the end of this lab, you will be able to:

- Create server action functions with `"use server"`
- Wire a `<form>` directly to a server action via `action={...}`
- Extract form data using `Object.fromEntries(formData)`
- Validate inputs server-side and return errors to the form via `useActionState`
- Display inline error messages on form fields
- Read URL query params with `useSearchParams` to detect add vs edit mode
- Pass data through query params using `<Link href={{ pathname, query }}>`
- Use `revalidatePath()` to refresh cached data after mutations
- Use `redirect()` to navigate after successful mutations
- Delete resources with a confirmation dialog using a server action

---

## Prerequisites

- Lab 9 completed (React pages and components)
- Node.js v18+ installed
- Text editor and browser

---

## Getting Started

### 1. Open the Project

1. Navigate to `Startup Code/my-finance-app`
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000` in your browser

Keep the dev server running. Changes reload automatically.

### 2. What's Already Provided

The startup project includes:

- **API routes** from Lab 8 for transactions and budgets (`app/api/`)
- **Repos** from Lab 8 (`repos/TransactionsRepo.js`, `repos/BudgetsRepo.js`)
- **Data files** in `data/` (transactions.json, budgets.json)
- **NavBar**, **BudgetCard**, **SummaryCard**, **layout**, and **globals.css** (from Lab 9)
- **Form pages** with HTML structure provided — you wire the logic (searchParams, server actions)
- **TODO-stub files** for server actions (your main task) and delete wiring on list pages

### 3. Key Files for Lab 10

| File                                  | Purpose                                         |
| ------------------------------------- | ----------------------------------------------- |
| `app/actions/transactionActions.js` | TODOs 1-3: Server actions for transactions      |
| `app/transactions/page.jsx`         | TODO 4: Wire delete on transactions list        |
| `app/actions/budgetActions.js`      | TODOs 5-7: Server actions for budgets           |
| `app/budgets/page.jsx`              | TODO 8: Wire delete on budgets list             |
| `app/components/BudgetCard.jsx`     | TODO 9: Wire Edit link + Delete button          |
| `app/budgets/form/page.jsx`         | TODO 10: Wire form logic (searchParams, action) |

### 4. Schemas

```json
// Transaction
{ "id": 1, "description": "Monthly Salary", "amount": 12000, "type": "income", "category": "Salary", "date": "2026-03-01" }

// Budget
{ "id": 1, "category": "Housing", "budgeted": 5000, "spent": 4500, "month": "March", "year": 2026 }
```

---

# Part A: Guided Practice - Transactions CRUD (60 minutes)

## Module 1: Create Server Action (10 minutes)

### Instructor Demo (5 minutes)

A server action is an `async` function in a file marked with `"use server"`. It receives `FormData` directly from the form:

```jsx
// app/actions/transactionActions.js
"use server";

import transactionsRepo from "@/repos/TransactionsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransactionAction(prevState, formData) {
    const data = Object.fromEntries(formData);
    data.amount = Number(data.amount);

    const errors = {};
    if (!data.description?.trim()) errors.description = "Description is required";
    if (!data.amount || data.amount <= 0) errors.amount = "Amount must be greater than 0";
    if (!data.date) errors.date = "Date is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await transactionsRepo.create(data);
    revalidatePath("/transactions");
    redirect("/transactions");
}
```

Five things to notice:

1. **`"use server"`** at the top marks every exported function as a server action.
2. **`prevState`** is the first parameter — `useActionState` passes the previous return value here (used for error feedback).
3. **`Object.fromEntries(formData)`** converts all form fields into a plain object. Each input's `name` attribute becomes a key.
4. **Validation** builds an `errors` object. If any errors exist, `return errors` sends them back to the form (no redirect). The form re-renders with error messages.
5. **`revalidatePath` + `redirect`** only run if validation passes.

### Your Turn — TODO 1 (5 minutes)

Complete `createTransactionAction` in `app/actions/transactionActions.js`:

```jsx
// TODO 1a: const data = Object.fromEntries(formData)
// TODO 1b: data.amount = Number(data.amount)
// TODO 1c: Validate — check description, amount > 0, date. Return { errors } if any fail.
// TODO 1d: await transactionsRepo.create(data)
// TODO 1e: revalidatePath("/transactions") then redirect("/transactions")
```

---

## Module 2: Update Server Action (10 minutes)

### Instructor Demo (5 minutes)

The update action is almost identical to create. The difference: destructure `id` out of the data and call `update` instead of `create`:

```jsx
export async function updateTransactionAction(prevState, formData) {
    const { id, ...fields } = Object.fromEntries(formData);
    fields.amount = Number(fields.amount);

    const errors = {};
    if (!fields.description?.trim()) errors.description = "Description is required";
    if (!fields.amount || fields.amount <= 0) errors.amount = "Amount must be greater than 0";
    if (!fields.date) errors.date = "Date is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await transactionsRepo.update(id, fields);
    revalidatePath("/transactions");
    redirect("/transactions");
}
```

Same validation as create. The `id` comes from `<input type="hidden" name="id">` in the form.

### Your Turn — TODO 2 (5 minutes)

Complete `updateTransactionAction` in `app/actions/transactionActions.js`:

```jsx
// TODO 2a: const { id, ...fields } = Object.fromEntries(formData)
// TODO 2b: fields.amount = Number(fields.amount)
// TODO 2c: Validate (same rules as create). Return { errors } if any fail.
// TODO 2d: await transactionsRepo.update(id, fields)
// TODO 2e: revalidatePath("/transactions") then redirect("/transactions")
```

Test: click Edit on a transaction, change the description, save. The list should show the updated value.

---

## Module 3: Delete Server Action + Wiring (15 minutes)

### Instructor Demo (8 minutes)

The delete server action is simpler — it takes an `id` directly instead of `FormData`:

```jsx
export async function deleteTransactionAction(id) {
    await transactionsRepo.delete(id);
    revalidatePath("/transactions");
    revalidatePath("/");
}
```

Unlike create/update, you can call this server action as a regular function from a client component. No form needed.

On the transactions list page, we use `deleteId` state for a confirmation dialog. Clicking Delete sets the ID; the dialog calls the actual server action:

```jsx
import { deleteTransactionAction } from "@/app/actions/transactionActions";

const [deleteId, setDeleteId] = useState(null);

async function handleDelete(id) {
    await deleteTransactionAction(id);
    setDeleteId(null);
    await loadTransactions();
}

// Delete button in each row:
<button onClick={() => setDeleteId(t.id)}>Delete</button>

// Confirmation dialog (renders when deleteId is set):
{deleteId && (
    <div className="confirm-overlay">
        <div className="confirm-dialog">
            <h3>Delete Transaction</h3>
            <p>Are you sure? This action cannot be undone.</p>
            <button className="btn btn--danger" onClick={() => handleDelete(deleteId)}>Delete</button>
            <button className="btn btn--primary" onClick={() => setDeleteId(null)}>Cancel</button>
        </div>
    </div>
)}
```

### Your Turn — TODOs 3-4 (7 minutes)

Complete `deleteTransactionAction` in `app/actions/transactionActions.js`:

```jsx
// TODO 3a: await transactionsRepo.delete(id)
// TODO 3b: revalidatePath("/transactions") and revalidatePath("/")
```

Complete the wiring in `app/transactions/page.jsx`:

```jsx
// TODO 4a: Import deleteTransactionAction from "@/app/actions/transactionActions"
// TODO 4b: Create handleDelete(id) — calls deleteTransactionAction, then loadTransactions
```

---

## Module 4: Understanding the Form Pages (10 minutes)

### Instructor Demo (10 minutes)

The transaction form page is already complete. Walk through how it works:

Both Add and Edit use the same route: `/transactions/form`. The difference is whether the URL has query params:

- **Add**: `/transactions/form` (no params, empty form)
- **Edit**: `/transactions/form?id=3&description=Grocery+Shopping&amount=850&...` (data in URL, pre-filled form)

The form reads the URL with `useSearchParams` to detect add vs edit, and uses `useActionState` to get validation errors back:

```jsx
const transaction = Object.fromEntries(useSearchParams().entries());
const isEdit = !!transaction.id;
const action = isEdit ? updateTransactionAction : createTransactionAction;
const [error, formAction, isPending] = useActionState(action, {});
```

The form uses `action={formAction}` to wire the server action, `defaultValue={transaction?.description || ""}` to pre-fill fields in edit mode, and `error?.description` to show validation errors:

```jsx
<input name="description" defaultValue={transaction?.description || ""}
    className={error?.description ? "input-error" : ""} />
{error?.description && <p className="error-message">{error.description}</p>}
```

On the list page, the Edit link passes the whole transaction object as query params:

```jsx
<Link href={{ pathname: "/transactions/form", query: t }}>Edit</Link>
```

Next.js auto-serializes `t` into the URL. The Add link is just a plain path:

```jsx
<Link href="/transactions/form">+ Add Transaction</Link>
```

### Your Turn (discuss)

Open the transaction form page and answer:

1. How does the form detect Add vs Edit mode?
2. What does `action={action}` do on the `<form>` tag?
3. Why do we use `defaultValue` instead of `value` on the inputs?

---

# Part B: Independent Project - Budgets CRUD (60 minutes)

## Project Overview

Apply everything from Part A to Budgets. Same patterns, different resource.

Continue in the same project. No new install needed.

## Starting Point

- Full CRUD for Transactions (already working from Part A)
- Budgets list page (with search filter, from Lab 9)
- Budget API routes fully working
- `BudgetCard` component with Edit and Delete buttons (need wiring)
- Budget form page with HTML provided (need logic wiring)
- TODO stub files for budget server actions

## Tasks

### Task 1: Budget Server Actions — TODOs 5-7 (20 minutes)

Complete `app/actions/budgetActions.js`:

```jsx
// TODO 5: createBudgetAction — prevState + formData, Object.fromEntries, coerce numbers, validate, create, revalidate, redirect
// TODO 6: updateBudgetAction — prevState + formData, destructure { id, ...fields }, coerce, validate, update, revalidate, redirect
// TODO 7: deleteBudgetAction — delete, revalidate
```

### Task 2: Wire Delete on Budgets Page — TODO 8 (10 minutes)

Complete `app/budgets/page.jsx`:

```jsx
// TODO 8a: Import deleteBudgetAction from "@/app/actions/budgetActions"
// TODO 8b: Create handleDelete(id) — calls deleteBudgetAction, then loadBudgets
// TODO 8c: Pass onDelete={setDeleteId} to BudgetCard
```

### Task 3: Wire BudgetCard — TODO 9 (5 minutes)

Complete `app/components/BudgetCard.jsx`:

```jsx
// TODO 9a: Add href={{ pathname: "/budgets/form", query: budget }} to the Edit Link
// TODO 9b: Add onClick={() => onDelete(budget.id)} to the Delete button
```

### Task 4: Wire Budget Form Page — TODO 10 (10 minutes)

Complete the logic in `app/budgets/form/page.jsx` (HTML is already provided):

```jsx
// TODO 10a: const budget = Object.fromEntries(useSearchParams().entries())
// TODO 10b: const isEdit = !!budget.id
// TODO 10c: const action = isEdit ? updateBudgetAction : createBudgetAction
// TODO 10d: const [error, formAction, isPending] = useActionState(action, {})
// TODO 10e: Pass formAction to the <form> tag: action={formAction}
// TODO 10f: Change title to {isEdit ? "Edit" : "Add"} Budget
// TODO 10g: Add error display on validated fields (same pattern as TransactionForm)
```

### Task 5: Test the Full Flow (15 minutes)

- Add a new budget, verify it appears in the grid
- Click Edit on a budget, change the amount, save, verify
- Delete a budget, confirm it disappears
- Check `data/budgets.json` to confirm persistence

---

## TODO Summary

| TODO            | File                              | What to do                                   |
| --------------- | --------------------------------- | -------------------------------------------- |
| **1a-d**  | `actions/transactionActions.js` | `createTransactionAction` body             |
| **2a-d**  | `actions/transactionActions.js` | `updateTransactionAction` body             |
| **3a-b**  | `actions/transactionActions.js` | `deleteTransactionAction` body             |
| **4a-b**  | `transactions/page.jsx`         | Import +`handleDelete`                     |
| **5a-c**  | `actions/budgetActions.js`      | `createBudgetAction` body                  |
| **6a-c**  | `actions/budgetActions.js`      | `updateBudgetAction` body                  |
| **7a-b**  | `actions/budgetActions.js`      | `deleteBudgetAction` body                  |
| **8a-c**  | `budgets/page.jsx`              | Import +`handleDelete` + pass `onDelete` |
| **9a-b**  | `components/BudgetCard.jsx`     | Wire Edit `href` + Delete `onClick`      |
| **10a-e** | `budgets/form/page.jsx`         | Wire searchParams, isEdit, action, title     |

---

## Self-Assessment Checklist

### Part A (Transactions)

- [ ] `createTransactionAction` converts formData, coerces amount, creates, revalidates, redirects
- [ ] `updateTransactionAction` destructures `{ id, ...fields }`, updates, revalidates, redirects
- [ ] `deleteTransactionAction` deletes and revalidates
- [ ] Delete button on transactions page calls `handleDelete` directly

### Part B (Budgets)

- [ ] All three budget server actions work
- [ ] BudgetCard Edit link passes budget data through query params
- [ ] BudgetCard Delete button calls `onDelete(budget.id)`
- [ ] Budget form page reads searchParams and wires the correct action
- [ ] Data persists in `data/budgets.json` across server restarts

---

## Common Mistakes

| Mistake                         | Fix                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `"use server"` not working    | Must be the very first line of the file — before any imports                                                 |
| Form data is empty              | Check the `name` attribute on every input — `Object.fromEntries(formData)` uses them as keys             |
| Amount stored as string         | After `Object.fromEntries`, coerce with `data.amount = Number(data.amount)`                               |
| Form doesn't redirect           | Make sure `redirect()` is called after `transactionsRepo.create()`                                        |
| Edit form is empty              | Check the `<Link href={{ pathname, query: t }}>` passes the data object                                     |
| `defaultValue` doesn't update | `defaultValue` only sets the initial value — if using the same route, add `key={budget?.id}` to the form |
| Delete doesn't refresh the list | Call `loadTransactions()` or `loadBudgets()` after the server action completes                            |

---

## Server Actions vs fetch() — Summary

|                         | Old (fetch)                                     | New (Server Actions)                                                       |
| ----------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- |
| **Mutation code** | `fetch('/api/...', { method: 'POST', body })` | `"use server"` function, call repo directly                              |
| **Form data**     | `useState` per field + `JSON.stringify`     | `Object.fromEntries(formData)` — one line for all fields                |
| **Form inputs**   | Controlled:`value={state}` + `onChange`     | Uncontrolled:`name="field"` + `defaultValue`                           |
| **Loading state** | Manual `useState(false)` + disabled button    | `isPending` from `useActionState` — automatic                         |
| **Validation**    | Client-side `validate()` before fetch         | Server-side in action, errors returned via `useActionState` as `error` |
| **Redirect**      | `useRouter().push()`                          | `redirect()` from `next/navigation`                                    |
| **Data refresh**  | Manual state update or re-fetch                 | `revalidatePath()`                                                       |

---

## Resources

- [Next.js Server Actions &amp; Mutations](https://nextjs.org/docs/app/getting-started/mutating-data)
- [React useActionState](https://react.dev/reference/react/useActionState)
- [Next.js revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [Next.js redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)

---

## What's Next?

In **Lab 11**, you'll replace the JSON file storage with a real SQLite database using Prisma ORM. Your transactions and budgets will persist properly, and you'll learn database schema design.

---

**Author:** Abdulahi Hassen
