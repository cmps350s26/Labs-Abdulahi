/* =================================
   Module 3: Fetch API
   Open practice.html with Live Server
   ================================= */

// ---- Modules 1-2 (Solved): JSON, Promises, Async/Await ----
// Those skills run in the terminal. Now we bring them to the browser.
//
// fetch() returns a Promise. You await the response, then await .json()
// to parse the body. It's a two-step process:
//   const response = await fetch("https://myfinance-api-bay.vercel.app/transactions");
//   const data = await response.json();
//
// IMPORTANT: fetch only works over HTTP, not file://
// Use VS Code Live Server (right-click -> Open with Live Server).


// ---- Exercise 1: Fetch and Display ----
// When #load-btn is clicked:
//   1. Show "Loading..." in #status
//   2. Fetch https://myfinance-api-bay.vercel.app/transactions
//   3. Parse the JSON response
//   4. Render transactions as table rows in #transaction-body
//   5. Update #status to show how many transactions were loaded
//
// Use an async function for the click handler.

// TODO: Add click listener on #load-btn that fetches and displays data
// which elements in my html am i interacting with [reference]
const BASE_URL = "https://myfinance-api-bay.vercel.app/transactions";

const loadBtn = document.querySelector("#load-btn")
const statusText = document.querySelector("#status")
const tbody = document.querySelector("#transaction-body")

// add event listener [form - submit , button -> click , dropdown/input -> change]
loadBtn.addEventListener('click', loadTransactions)

// network call
async function loadTransactions() {
   try {
      statusText.textContent = "Loading..."

      const response = await fetch(BASE_URL);
      const transactions = await response.json();

      // transformation [we want to convert this array into table rows]
      tbody.innerHTML = transactions.map(t => toHtmlRow(t)).join('')

      statusText.textContent = `Loaded ${transactions.length} Transactions...`
   } catch (error) {
      console.error("Error loading transactions:", error);
   }
}

function toHtmlRow(t) {
   return `
      <tr>
         <td>${t.description}</td>
         <td>${t.category}</td>
         <td>${t.type}</td>
         <td>${t.amount}</td>
      </tr>
   `
}
// ---- Exercise 2: Fetch, Transform, and Summarize ----
// When #summary-btn is clicked:
//   1. Fetch https://myfinance-api-bay.vercel.app/transactions
//   2. Calculate: total income, total expenses, balance, transaction count
//   3. Display as 4 cards in #summary-cards (use dashboard-grid layout)
//   4. Color the balance card green if positive, red if negative

// TODO: Add click listener on #summary-btn

