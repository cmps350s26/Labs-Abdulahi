/* =================================
   Module 1: JSON and Data Transformation
   Run with: node js/practice.js
   ================================= */

// JSON is the standard format for exchanging data on the web.
// It looks like JS objects/arrays, but it's plain text.
// Two key functions: JSON.stringify() and JSON.parse().
const transaction = {
    description: "Salary",
    amount: 12000,
    type: "income",
    category: "Salary"
};

// send to a server [text format] POST, PUT methods
const jsonString = JSON.stringify(transaction)

console.log(jsonString);
// console.log(jsonString.name);

// GET METHOD
const originalObject = JSON.parse(jsonString)
console.log(originalObject.amount);
console.log(transaction);

console.log(transaction);
console.log(Object.entries(transaction));

const [a, b, ...c] = [1, 2, 3, 4, 6, 7, 7]
console.log(a);
console.log(b);
console.log(c);

const person = {
    name: "ali",
    age: 22,
    gender: "male"
}

// const name =  person.name;
// const age = person.age;




const { gender } = person

// console.log(name, age);


Object.entries(transaction).forEach(([key, value]) => console.log(key, value));

// retrieve from a server

// ---- Exercise 1: JSON.stringify and JSON.parse ----
// a) Create a transaction object with description, amount, type, category.
// b) Convert it to a JSON string with JSON.stringify() and log it.
// c) Parse it back with JSON.parse() and log the amount property.
// d) Try pretty-printing: JSON.stringify(obj, null, 2)

// TODO: Create an object, stringify, parse, and log



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
const descriptions = transactions.map(t => t.description)
console.log(descriptions);

// TODO: b) Calculate the total amount of all expenses and log it
const total = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0)


console.log(`Total expense is ${total}`);


// TODO: c) Create an array where each transaction becomes a string like "Salary: +8,000 QAR"
//   Use + for income, - for expenses. Use toLocaleString() for comma formatting.
//   Log the array.

const ttoHTMLTable = transactions.map(t => t.amount).join(' ')

// transformation t => ~t [map]
// filtering [filtering the female , male , >2 n%==2]
// find [one element] list.find(a => a.name == "ali")
// aggregating [reducing] total, sum , reduce

console.log(ttoHTMLTable);

const formatted = transactions.map(t => {
    const sign = t.type === "income" ? "+" : "-";
    return `${t.description}: ${sign}${t.amount.toLocaleString()} QAR`
})

// TODO: d) Find which single expense has the highest amount. Log its description and amount.



// ---- Exercise 3: Grouping Data by Category ----
// Group transactions by category, totaling each.
// Result: { Salary: 10500, Housing: 4000, Food: 1000, ... }
//
// Hint: reduce with an accumulator object. For each transaction,
// add its amount to the existing category total (or start at 0).
// Then log results using Object.entries().

// TODO: Group by category using reduce


// TODO: Log each category with Object.entries().forEach()

