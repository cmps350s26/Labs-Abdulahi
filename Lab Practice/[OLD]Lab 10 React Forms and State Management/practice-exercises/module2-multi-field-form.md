# Module 2: Building a Multi-Field Form

## Key Concept

A real form has multiple fields. Each field gets its own `useState` call. The form structure uses standard HTML `<form>`, `<label>`, and input elements, but each is controlled by React state.

**Select elements** work the same way as text inputs:
```jsx
const [type, setType] = useState("checking");
<select value={type} onChange={(e) => setType(e.target.value)}>
    <option value="checking">Checking</option>
    <option value="savings">Savings</option>
</select>
```

## Form Structure

A good form has:
- A `<label>` for every input (use `htmlFor` in JSX, not `for`)
- Grouped fields in `form-group` divs
- A submit button inside the form

## Exercises

Open `app/transactions/new/page.jsx` and complete:

1. **TODO 1:** Import `useState`
2. **TODO 2:** Create state for name, type, and balance
3. **TODO 3-5:** Wire each input as a controlled component
4. **TODO 6:** Add `type="submit"` to the button

## Expected Result

Navigate to `/accounts/new`. You should see a form with three fields. Typing in any field updates the state. The button doesn't do anything yet (that's Module 3).

## Self-Check

- Can you type in all three fields?
- Does the select default to "Checking"?
- Open React DevTools - can you see the state values updating?
