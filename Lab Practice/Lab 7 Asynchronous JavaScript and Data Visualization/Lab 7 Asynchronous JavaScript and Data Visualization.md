<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 7: Asynchronous JavaScript and CRUD Operations

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 7 of 11
**Prerequisites:** Labs 1-6 completed

---

## Overview

So far, all your JavaScript code has been synchronous. You write a line, it runs, then the next line runs. That works fine until you need to load data from a server or wait for something that takes time. JavaScript is single-threaded, meaning it can only do one thing at a time. If fetching data from a server took 3 seconds and JS just waited around, your entire page would freeze. Nobody wants that.

The solution: **async/await**. This lets you say "go do this thing, and when it's done, run this code." The browser keeps working while the operation completes in the background. You already know this concept if you've used threads in Java or `asyncio` in Python, but JS does it differently since there's only one thread.

This lab also introduces the **Fetch API** for loading data from a REST API and **CRUD operations** (Create, Read, Update, Delete) for managing data through API calls. You'll build your first API-powered transaction manager.

### What You'll Build

A MyFinance Transaction Manager featuring:

- JSON data parsing and transformation
- Async data fetching from a REST API
- Loading states and error handling
- Full CRUD operations (Create, Read, Update, Delete) via API
- Live search and filtering of transactions
- Edit mode with form toggling between Add and Update

### Lab Structure

**Part A: Async JavaScript and CRUD Basics (60 minutes)**
Instructor demonstrates each concept, you practice immediately, repeat.

**Part B: Build Your Transaction Manager (60 minutes)**
Apply all learned concepts to build a CRUD transaction manager with search and filtering.

---

## Learning Objectives

By the end of this lab, you will be able to:

- Convert JavaScript objects to/from JSON strings
- Transform data using `map`, `filter`, `reduce`, and `Object.entries`
- Use `async`/`await` with `try`/`catch` to handle asynchronous operations
- Fetch JSON data from a REST API using the Fetch API
- Send POST, PUT, and DELETE requests to a REST API
- Handle loading states and errors during data fetching
- Build a full CRUD interface with add, edit, and delete functionality
- Implement search and filter on fetched data

---

## Prerequisites

- Labs 1-6 completed (working Account Manager with localStorage)
- **Node.js** installed (for Modules 1-2 which run in the terminal)
- **VS Code Live Server** extension installed - search "Live Server" in the Extensions tab
- Text editor and browser ready

