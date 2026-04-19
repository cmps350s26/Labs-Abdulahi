# Module 1: Controlled Inputs and useState

## Key Concept

In React, a **controlled component** is an input whose value is driven by state. The component state is the single source of truth, not the DOM.

**The pattern:**
```jsx
const [name, setName] = useState("");
<input value={name} onChange={(e) => setName(e.target.value)} />
```

Every keystroke fires `onChange`, which updates the state, which re-renders the input with the new value. This is called **two-way data binding**.

## Why Controlled?

- You always know the current value (it's in state)
- You can validate, transform, or block input in real time
- You can display the value elsewhere (like a live preview)

Compare this to vanilla JS where you'd call `document.getElementById("name").value` to read the input. In React, you just read `name`.

## Exercises

Open `app/practice/page.jsx` and complete:

1. **TODO 1:** Import `useState` from `"react"`
2. **TODO 2:** Create a `name` state variable
3. **TODO 3:** Create an `amount` state variable
4. **TODO 4:** Wire the text input with `value` and `onChange`
5. **TODO 5:** Wire the number input with `value` and `onChange`
6. **TODO 6:** Uncomment the preview box

## Expected Result

As you type your name and change the amount, the preview box updates in real time. The "10% savings" calculation updates automatically.

## Self-Check

- Does the preview update as you type?
- What happens if you remove `value={name}` from the input? Try it.
- What happens if you remove `onChange`? The input becomes read-only. That's React enforcing single source of truth.
