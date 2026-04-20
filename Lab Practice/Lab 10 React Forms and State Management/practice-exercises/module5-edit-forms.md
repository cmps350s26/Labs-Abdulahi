# Module 5: Budget Server Actions (Part B)

## Key Concept

Part B applies the same patterns from transactions to budgets. You write the server actions and wire the form independently.

Budget fields: `category`, `budgeted`, `spent`, `month`, `year`

Numeric fields to coerce: `budgeted`, `spent`, `year`

Validation: category not empty, budgeted > 0, month not empty, year >= 2020

## Exercises

**TODOs 5-7** in `app/actions/budgetActions.js`:

1. `createBudgetAction` — Object.fromEntries, coerce numbers, validate, create, revalidatePath("/"), redirect("/budgets")
2. `updateBudgetAction` — destructure { id, ...fields }, coerce, validate, update, revalidatePath, redirect
3. `deleteBudgetAction` — delete, revalidatePath("/")

**TODOs 8a-8e** in `app/budgets/page.jsx`:

1. Import `deleteBudgetAction`
2. Add `deleteId` state
3. Create `handleDelete` — calls action, resets deleteId, calls loadBudgets
4. Pass `onDelete={setDeleteId}` to BudgetCard
5. Uncomment the confirmation dialog

**TODOs 9a-9b** in `app/components/BudgetCard.jsx`:

1. Add `href={{ pathname: "/budgets/form", query: budget }}` to Edit link
2. Add `onClick={() => onDelete(budget.id)}` to Delete button

## Expected Result

- Add budget → appears in grid
- Edit budget → form pre-fills → saves correctly
- Delete budget → dialog → confirm → removed from grid

## Self-Check

- Do all three budget actions work (create, update, delete)?
- Does the budget form detect add vs edit mode?
- Does the confirmation dialog work on the budgets page?
