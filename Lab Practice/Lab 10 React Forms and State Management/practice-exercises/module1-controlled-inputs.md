# Module 1: Create Server Action

## Key Concept

A **server action** is an async function marked with `"use server"` that runs on the server but is called directly from a form. No `fetch()`, no API route needed for mutations.

**The pattern:**
```js
"use server";
import transactionsRepo from "@/repos/TransactionsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransactionAction(prevState, formData) {
    const data = Object.fromEntries(formData);
    data.amount = Number(data.amount);
    // validate, create, revalidatePath, redirect
}
```

`Object.fromEntries(formData)` converts all form fields into a plain object. Each input's `name` attribute becomes a key.

## Why Server Actions?

- No `fetch()` calls — the form calls the server directly
- No `useState` per field — inputs use `name` and `defaultValue`
- No `e.preventDefault()` — the form's `action` attribute handles submission
- Validation happens on the server, errors come back via `useActionState`

## Exercises

Open `app/actions/transactionActions.js` and complete TODOs 1a-1e in `createTransactionAction`:

1. Convert formData: `const data = Object.fromEntries(formData)`
2. Coerce amount: `data.amount = Number(data.amount)`
3. Validate — build errors object, return errors if any fail
4. Create: `await transactionsRepo.create(data)`
5. Refresh + redirect: `revalidatePath("/")` then `redirect("/transactions")`

## Expected Result

After completing the action, go to `/transactions/form`, fill in a transaction, submit. You should be redirected to `/transactions` with the new entry visible.

## Self-Check

- Does the transaction appear on the list page after submit?
- Does the Dashboard update (revalidatePath("/") refreshes it)?
- What happens if you submit an empty form? (Validation returns errors, but you won't see them until the form is wired with useActionState)
