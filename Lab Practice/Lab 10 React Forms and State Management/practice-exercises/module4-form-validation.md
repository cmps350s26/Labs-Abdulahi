# Module 4: Wiring the Form Component

## Key Concept

The form component uses `useSearchParams` to detect add vs edit mode, and `useActionState` to wire the server action and get validation errors back.

```jsx
const searchParams = useSearchParams();
const params = Object.fromEntries(searchParams.entries());
const transaction = params.id
    ? { ...params, id: Number(params.id), amount: Number(params.amount) }
    : null;

const isEdit = !!transaction;
const action = isEdit ? updateTransactionAction : createTransactionAction;
const [error, formAction, isPending] = useActionState(action, {});
```

- **No query params** → `transaction` is null → add mode
- **Query params with id** → `transaction` has data → edit mode, inputs get `defaultValue`
- **`useActionState`** returns `[error, formAction, isPending]`:
  - `error` — validation errors from the server action (or `{}` initially)
  - `formAction` — pass to `<form action={formAction}>`
  - `isPending` — `true` while the action runs (use on the button)

## Exercises

Open `app/components/TransactionForm.jsx` and complete the TODOs:

1. Replace `transaction = null` with `Object.fromEntries(useSearchParams().entries())` + coerce id/amount
2. Replace `isEdit = false` with `!!transaction`
3. Replace `action = null` with the ternary
4. Wire `useActionState`: `const [error, formAction, isPending] = useActionState(action, {})`
5. Pass `action={formAction}` to the form tag
6. Change title to `{isEdit ? "Edit" : "Add"} Transaction`
7. Add `disabled={isPending}` and `"Saving..."` to the button
8. Add error display on description and amount inputs (date is already done as reference)

## Expected Result

- Add: `/transactions/form` → empty form → submit → redirected to list
- Edit: click Edit on a transaction → form pre-fills from query params → save → updated
- Validation: submit empty form → error messages appear on description and amount

## Self-Check

- Does the title change between "Add" and "Edit"?
- Does the button show "Saving..." during submission?
- Do error messages appear and disappear correctly?
- Does the Cancel link only show in edit mode?
