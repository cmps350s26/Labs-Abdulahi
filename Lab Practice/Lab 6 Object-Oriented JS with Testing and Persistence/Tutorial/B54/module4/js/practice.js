/* =================================
   Module 4: DOM, Events, and LocalStorage
   Open practice.html in browser
   ================================= */

// ---- Modules 1-2 (Solved): Classes, Methods, Inheritance ----

class Transaction {
    constructor(description, amount, type, category) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.category = category;
    }

    format() {
        const sign = this.type === "income" ? "+" : "-";
        return sign + this.amount.toLocaleString() + " QAR";
    }

    isExpense() { return this.type === "expense"; }
    isIncome() { return this.type === "income"; }
}

// ---- Sample Data for Exercise 1 ----

const sampleTransactions = [
    new Transaction("Salary", 12000, "income", "Salary"),
    new Transaction("Freelance", 3000, "income", "Salary"),
    new Transaction("Rent", 4500, "expense", "Housing"),
    new Transaction("Groceries", 850, "expense", "Food"),
    new Transaction("Electricity", 320, "expense", "Utilities"),
];

localStorage.setItem("transactions", JSON.stringify(sampleTransactions))


const readBack = JSON.parse(localStorage.getItem("transactions"))
console.log(readBack);

// get a reference to that element on the page
const transactionTable = document.querySelector("#transaction-table");
const transRows = sampleTransactions.map(t => toHTMLRow(t))
transactionTable.innerHTML = transRows.join('')

function toHTMLRow(t) {
    return `
            <tr>
                <td>${t.description}</td>
                <td> ${t.category} </td>
                <td class= ${t.isIncome() ? 'text-success' : 'text-danger'}> ${t.amount} </td>
            </tr>
 
        `
}
// ======================================================
// Module 4: DOM, Events, and LocalStorage
// This module reinforces what you started in Lab 5 Modules 4-5,
// now using your own classes to manage the data.
// ======================================================


// ---- Exercise 1: Render Class Instances to the DOM ----
// Select #transaction-table.
// Use sampleTransactions.map() to build table rows.
// Each row: description, category, formatted amount (with color class).
// Use the Transaction's format() method and isIncome()/isExpense() for styling.

// TODO: Render sampleTransactions into #transaction-table



// ---- Exercise 2: Form Events + Dynamic Rendering ----
// Create a liveTransactions array (starts empty).
//
// Write updateDashboard(): calculates income, expenses, balance from liveTransactions,
//   updates #total-income, #total-expenses, #balance with color.
//
// Write renderLiveTransactions(): maps liveTransactions to rows in #live-transaction-body.
//
// Add a submit listener on #transaction-form:
//   - preventDefault
//   - Read desc, amount, type from the form
//   - Create a new Transaction and push to liveTransactions
//   - Call updateDashboard() and renderLiveTransactions()
//   - Reset the form

// TODO: Create liveTransactions array


// TODO: Write updateDashboard()


// TODO: Write renderLiveTransactions()


// TODO: Add submit listener on #transaction-form



// ---- Exercise 3: LocalStorage Persistence ----
// Modify Exercise 2 so liveTransactions persists:
//   - On page load: read from localStorage key "module4-transactions" using JSON.parse
//     If nothing saved, start with []. Then call updateDashboard() and renderLiveTransactions().
//   - After every add: save the array to localStorage with JSON.stringify.
//
// Add click listener on #clear-btn:
//   - Clear localStorage, reset array, refresh display.
//
// Add click listener on #count-btn:
//   - Show how many transactions are saved in #storage-output.

// TODO: Load from localStorage on startup


// TODO: Save to localStorage after each add (modify your submit listener)


// TODO: Add clear button listener


// TODO: Add count button listener