> **Why Live Server?** Your HTML pages need to be served over HTTP. Opening an HTML file directly (file:// protocol) causes cross-origin issues with API calls. Live Server creates a local HTTP server so your pages can communicate with the API server.

---

## Getting Started

- **Part A Modules 1-2** run in the terminal: `node js/practice.js`
- **Part A Modules 3-4** run in the browser via Live Server: right-click `practice.html` and select "Open with Live Server"
- **Part B** runs in the browser via Live Server: right-click `index.html` and select "Open with Live Server"

---

# Part A: Async JavaScript and CRUD Basics (60 minutes)

## Module 1: JSON and Data Transformation (15 minutes)

JSON (JavaScript Object Notation) is how data travels on the web. It looks almost identical to JavaScript objects, but it's a text format. Every API you'll ever work with sends and receives JSON.

**JSON.stringify and JSON.parse**

```javascript
const transaction = {
    description: "Salary",
    amount: 12000,
    type: "income",
    category: "Salary"
};

// Object -> JSON string (for saving/sending)
const jsonString = JSON.stringify(transaction);
console.log(jsonString);
// '{"description":"Salary","amount":12000,"type":"income","category":"Salary"}'
console.log(typeof jsonString);  // "string"

// JSON string -> Object (for using in code)
const parsed = JSON.parse(jsonString);
console.log(parsed.description);  // "Salary"
console.log(typeof parsed);       // "object"

// Pretty-print with indentation
console.log(JSON.stringify(transaction, null, 2));
```

If you've used `ObjectMapper` in Java or `json.dumps()`/`json.loads()` in Python, this is the same idea.

**Array Methods Refresher - map, filter, reduce**

These three methods are your main tools for transforming arrays of objects. Quick refresher using a simple example:

```javascript
const numbers = [10, 25, 40, 5, 30];

// map - transform each item into something else
const doubled = numbers.map(n => n * 2);
// [20, 50, 80, 10, 60]

// filter - keep only items that match a condition
const big = numbers.filter(n => n > 20);
// [25, 40, 30]

// reduce - combine all items into a single value
const total = numbers.reduce((sum, n) => sum + n, 0);
// 110

// Chain them: filter first, then reduce the filtered result
const bigTotal = numbers.filter(n => n > 20).reduce((sum, n) => sum + n, 0);
// 95
```

You can use `map` on objects too - pull out one property, or build a new string from multiple properties:

```javascript
const people = [
    { name: "Ali", age: 22 },
    { name: "Sara", age: 25 }
];

const names = people.map(p => p.name);          // ["Ali", "Sara"]
const labels = people.map(p => `${p.name} (${p.age})`);  // ["Ali (22)", "Sara (25)"]
```

To find the max/min in an array, `reduce` can compare items:

```javascript
const oldest = people.reduce((max, p) => p.age > max.age ? p : max);
// { name: "Sara", age: 25 }
```

**Grouping Data with reduce + Object.entries**

`reduce` can build an object where keys are categories and values are totals:

```javascript
const items = [
    { name: "Apple", category: "Fruit", price: 5 },
    { name: "Bread", category: "Bakery", price: 8 },
    { name: "Banana", category: "Fruit", price: 3 }
];

const byCategory = items.reduce((groups, item) => {
    groups[item.category] = (groups[item.category] || 0) + item.price;
    return groups;
}, {});
// { Fruit: 8, Bakery: 8 }
```

`Object.entries()` converts an object to an array of `[key, value]` pairs, which you can loop over:

```javascript
Object.entries(byCategory).forEach(([category, total]) => {
    console.log(`${category}: ${total}`);
});
// "Fruit: 8"
// "Bakery: 8"
```

### Practice (8 minutes)

Open `Startup Code/Part A/module1/js/practice.js`. Run with: `node js/practice.js`

**Exercise 1: JSON.stringify and JSON.parse**

- Create a transaction object with `description`, `amount`, `type`, and `category` properties
- Convert it to a JSON string with `JSON.stringify()` and log the result
- Parse it back to an object with `JSON.parse()` and log the `amount` property
- Pretty-print it using `JSON.stringify(obj, null, 2)`

**Exercise 2: Transforming Arrays with map/filter/reduce**

A `transactions` array is provided. Using that array:

- a) Use `.map()` to create an array of just the description values. Log it.
- b) Use `.filter()` and `.reduce()` to calculate the total amount of all expenses. Log it.
- c) Use `.map()` to create an array of formatted strings. Each transaction should become a string like `"Salary: +8,000 QAR"` - use `+` for income, `-` for expenses, and `toLocaleString()` for comma formatting. Log the array.
- d) Filter to only expenses, then use `.reduce()` to find which expense has the highest amount. Log its description and amount.

**Exercise 3: Grouping Data by Category**

- Use `.reduce()` to group all transactions by category, totaling the amounts for each. The result should be an object like `{ Salary: 10500, Housing: 4000, Food: 1000, ... }`
- Use `Object.entries()` and `.forEach()` to log each category and its total

---

## Module 2: Async/Await (15 minutes)

JavaScript is single-threaded. It can only run one thing at a time. When you need to do something slow (fetch data from an API, read a file, wait for a timer), you can't just block and wait. The entire page would freeze.

JavaScript handles this with **Promises** - objects that represent a value arriving later. A Promise can be:
- **Pending** - still working on it
- **Fulfilled** - done, here's the result
- **Rejected** - failed, here's the error

Think of it like ordering food. You get a receipt (the Promise). You don't stand at the counter waiting. You sit down and do other things. When the food is ready, they call your number (fulfilled). If they're out of what you ordered, they tell you (rejected).

You don't need to create Promises yourself yet. Libraries like `fetch()` and functions you'll use return Promises for you. Your job is to **consume** them using `async`/`await`.

**Basic async/await**

```javascript
// Suppose getWeather() returns a Promise (someone else wrote it)
// You consume it with async/await:

async function showWeather() {
    console.log("Checking weather...");
    const weather = await getWeather("Doha");  // pauses here until done
    console.log(weather.temperature);           // runs after Promise resolves
}

showWeather();
```

