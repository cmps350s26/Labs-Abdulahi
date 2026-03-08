/* =================================
   MyFinance Transaction Manager
   Lab 7 - Part B
   API: https://myfinance-api-bay.vercel.app
   ================================= */

const API_URL = "https://myfinance-api-bay.vercel.app/transactions";

// In-memory array of transactions loaded from the API
let transactions = [];

// Track whether we're in "edit" mode
let editingId = null;


// ---- Task 1: loadTransactions() ----
// Create an async function that:
//   1. Fetches all transactions from the API (GET request to API_URL)
//   2. Stores the response in the transactions array
//   3. Calls refreshAll() to update the page
//   4. Wraps in try/catch, log errors to console

// TODO: Write async function loadTransactions()



// ---- Task 2: updateSummary() ----
// Calculate totals from the transactions array and update the summary cards.
//   - Use filter + reduce to calculate totalIncome and totalExpenses
//   - Calculate balance (income minus expenses)
//   - Update #total-income, #total-expenses, #total-balance
//   - Format: amount.toLocaleString() + " QAR"
//   - Color #total-balance green (text-success) if >= 0, red (text-danger) if negative

// TODO: Write function updateSummary()



// ---- Task 3: renderTransactions() ----
// Display the filtered transaction list in #transaction-body.
//   - Call getFilteredTransactions() to get the filtered array
//   - For each transaction, create a table row with:
//     description, category, type, formatted amount, Edit button, Delete button
//   - Edit button calls startEdit(id)
//   - Delete button calls deleteTransaction(id)
//   - Color income green, expenses red
//   - Show "No transactions found" if the filtered array is empty

// TODO: Write function renderTransactions()



// ---- Task 4: addTransaction(data) ----
// Create an async function that POSTs a new transaction to the API.
//   1. fetch(API_URL, { method: "POST", headers, body: JSON.stringify(data) })
//   2. Parse response to get the created transaction (server assigns the id)
//   3. Push it to the transactions array
//   4. Call refreshAll()
//   5. Wrap in try/catch

// TODO: Write async function addTransaction(data)



// ---- Task 5: updateTransaction(id, data) ----
// Create an async function that PUTs updated data to the API.
//   1. fetch(API_URL + "/" + id, { method: "PUT", headers, body: JSON.stringify(data) })
//   2. Parse response to get the updated transaction
//   3. Find and replace the old transaction in the array
//   4. Call refreshAll()
//   5. Wrap in try/catch

// TODO: Write async function updateTransaction(id, data)



// ---- Task 6: deleteTransaction(id) ----
// Create an async function that DELETEs a transaction from the API.
//   1. fetch(API_URL + "/" + id, { method: "DELETE" })
//   2. Remove from the local array: transactions = transactions.filter(t => t.id !== id)
//   3. Call refreshAll()
//   4. Wrap in try/catch

// TODO: Write async function deleteTransaction(id)



// ---- Task 7: Search and Filter ----
// Write getFilteredTransactions() that returns the transactions array filtered by:
//   - #search input (case-insensitive match on description)
//   - #filter-type dropdown ("all", "income", "expense")
//
// Add event listeners:
//   #search: "input" event -> renderTransactions()
//   #filter-type: "change" event -> renderTransactions()

// TODO: Write function getFilteredTransactions()



// TODO: Add event listeners for search and filter



// ---- Task 8: Form handling and Edit mode ----
// Form submit on #transaction-form:
//   - preventDefault()
//   - Read description, amount, type, category from the form
//   - If editingId is not null: call updateTransaction(editingId, data), then cancelEdit()
//   - If editingId is null: call addTransaction(data)
//   - Reset the form
//
// startEdit(id): find the transaction, populate form fields, show Cancel button,
//   change submit button text to "Update Transaction", set editingId
//
// cancelEdit(): reset form, hide Cancel button, change button text back,
//   set editingId to null

// TODO: Write function startEdit(id)



// TODO: Write function cancelEdit()



// TODO: Add form submit listener on #transaction-form



// ---- Helpers ----

function refreshAll() {
    updateSummary();
    renderTransactions();
}

// TODO: Call loadTransactions() to initialize on page load
