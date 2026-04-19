# Module 5: Edit Forms and Dynamic Routes

## Key Concept

An edit form is the same as a create form, but:
- It **loads existing data** when the page opens
- It sends a **PUT** request instead of POST
- The URL includes the item's ID: `/accounts/3/edit`

## Getting the ID from the URL

Use `useParams` to read the dynamic route segment:
```jsx
import { useParams } from "next/navigation";
const params = useParams();
// For URL /accounts/3/edit, params.id is "3"
```

## Loading Existing Data

Fetch the item in `useEffect` and populate the form:
```jsx
useEffect(() => {
    fetch(`/api/transactions/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setName(data.name);
            setType(data.type);
            setBalance(String(data.balance));
            setLoading(false);
        });
}, [params.id]);
```

Note: `balance` is stored as a string in state because that's what the number input expects.

## PUT vs POST

The only difference in the fetch call:
```jsx
fetch(`/api/transactions/${params.id}`, {
    method: "PUT",        // Not POST
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type, balance: Number(balance) })
});
```

## Exercises

Open `app/transactions/[id]/edit/page.jsx` and complete TODOs 1-5.

## Expected Result

Click "Edit" on any transaction row. The form should load with that account's data pre-filled. Make changes and save - the transaction should update.

## Self-Check

- Does the form show "Loading..." briefly?
- Is the form pre-filled with the correct data?
- Does saving redirect you back to accounts?
- Is the data actually updated? (Check the transactions page)