`async` marks a function as one that can use `await`. The `await` keyword pauses that function until the Promise resolves. The rest of your program keeps running - only that function waits.

**Error handling with try/catch**

When a Promise rejects (fails), you catch it the same way as Java:

```javascript
async function fetchData() {
    try {
        const result = await someAsyncOperation();
        console.log("Success:", result);
    } catch (error) {
        console.log("Failed:", error.message);
    }
}
```

Without try/catch, a rejected Promise crashes your program.

**Sequential vs Parallel Execution**

When you have multiple async calls that don't depend on each other, you can run them in parallel with `Promise.all`:

```javascript
// SEQUENTIAL - one after another
const users = await fetchUsers();       // wait 1s
const products = await fetchProducts(); // wait another 1s
// Total: ~2 seconds

// PARALLEL - both at once
const [users, products] = await Promise.all([
    fetchUsers(),      // starts immediately
    fetchProducts()    // starts immediately
]);
// Total: ~1 second (the slower of the two)
```

`Promise.all` takes an array of Promises and waits for all of them to finish. Use `console.time()` / `console.timeEnd()` to measure the difference yourself.

### Practice (7 minutes)

Open `Startup Code/Part A/module2/js/practice.js`. Run with: `node js/practice.js`

Two helper functions are provided in the file: `loadTransactions(shouldSucceed)` returns a Promise that resolves with an array of transactions (or rejects if `shouldSucceed` is false), and `simulateApiCall(name, ms)` returns a Promise that resolves after `ms` milliseconds.

**Exercise 1: Basic Async/Await**

- Write an async function `displayTransactions()` that:
  1. Logs `"Loading..."`
  2. Awaits `loadTransactions(true)` and stores the result
  3. Logs each transaction as `"  Salary: 8,000 QAR"` (description and amount)
  4. Logs `"Done! Loaded X transactions"` where X is the array length
- Call `displayTransactions()` at the bottom

**Exercise 2: Error Handling with try/catch**

- Write an async function `loadWithErrorHandling()` that:
  1. Uses try/catch
  2. In try: awaits `loadTransactions(false)` - this WILL fail
  3. In catch: logs `"Error caught: <error message>"`
- Call it and verify the error is caught gracefully

**Exercise 3: Sequential vs Parallel with Promise.all**

