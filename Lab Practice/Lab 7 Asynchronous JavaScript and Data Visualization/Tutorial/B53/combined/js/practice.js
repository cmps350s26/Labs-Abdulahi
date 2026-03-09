/* =================================
   Lab 7: Async JS - All Modules Combined
   Open practice.html with Live Server
   ================================= */

// Modules 1-2 run in terminal. The exercises below cover Modules 3-4.

// ======================================================
// MODULE 3: Fetch API
// ======================================================

// TODO: Add click listener on #m3-load-btn
//   - Fetch https://myfinance-api-bay.vercel.app/transactions
//   - Show loading status in #m3-status
//   - Render transactions in #m3-transaction-body
//   - Show count when done



// ======================================================
// MODULE 4: CRUD Operations (POST, PUT, DELETE)
// ======================================================

const M4_API_URL = "https://myfinance-api-bay.vercel.app/transactions";

// ---- Provided: Load and display transactions ----

async function m4LoadTransactions() {
    const tbody = document.getElementById("m4-transaction-body");
    try {
        const response = await fetch(M4_API_URL);
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
                    <button class="btn btn-sm btn-primary" onclick="m4StartEdit(${t.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="m4DeleteTransaction(${t.id})">Delete</button>
                </td>
            </tr>
        `).join("");
    } catch (err) {
        tbody.innerHTML = `<tr><td colspan="6" class="empty-message">Error: ${err.message}</td></tr>`;
    }
}

document.getElementById("m4-refresh-btn").addEventListener("click", m4LoadTransactions);
m4LoadTransactions();


// TODO: Exercise 1 - Add submit listener on #m4-add-form
//   POST to M4_API_URL, show result in #m4-add-status, refresh table



// TODO: Exercise 2 - Write m4StartEdit(id), m4CancelEdit(), and submit listener on #m4-edit-form
//   m4StartEdit: GET M4_API_URL/id, populate form, hide hint, show Cancel
//   m4CancelEdit: reset form, show hint, hide Cancel
//   Submit: PUT to M4_API_URL/id, show status, cancelEdit, refresh table



// TODO: Exercise 3 - Write m4DeleteTransaction(id)
//   DELETE M4_API_URL/id, show result in #m4-delete-status, refresh table
