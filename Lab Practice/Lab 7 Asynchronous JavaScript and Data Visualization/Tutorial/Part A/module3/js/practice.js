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

// const loadBtn = document.getElementById("load-btn")
const BASE_URL = "https://myfinance-api-bay.vercel.app/transactions"


const loadBtn = document.querySelector("#load-btn")
const statusText = document.querySelector("#status")
const transactionBody = document.querySelector("#transaction-body")


// React to the user event and will call the loadTransaction function
loadBtn.addEventListener('click', loadTransactions)

async function loadTransactions() {

   statusText.textContent = "Loading Data ....."

   const response = await fetch(BASE_URL);
   const transactions = await response.json()

   transactionBody.innerHTML = transactions
      .map(t => transToHTMLRow(t))
      .join('')

   statusText.textContent = "Done Loading Data ....."
}

function transToHTMLRow(t) {
   const amountClass = t.type == "expense" ? "text-danger" : "text-success"
   return `
      <tr>
         <td> ${t.description} </td>
         <td> ${t.category} </td>
         <td> ${t.type} </td>
         <td class= ${amountClass}> ${t.amount} </td>
         <td> 
            <button onclick= "yourOwn('Editing transaction: ${t.description}')" class="btn btn-secondary"> Edit</button>
            <button class="btn btn-danger"> Delete</button>
         </td>
        
      </tr>
   `
}

function yourOwn(message) {
   alert(message)
}
// ---- Exercise 2: Fetch, Transform, and Summarize ----
// When #summary-btn is clicked:
//   1. Fetch https://myfinance-api-bay.vercel.app/transactions
//   2. Calculate: total income, total expenses, balance, transaction count
//   3. Display as 4 cards in #summary-cards (use dashboard-grid layout)
//   4. Color the balance card green if positive, red if negative

// TODO: Add click listener on #summary-btn
const summaryBtn = document.querySelector("#summary-btn")
const summaryCards = document.querySelector("#summary-cards")


summaryBtn.addEventListener('click', displaySummaryCards)

async function displaySummaryCards() {
   // alert('hi')
   const response = await fetch(BASE_URL);
   const transactions = await response.json()
   // console.log(transactions);

   const income = transactions
      .filter(t => t.type === "income")
      .reduce((total, t) => total + t.amount, 0)

   const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((total, t) => total + t.amount, 0)

   const balance = income - expenses

   console.log(income);

   console.log(summaryCards);

   summaryCards.innerHTML = `
      <div class="card card--success"> 
         <h3>Total Income</h3>
         <p class="amount">${income.toLocaleString()}</p>
      </div>
      <div class="card card--danger"> 
         <h3>Total Expenses</h3>
         <p class="amount">${expenses.toLocaleString()}</p>
      </div>
      <div class="card card--success"> 
         <h3>Balance</h3>
         <p class="amount">${balance.toLocaleString()}</p>
      </div>
   `

}
