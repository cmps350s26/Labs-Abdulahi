# Module 3: Delete Server Action + Wiring

## Key Concept

Delete actions take an `id` directly (not FormData). You call them as regular functions from client components. Use `deleteId` state to show a confirmation dialog before deleting.

```js
export async function deleteTransactionAction(id) {
    await transactionsRepo.delete(id);
    revalidatePath("/");
}
```

On the list page:
```jsx
const [deleteId, setDeleteId] = useState(null);

async function handleDelete(id) {
    await deleteTransactionAction(id);
    setDeleteId(null);
    await loadTransactions();
}
```

The Delete button sets `deleteId` → dialog shows → Confirm calls `handleDelete` → Cancel resets `deleteId`.

## Exercises

**TODOs 3a-3b** in `app/actions/transactionActions.js`:
1. `await transactionsRepo.delete(id)`
2. `revalidatePath("/")`

**TODOs 4a-4e** in `app/transactions/page.jsx`:
1. Import `deleteTransactionAction`
2. Add `deleteId` state
3. Create `handleDelete` function
4. Change Delete button to `onClick={() => setDeleteId(t.id)}`
5. Uncomment the confirmation dialog

## Expected Result

Click Delete → dialog appears → Confirm removes the transaction → Cancel closes the dialog.

## Self-Check

- Does the dialog appear when you click Delete?
- Does Cancel close the dialog without deleting?
- Does the transaction disappear after confirming?
- Does the Dashboard update? (revalidatePath("/") refreshes it)
