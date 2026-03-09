/* =================================
   Module 2: Async/Await
   Run with: node js/practice.js
   ================================= */

// ---- Module 1 (Solved): JSON and Data Transformation ----
// (Module 1 skills are used here but don't need code carried forward)


// ======================================================
// Module 2: Async/Await
//
// Some operations take time: loading files, fetching data, timers.
// JavaScript handles these with Promises - objects that represent
// a value arriving later. You consume Promises using async/await.
//
// async makes a function return a Promise.
// await pauses execution until the Promise resolves.
// try/catch handles errors from rejected Promises.
// ======================================================


// ---- Provided: These functions simulate slow operations ----
// They return Promises. You don't need to understand how they work yet.
// Your job is to CALL them using async/await.

function loadTransactions(shouldSucceed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve([
                    { description: "Salary", amount: 8000, type: "income" },
                    { description: "Rent", amount: 4000, type: "expense" },
                    { description: "Food", amount: 650, type: "expense" },
                ]);
            } else {
                reject(new Error("Failed to load data"));
            }
        }, 1000);
    });
}

function simulateApiCall(name, ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(name), ms);
    });
}


// ---- Exercise 1: Basic Async/Await ----
// Create an async function called displayTransactions() that:
//   1. Logs "Loading..."
//   2. Awaits loadTransactions(true) and stores the result
//   3. Logs each transaction: "  Salary: 8,000 QAR" (use description and amount)
//   4. Logs "Done! Loaded X transactions" where X is the array length
//
// Then call displayTransactions() at the bottom.

// TODO: Write async function displayTransactions()

async function displayTransactions() {
    try {
        const result = await loadTransactions(true); // make it seq
        console.log(result);
    } catch (e) {
        // handle the error
    }
}
displayTransactions();  // I promise to do it, 

console.log("The rest of my website is not blocked by the above code , because I could display this");

// TODO: Call displayTransactions()



// ---- Exercise 2: Error Handling with try/catch ----
// Create an async function called loadWithErrorHandling() that:
//   1. Uses try/catch
//   2. In try: awaits loadTransactions(false) - this WILL fail
//   3. In catch: logs "Error caught: <error message>"
//
// Without try/catch, a rejected Promise crashes your program.
// try/catch lets you handle failures gracefully - same idea as Java's try/catch.

// TODO: Write async function loadWithErrorHandling()



// TODO: Call loadWithErrorHandling()



// ---- Exercise 3: Sequential vs Parallel with Promise.all ----
// Write two async functions that each call simulateApiCall 3 times:
//   simulateApiCall("accounts", 1000)
//   simulateApiCall("transactions", 1000)
//   simulateApiCall("goals", 1000)
//
// runSequential():
//   Await each call one after another.
//   Time it with console.time("Sequential") and console.timeEnd("Sequential")
//
// runParallel():
//   Use Promise.all([...]) to run all 3 at the same time.
//   Destructure the result: const [a, b, c] = await Promise.all([...])
//   Time it the same way.
//
// Sequential should take ~3 seconds, parallel should take ~1 second.

// TODO: Write async function runSequential()



// TODO: Write async function runParallel()



// TODO: Call both using an async wrapper so they don't overlap
// Wrap in an async function, await runSequential(), then await runParallel()
