# Module 4: Form Validation

## Key Concept

Client-side validation catches errors before sending data to the server. The pattern:

1. Create a `validate()` function that returns an errors object
2. Call it in `handleSubmit` before the fetch
3. If there are errors, show them and stop

```jsx
function validate() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Account name is required";
    if (Number(balance) < 0) newErrors.balance = "Balance cannot be negative";
    return newErrors;
}
```

## Showing Errors

Store errors in state and render them below each field:
```jsx
const [errors, setErrors] = useState({});

<input className={errors.name ? "input-error" : ""} ... />
{errors.name && <p className="error-message">{errors.name}</p>}
```

## Clearing Errors

Clear a field's error when the user starts typing again:
```jsx
onChange={(e) => {
    setName(e.target.value);
    setErrors(prev => ({ ...prev, name: undefined }));
}}
```

## Exercises

Open `app/transactions/new/page.jsx` and complete TODOs 1-7.

## Expected Result

Submit an empty form - you should see red error messages. Start typing and the errors clear. Fill in valid data and the form submits normally.

## Self-Check

- Does submitting an empty form show errors?
- Does the name field turn red when invalid?
- Do errors clear as you type?
- Can you still submit valid data?
