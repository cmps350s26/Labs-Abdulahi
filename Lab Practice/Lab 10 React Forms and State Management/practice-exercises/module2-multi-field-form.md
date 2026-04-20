# Module 2: Update Server Action

## Key Concept

The update action is almost identical to create. The difference: destructure `id` out of the data and call `update` instead of `create`.

```js
export async function updateTransactionAction(prevState, formData) {
    const { id, ...fields } = Object.fromEntries(formData);
    fields.amount = Number(fields.amount);
    // validate, update, revalidatePath, redirect
}
```

`const { id, ...fields }` separates the ID from the rest. The `id` comes from a hidden input in the form: `<input type="hidden" name="id" value={transaction.id} />`.

## Exercises

Open `app/actions/transactionActions.js` and complete TODOs 2a-2e in `updateTransactionAction`:

1. Destructure: `const { id, ...fields } = Object.fromEntries(formData)`
2. Coerce: `fields.amount = Number(fields.amount)`
3. Validate (same rules as create), return errors if any fail
4. Update: `await transactionsRepo.update(id, fields)`
5. Refresh + redirect: `revalidatePath("/")` then `redirect("/transactions")`

## Expected Result

Click Edit on a transaction → form opens with data pre-filled → change a field → submit → redirected to list with updated data.

## Self-Check

- Does the edit form show the existing values?
- After saving, does the list reflect the changes?
- What happens if you clear the description and submit? (Validation should catch it)
