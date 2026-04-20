# Module 6: Budget Form Page (Part B)

## Key Concept

Wire the budget form page the same way as the transaction form — `useSearchParams` for add/edit detection, `useActionState` for error feedback and pending state.

```jsx
const budget = Object.fromEntries(useSearchParams().entries());
const isEdit = !!budget.id;
const action = isEdit ? updateBudgetAction : createBudgetAction;
const [error, formAction, isPending] = useActionState(action, {});
```

## Exercises

**TODOs 10a-10g** in `app/budgets/form/page.jsx`:

1. Replace `budget = null` with `Object.fromEntries(useSearchParams().entries())`
2. Replace `isEdit = false` with `!!budget.id`
3. Replace `action = null` with the ternary
4. Wire `useActionState`: `const [error, formAction, isPending] = useActionState(action, {})`
5. Pass `action={formAction}` to the form tag
6. Change title to `{isEdit ? "Edit" : "Add"} Budget`
7. Add `disabled={isPending}` and `"Saving..."` to the button

## Expected Result

- `/budgets/form` → empty form → add a budget → redirected to grid
- Click Edit on a budget card → form pre-fills → save → updated in grid
- Submit empty form → validation errors from server action (if error display is wired)

## Self-Check

- Does the form work for both add and edit?
- Does the button show "Saving..." during submission?
- Does the title switch between "Add Budget" and "Edit Budget"?
- After submit, does the budgets grid show the new/updated budget?
