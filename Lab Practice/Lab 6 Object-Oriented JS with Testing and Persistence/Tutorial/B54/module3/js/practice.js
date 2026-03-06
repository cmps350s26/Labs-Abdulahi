/* =================================
   Module 3: Inheritance
   Run with: node js/practice.js
   ================================= */

// ---- Modules 1-2 (Solved): Classes, Constructors, Methods ----

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

    isExpense() {
        return this.type === "expense";
    }

    isIncome() {
        return this.type === "income";
    }
}

class Account {
    constructor(name, type, balance) {
        this.name = name;
        this.type = type;
        this.balance = balance;
        this.createdAt = new Date().toLocaleDateString();
    }

    deposit(amount) {
        this.balance += amount;
        console.log(`Deposited ${amount.toLocaleString()} QAR`);
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
            return;
        }
        this.balance -= amount;
        console.log(`Withdrew ${amount.toLocaleString()} QAR`);
    }

    getBalance() {
        return this.balance.toLocaleString() + " QAR";
    }
}

class BudgetCategory {
    constructor(name, budgeted, spent = 0) {
        this.name = name;
        this.budgeted = budgeted < 0 ? 0 : budgeted;
        this.spent = spent;
    }

    addSpending(amount) {
        this.spent += amount;
    }

    getRemaining() {
        return this.budgeted - this.spent;
    }

    isOverBudget() {
        return this.spent > this.budgeted;
    }

    toString() {
        return `${this.name}: ${this.spent.toLocaleString()} / ${this.budgeted.toLocaleString()} QAR`;
    }
}


// ======================================================
// Module 3: Inheritance
// A child class can extend a parent class to inherit its properties and methods.
// Same as Java: class Child extends Parent { ... }
// Use super() to call the parent constructor.
// ======================================================


// ---- Exercise 1: SavingsAccount extends Account ----
// Create a SavingsAccount class that extends Account.
// The constructor takes: name, balance, profitRate (e.g., 0.05 for 5%)
// It should call super() with name, "savings", and balance.
// Then set this.profitRate = profitRate
//
// Add a method: applyProfit() that adds (balance * profitRate) to the balance
// and logs the profit earned.

// TODO: Define SavingsAccount class here



// Test:
const savings = new SavingsAccount("Emergency Fund", 20000, 0.04);
console.log("Type:", savings.type);
console.log("Balance:", savings.getBalance());
savings.applyProfit();
console.log("After profit:", savings.getBalance());


// ---- Exercise 2: RecurringTransaction extends Transaction ----
// Create a RecurringTransaction class that extends Transaction.
// Extra constructor parameter: frequency ("monthly", "weekly", etc.)
// Call super() for the Transaction fields, then set this.frequency.
//
// Override format() to append the frequency: "+8,000 QAR (monthly)"

// TODO: Define RecurringTransaction class here



// Test:
const salary = new RecurringTransaction("Salary", 8000, "income", "Salary", "monthly");
const netflix = new RecurringTransaction("Netflix", 45, "expense", "Entertainment", "monthly");
console.log(salary.format());
console.log(netflix.format());
console.log("Is expense?", netflix.isExpense());


// ---- Exercise 3: instanceof and Type Checking ----
// Create one of each: Transaction, RecurringTransaction, Account, SavingsAccount
// Then use instanceof to check their types.
// A RecurringTransaction is also a Transaction (inheritance).
// A SavingsAccount is also an Account.

// TODO: Create one of each and test with instanceof

// Expected output:
// "salary instanceof Transaction: true"
// "salary instanceof RecurringTransaction: true"
// "savings instanceof Account: true"
// "savings instanceof SavingsAccount: true"
// "regular instanceof RecurringTransaction: false"

