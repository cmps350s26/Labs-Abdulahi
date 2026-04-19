# Module 6: Delete with Confirmation

## Key Concept

Delete operations need a confirmation step. Accidental clicks happen. The pattern:

1. User clicks "Delete" on a card
2. Store the item's ID in state (`deleteId`)
3. Show a confirmation dialog
4. On confirm: send DELETE request, remove from local state
5. On cancel: clear `deleteId`

## The Delete Flow

```jsx
const [deleteId, setDeleteId] = useState(null);

// In TransactionRow: onClick={() => onDelete(account.id)}
// In parent: onDelete={(id) => setDeleteId(id)}

async function handleDelete(id) {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    setAccounts(prev => prev.filter(a => a.id !== id));
    setDeleteId(null);
}
```

## Why Remove from State?

After a successful DELETE, you could re-fetch the entire list. But it's faster to just filter the deleted item out of the local state. The server already deleted it.

## Server Component to Client Component

The transactions page was a server component in Lab 9. To add delete (which needs state and event handlers), you need to convert it to a client component:
- Add `"use client"` at the top
- Replace `getAccounts()` with a `fetch` call in `useEffect`

## Exercises

Complete TODOs 1-5 across `app/transactions/page.jsx` and `app/components/TransactionRow.jsx`.

## Expected Result

Each transaction row has an "Edit" link and a "Delete" button. Clicking Delete shows a centered dialog. Confirming removes the transaction. Canceling closes the dialog.

## Self-Check

- Does the overlay dim the background?
- Does the transaction disappear after confirming delete?
- Does clicking Cancel close the dialog without deleting?
- Check `data/transactions.json` - is the transaction actually removed?