- Write `runSequential()` that awaits `simulateApiCall` 3 times one after another (accounts, transactions, goals - each 1000ms). Time it with `console.time` / `console.timeEnd`.
- Write `runParallel()` that runs all 3 calls at once using `Promise.all`. Destructure the result. Time it.
- Call both (sequentially, so they don't overlap). Sequential should take ~3s, parallel ~1s.

---

## Module 3: Fetch API (15 minutes)

From this module onward, all exercises use a pre-deployed REST API. No local server setup needed - it's already live at:

`https://myfinance-api-bay.vercel.app/transactions`

Available endpoints:

- `GET /transactions` - all transactions
- `GET /transactions/3` - one transaction by id
- `POST /transactions` - create new (send JSON body)
- `PUT /transactions/3` - update by id (send JSON body)
- `DELETE /transactions/3` - delete by id
- `POST /reset` - reset data to the original 6 transactions

> **Note:** All students share the same API. If the data gets messy, send a POST request to `https://myfinance-api-bay.vercel.app/reset` to restore the original transactions.

The Fetch API lets you load data from servers. It returns a Promise, so you use `async`/`await` with it. In this module, you'll fetch data from a deployed REST API.

> **Important:** Your HTML page must be served via Live Server (not opened directly as file://). Opening a file directly causes cross-origin errors when making API calls.

**Fetching JSON Data**

```javascript
const response = await fetch("https://jsonplaceholder.typicode.com/users");
const users = await response.json();
console.log(users);  // array of user objects
```

Two awaits: first for the network response, second to parse the JSON body. The `response.json()` method also returns a Promise since parsing large data takes time.

**Loading States and Error Handling**

A good fetch pattern shows status to the user and handles failures:

```javascript
statusEl.textContent = "Loading...";

try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    statusEl.textContent = `Loaded ${data.length} items`;
} catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
}
```

Always check `response.ok`. A 404 error does NOT throw an exception by default - the fetch itself succeeded (the server responded), but the resource doesn't exist. You have to check the status yourself.

**Rendering Data in a Table**

Once you have an array of objects, you can build table rows with `.map()` and inject them into a `<tbody>`:

```javascript
const tbody = document.getElementById("my-tbody");
tbody.innerHTML = users.map(u => `
    <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
    </tr>
`).join("");
```

**Combining Fetch + Transform**

You already know `filter`, `reduce`, and `map` from Module 1. Now combine them with fetched data. Fetch the data first, then transform it the same way you did with local arrays - calculate totals, format values, update the DOM.

### Practice (7 minutes)

Open `Startup Code/Part A/module3/practice.html` via Live Server, then edit `js/practice.js`.

**Exercise 1: Fetch and Display**

When the **Load Transactions** button (`#load-btn`) is clicked:
- Show `"Loading..."` in `#status`
- Fetch all transactions from the API
- Render each transaction as a table row in `#transaction-body` (columns: ID, Description, Amount, Type, Category)
- Format amounts with `+`/`-` signs and `toLocaleString()`
- Update `#status` to show how many transactions loaded
- Handle errors with try/catch

**Exercise 2: Fetch, Transform, and Summarize**

When the **Show Summary** button (`#summary-btn`) is clicked:
- Fetch all transactions from the API
- Calculate: total income, total expenses, balance (income minus expenses), and transaction count
- Display as 4 cards in `#summary-cards` using the `dashboard-grid` CSS class
- Color the balance card green if positive, red if negative

---

## Module 4: CRUD Operations - POST, PUT, DELETE (15 minutes)

So far you've used `fetch()` to read data (GET requests). But REST APIs support four operations, often called CRUD:

- **C**reate = POST (send new data to the server)
- **R**ead = GET (fetch data from the server)
- **U**pdate = PUT (replace existing data on the server)
- **D**elete = DELETE (remove data from the server)

GET is the default for `fetch()`. For other methods, you pass an options object with `method`, `headers`, and `body`.

### Instructor Led (7 minutes)

**POST - Create a New Transaction**

```javascript
const API_URL = "https://myfinance-api-bay.vercel.app/transactions";

const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: "Lunch", amount: 45, type: "expense", category: "Food" })
});
const created = await response.json();  // server returns the created item with an id
console.log(created);  // { id: 16, description: "Lunch", amount: 45, ... }
```

Three things are different from GET:
1. `method: "POST"` tells the server you're creating data
2. `headers` tells the server the body is JSON
3. `body` is the data, converted to a JSON string

**PUT - Update an Existing Transaction**

```javascript
await fetch(`${API_URL}/3`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description: "Dinner", amount: 80, type: "expense", category: "Food" })
});
```

PUT targets a specific item by ID in the URL (`/3`). The body replaces the entire resource.

**DELETE - Remove a Transaction**

```javascript
await fetch(`${API_URL}/3`, { method: "DELETE" });
```

DELETE just needs the method and the ID in the URL. No body or headers needed.

**HTTP Methods Summary**

| Method | Purpose | URL | Body |
|--------|---------|-----|------|
| GET | Read all | `/transactions` | None |
| GET | Read one | `/transactions/3` | None |
| POST | Create | `/transactions` | JSON data |
| PUT | Update | `/transactions/3` | JSON data |
| DELETE | Remove | `/transactions/3` | None |

**Edit Mode Pattern**

In a real app, users don't type in IDs. They click an **Edit** button next to the item. The button fetches the data and fills a form:

```javascript
async function startEdit(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const t = await response.json();
    // Populate form fields with t.description, t.amount, etc.
}
```

Then the form submit handler sends a PUT request using the stored ID:

```javascript
const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
});
```

### Practice (8 minutes)

Open `Startup Code/Part A/module4/practice.html` via Live Server, then edit `js/practice.js`.

The transaction table is already loaded and each row has **Edit** and **Delete** buttons. These buttons call `startEdit(id)` and `deleteTransaction(id)` - functions you'll write below.

**Exercise 1: POST - Add a Transaction**

Add a submit listener on `#add-form` that:
- Reads description, amount, type, and category from the form
- Sends a POST request to the API with a JSON body
- Shows `"Created: <description> (ID: <id>)"` in `#add-status`
- Refreshes the table by calling `loadTransactions()`
- Resets the form

**Exercise 2: PUT - Edit a Transaction**

Write these functions:
- `startEdit(id)` - Fetches the transaction by ID (GET), populates the edit form fields (`#edit-desc`, `#edit-amount`, `#edit-type`, `#edit-category`), stores the ID in the hidden `#edit-id` field, hides `#edit-hint`, shows `#cancel-edit-btn`
- `cancelEdit()` - Resets the form, clears `#edit-id`, shows `#edit-hint`, hides `#cancel-edit-btn`
- Cancel button click listener - calls `cancelEdit()`
- Edit form submit listener - reads the ID from `#edit-id` (if empty, show an error), sends a PUT request to the API, shows success in `#edit-status`, calls `cancelEdit()` and `loadTransactions()`

**Exercise 3: DELETE - Remove a Transaction**

Write `deleteTransaction(id)` that:
- Sends a DELETE request to `API_URL + "/" + id`
- Shows `"Deleted transaction <id>"` in `#delete-status`
- Refreshes the table

---

# Part B: Build Your Transaction Manager (60 minutes)

## Task: Full CRUD Transaction Manager

Build a transaction manager that fetches data from the REST API and supports adding, editing, and deleting transactions.

### Setup

1. Open `Startup Code/Part B/`
2. Right-click `index.html` and select "Open with Live Server"
3. The HTML and CSS are provided. Open `js/app.js` for your JavaScript
4. The API is at `https://myfinance-api-bay.vercel.app/transactions` (same as Part A)

### Architecture

Unlike Lab 6 where data lived in localStorage, this lab stores everything in the API. The flow is:

1. Page loads -> fetch all transactions from API -> store in a local array -> render everything
2. User adds a transaction -> POST to API -> add to local array -> refresh
3. User edits a transaction -> populate form -> PUT to API -> update local array -> refresh
4. User deletes a transaction -> DELETE from API -> remove from local array -> refresh

The `app.js` starter code has `API_URL`, an empty `transactions` array, an `editingId` variable, and a `refreshAll()` helper already provided.

### Requirements

Build the transaction manager by completing these tasks in `js/app.js`:

#### Task 1: loadTransactions()

Create an async function that fetches all transactions from the API.

- `GET` request to `API_URL`
- Parse the response as JSON and store in the `transactions` array
- Call `refreshAll()` to update the entire page
- Wrap in try/catch, log errors to console

#### Task 2: updateSummary()

Create a function that calculates totals from the `transactions` array and updates the summary cards.

- Filter transactions by type to get income and expense totals
- Use `reduce` to calculate `totalIncome` and `totalExpenses`
- Calculate `balance` (income minus expenses)
- Update the text content of `#total-income`, `#total-expenses`, `#total-balance`
- Format values with `.toLocaleString() + " QAR"`
- Color `#total-balance` green if positive, red if negative

#### Task 3: renderTransactions()

Create a function that renders the transaction table in `#transaction-body`.

- Call `getFilteredTransactions()` to apply current search/filter before rendering
- For each transaction, create a table row with: description, category, type label, formatted amount, Edit button, Delete button
- The Edit button calls `startEdit(id)`
- The Delete button calls `deleteTransaction(id)`
- Color income amounts green, expenses red
- Show "No transactions found" if the filtered array is empty

#### Task 4: addTransaction(data)

Create an async function that POSTs a new transaction to the API.

- Use `fetch` with `method: "POST"`, `headers: { "Content-Type": "application/json" }`, and `body: JSON.stringify(data)`
- Parse the response to get the created transaction (the server assigns the `id`)
- Push it to the `transactions` array
- Call `refreshAll()`
- Wrap in try/catch

#### Task 5: updateTransaction(id, data)

Create an async function that PUTs updated data to the API.

- `PUT` request to `API_URL + "/" + id` with JSON body
- Parse the response to get the updated transaction
- Find and replace the old transaction in the local array
- Call `refreshAll()`
- Wrap in try/catch

#### Task 6: deleteTransaction(id)

Create an async function that DELETEs a transaction from the API.

- `DELETE` request to `API_URL + "/" + id`
- Remove it from the local array: `transactions = transactions.filter(t => t.id !== id)`
- Call `refreshAll()`
- Wrap in try/catch

#### Task 7: Search and Filter

Add live search and filter functionality.

- Write `getFilteredTransactions()` that filters the `transactions` array by:
  - `#search` input (case-insensitive match on description)
  - `#filter-type` dropdown ("all", "income", "expense")
- Add event listeners on `#search` (input) and `#filter-type` (change) - each calls `renderTransactions()`

#### Task 8: Form Handling and Edit Mode

Wire up the form to support both adding and editing.

- **startEdit(id)**: Find the transaction in the array, populate the form fields, change the submit button text to "Update Transaction", show the Cancel button, set `editingId`
- **cancelEdit()**: Reset the form, hide Cancel button, change button text back to "Add Transaction", set `editingId` to null
- **Form submit** on `#transaction-form`: Read description, amount, type, category from the form. If `editingId` is set, call `updateTransaction(editingId, data)` then `cancelEdit()`. Otherwise call `addTransaction(data)`. Reset the form. Use `preventDefault()`.
- **Cancel button**: Call `cancelEdit()`
- **Page load**: Call `loadTransactions()` to fetch initial data


### Testing Checklist

- [ ] Page loads and transactions appear from the API
- [ ] Summary cards show correct income, expenses, and balance
- [ ] Add a new transaction via the form - verify it appears and totals update
- [ ] Click Edit on a transaction - form populates with its data, button says "Update"
- [ ] Submit the edit - transaction updates in the table and API
- [ ] Click Cancel Edit - form resets to Add mode
- [ ] Delete a transaction and verify everything updates
- [ ] Refresh the page - changes persist (they're in the API, not just memory)
- [ ] Type in the search box and verify the table filters
- [ ] Change the type filter and verify it works

---

## Self-Assessment Checklist

Check off each skill you're confident in:

### JSON and Data Transformation
- [ ] I can convert objects to JSON strings and back with `JSON.stringify`/`JSON.parse`
- [ ] I can transform arrays using `map`, `filter`, and `reduce`
- [ ] I can group data by category using `reduce` and read it with `Object.entries`

### Async/Await
- [ ] I can explain why JavaScript uses Promises (single-threaded, non-blocking)
- [ ] I can use `async`/`await` to consume Promises
- [ ] I can use `try`/`catch` for error handling with async code
- [ ] I can run multiple async operations in parallel with `Promise.all`

### Fetch API
- [ ] I can fetch JSON data from a REST API using the Fetch API
- [ ] I know why the page needs to be served via Live Server (HTTP, not file://)
- [ ] I can check `response.ok` and handle HTTP errors
- [ ] I can send POST and DELETE requests with fetch
- [ ] I can show loading states while data is being fetched

### CRUD Operations
- [ ] I can send POST requests with a JSON body to create new data
- [ ] I can send PUT requests to update existing data by ID
- [ ] I can send DELETE requests to remove data by ID
- [ ] I know why POST and PUT need the `Content-Type: application/json` header
- [ ] I understand the difference between POST (create new) and PUT (replace existing)

### Integration
- [ ] I can build a full CRUD interface with add, edit, and delete functionality
- [ ] I can wire up search/filter to update the display in real time
- [ ] I can implement edit mode that toggles a form between add and update

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Fetch fails with CORS error | Serve your HTML via Live Server, not file:// |
| `response.json()` called without `await` | Both `fetch()` and `.json()` return Promises |
| POST/PUT missing Content-Type header | Add `headers: { "Content-Type": "application/json" }` |
| `response.ok` not checked | A 404 doesn't throw, you must check manually |
| Delete uses array index instead of id | The API uses `id` field, not array position |
| Data looks wrong after other students changed it | POST to `/reset` to restore original data |
| `async` function without `await` inside | The function runs synchronously if you forget `await` |
| PUT sent to wrong URL | Include the ID in the URL: `API_URL + "/" + id` |
| Body not stringified | Use `JSON.stringify(data)`, not the raw object |

---

## Submission

This lab is ungraded. No submission required.

---

## Resources

- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [MDN JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [HTTP Methods - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

---

## What's Next?

In **Lab 8: Next.js Web API**, you'll start building with **Next.js and React**. Your finance platform will move from plain HTML/CSS/JS to a component-based architecture with server-side rendering. Everything you've learned about DOM manipulation, events, and data fetching translates directly into React concepts.

---

**Author:** Abdulahi Hassen
