/* =================================
   Module 4: CRUD Operations
   Open practice.html with Live Server
   API: https://myfinance-api-bay.vercel.app
   ================================= */

const API_URL = "https://myfinance-api-bay.vercel.app/transactions";


// ---- Provided: Load and display all transactions ----
// This function is already done. Each row has Edit and Delete buttons
// that call startEdit(id) and deleteTransaction(id).

async function loadTransactions() {
    const tbody = document.getElementById("transaction-body");
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="empty-message">No transactions</td></tr>`;
            return;
        }

        tbody.innerHTML = data.map(t => `
            <tr>
                <td>${t.id}</td>
                <td>${t.description}</td>
                <td class="${t.type === "income" ? "text-success" : "text-danger"}">
                    ${t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()} QAR
                </td>
                <td>${t.type}</td>
                <td>${t.category}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="startEdit(${t.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${t.id})">Delete</button>
                </td>
            </tr>
        `).join("");
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-message">Error: ${err.message}</td></tr>`;
    }
}

document.getElementById("refresh-btn").addEventListener("click", loadTransactions);
loadTransactions();


// ---- Exercise 1: POST - Add a new transaction ----
// Add a submit listener on #add-form that:
//   1. Calls preventDefault()
//   2. Reads description, amount, type, category from the form
//   3. Uses fetch() with:
//      - method: "POST"
//      - headers: { "Content-Type": "application/json" }
//      - body: JSON.stringify({ description, amount, type, category })
//   4. Parses the response with .json() to get the created transaction
//   5. Shows "Created: <description> (ID: <id>)" in #add-status
//   6. Calls loadTransactions() to refresh the table
//   7. Resets the form with e.target.reset()
//   8. Wraps everything in try/catch

// TODO: Add submit listener on #add-form



// ---- Exercise 2: PUT - Update a transaction ----
// The Edit buttons in the table call startEdit(id). Write these functions:
//
// startEdit(id):
//   1. Fetch the transaction: GET API_URL + "/" + id
//   2. Parse the response as JSON
//   3. Populate the edit form fields:
//      - #edit-id (hidden) = t.id
//      - #edit-desc = t.description
//      - #edit-amount = t.amount
//      - #edit-type = t.type
//      - #edit-category = t.category
//   4. Hide #edit-hint, show #cancel-edit-btn
//   5. Show "Editing transaction <id>: <description>" in #edit-status
//   6. Wrap in try/catch
//
// cancelEdit():
//   1. Reset #edit-form, clear #edit-id value
//   2. Hide #cancel-edit-btn, show #edit-hint
//   3. Clear #edit-status
//
// Add click listener on #cancel-edit-btn to call cancelEdit()
//
// Add submit listener on #edit-form:
//   1. preventDefault()
//   2. Read id from #edit-id - if empty, show error "Click Edit on a row first"
//   3. Read description, amount, type, category from the form
//   4. fetch() with method: "PUT", headers, body (same as POST but URL includes /id)
//   5. Check response.ok - if false, throw error
//   6. Show "Updated transaction <id>" in #edit-status
//   7. Call cancelEdit() and loadTransactions()
//   8. Wrap in try/catch

// TODO: Write startEdit(id)


// TODO: Write cancelEdit()


// TODO: Add click listener on #cancel-edit-btn


// TODO: Add submit listener on #edit-form



// ---- Exercise 3: DELETE - Remove a transaction ----
// The Delete buttons in the table call deleteTransaction(id). Write:
//
// deleteTransaction(id):
//   1. Uses fetch() with URL: API_URL + "/" + id, method: "DELETE"
//   2. Shows "Deleted transaction <id>" in #delete-status
//   3. Calls loadTransactions() to refresh the table
//   4. Wraps in try/catch

// TODO: Write deleteTransaction(id)
