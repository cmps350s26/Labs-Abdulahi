# Module 3: Form Submission and API Integration

## Key Concept

When the user submits a form, you need to:

1. **Prevent the default** browser behavior (which would reload the page)
2. **Send the data** to your API with `fetch`
3. **Handle the response** (success or error)
4. **Give feedback** to the user

```jsx
async function handleSubmit(e) {
    e.preventDefault();  // Stop page reload
    const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, balance: Number(balance) })
    });
}
```

## Loading State

While the request is in flight, disable the submit button and change its text:
```jsx
const [submitting, setSubmitting] = useState(false);

<button disabled={submitting}>
    {submitting ? "Creating..." : "Create Account"}
</button>
```

## Navigation After Success

Use Next.js `useRouter` to redirect:
```jsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/accounts");  // Navigate to transactions page
```

## Exercises

Open `app/transactions/new/page.jsx` and complete TODOs 1-8.

## Expected Result

Fill out the form and submit. You should see "Account created!" briefly, then get redirected to the transactions page where your new transaction appears.

## Self-Check

- Does the button show "Creating..." while submitting?
- Does a new transaction appear on the transactions page?
- Check `data/transactions.json` - is the new transaction there?
