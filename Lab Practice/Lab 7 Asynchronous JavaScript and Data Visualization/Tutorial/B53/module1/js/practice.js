/* =================================
   Module 1: JSON and Data Transformation
   Run with: node js/practice.js
   ================================= */

// JSON is the standard format for exchanging data on the web.
// It looks like JS objects/arrays, but it's plain text.
// Two key functions: JSON.stringify() and JSON.parse().


// ---- Exercise 1: JSON.stringify and JSON.parse ----
// a) Create a transaction object with description, amount, type, category.
// b) Convert it to a JSON string with JSON.stringify() and log it.
// c) Parse it back with JSON.parse() and log the amount property.
// d) Try pretty-printing: JSON.stringify(obj, null, 2)

// TODO: Create an object, stringify, parse, and log
const transaction = {
    description: "Salary",
    amount: 8000,
    type: "income",
    category: "Salary"
};

const json = JSON.stringify(transaction)
console.log(json);

const original = JSON.parse(json)
console.log(original);



// ---- Exercise 2: Transforming Arrays with map/filter/reduce ----
// Use the transactions array below to:
// a) Get an array of just the descriptions (map)
// b) Get the total of all expenses (filter + reduce)
// c) Get formatted strings like "Salary: +8,000 QAR" (map)
// d) Find the single largest expense (filter expenses, then reduce)

const transactions = [
    { description: "Salary", amount: 8000, type: "income", category: "Salary" },
    { description: "Freelance", amount: 2500, type: "income", category: "Salary" },
    { description: "Rent", amount: 4000, type: "expense", category: "Housing" },
    { description: "Groceries", amount: 650, type: "expense", category: "Food" },
    { description: "Electricity", amount: 280, type: "expense", category: "Utilities" },
    { description: "Dining Out", amount: 350, type: "expense", category: "Food" },
    { description: "Netflix", amount: 45, type: "expense", category: "Entertainment" },
    { description: "Gym", amount: 200, type: "expense", category: "Entertainment" },
];

// TODO: a) Extract just the descriptions into a new array and log it
//   Expected: ["Salary", "Freelance", "Rent", "Groceries", ...]

//  transformation A - +A
const descriptions = transactions.map(t => t.description)
const htmlRows = transactions.map(t => `<tr>
            <td>${t.description} </td>
            <td>${t.amount} </td>
            <td>${t.category} </td>
        </tr>`).join('')
console.log(descriptions);


// TODO: b) Calculate the total amount of all expenses and log it
//  { description: "Electricity", amount: 280, type: "expense", category: "Utilities" },
//  { description: "Internet", amount: 666, type: "expense", category: "Utilities" },
//  { description: "Internet", amount: 666, type: "expense", category: "Utilities" },

// const all = transactions
//     .filter(t => t.type === "expense")
//     .reduce((total, curr) => total + curr, 0)

const totAmount = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
// TODO: c) Create an array where each transaction becomes a string like "Salary: +8,000 QAR"
//   Use + for income, - for expenses. Use toLocaleString() for comma formatting.
//   Log the array.


// TODO: d) Find which single expense has the highest amount. Log its description and amount.

const highestExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((highest, curr) => highest.amount > curr.amount ? highest : curr)

console.log(`The highest expense was ${highestExpense.description} with amount ${highestExpense.amount}`);


// ---- Exercise 3: Grouping Data by Category ----
// Group transactions by category, totaling each.
// Result: { Salary: 10500, Housing: 4000, Food: 1000, ... }
//
// Hint: reduce with an accumulator object. For each transaction,
// add its amount to the existing category total (or start at 0).
// Then log results using Object.entries().

// TODO: Group by category using reduce


// TODO: Log each category with Object.entries().forEach()

