/* =================================
   Module 2: Inheritance
   Run with: node js/practice.js
   ================================= */

// ---- Module 1 (Solved): Classes, Constructors, Methods ----

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

    addSpending(amount) { this.spent += amount; }
    getRemaining() { return this.budgeted - this.spent; }
    isOverBudget() { return this.spent > this.budgeted; }
    toString() { return `${this.name}: ${this.spent.toLocaleString()} / ${this.budgeted.toLocaleString()} QAR`; }
}



// ======================================================
// Module 2: Inheritance
// A child class extends a parent to inherit its properties and methods.
// Same as Java: class Child extends Parent { ... }
// Call super() in the constructor to run the parent's constructor first.
// ======================================================


// ---- Exercise 1: SavingsAccount extends Account ----
// Create a SavingsAccount that extends Account.
// Constructor takes: name, balance, profitRate (e.g., 0.05 for 5%)
// Call super() with name, "savings", and balance.
// Then set this.profitRate.
//
// Add a method: applyProfit() - adds (balance * profitRate) to the balance,
// logs the profit earned.

// TODO: Define SavingsAccount class
class SavingsAccount extends Account {

    constructor(name, balance, profitRate) {
        super(name, "savings", balance); //the first statement
        this.profitRate = profitRate;
    }
    applyProfit() {
        this.balance += this.balance * this.profitRate;
    }
}


// Test:
const savings = new SavingsAccount("Emergency Fund", 20000, 0.04);
console.log("Type:", savings.type);           // savings
console.log("Balance:", savings.getBalance()); // 20,000 QAR
savings.applyProfit();                         // Profit earned: 800 QAR
console.log("After profit:", savings.getBalance());


// ---- Exercise 2: RecurringTransaction extends Transaction ----
// Extends Transaction with an extra property: frequency ("monthly", "weekly", etc.)
// Call super() for the Transaction fields, then set this.frequency.
//
// Override format() to append the frequency: "+8,000 QAR (monthly)"
// Use super.format() to get the base string, then add to it.

// TODO: Define RecurringTransaction class
class RecurringTransaction extends Transaction {
    constructor(description, amount, type, category, frequency) {
        super(description, amount, type, category);
        this.frequency = frequency;
    }
    format() {
        return `${super.format()} ${this.frequency} QAR`;
    }
}



// Test:
const salary = new RecurringTransaction("Salary", 8000, "income", "Salary", "monthly");
const netflix = new RecurringTransaction("Netflix", 45, "expense", "Entertainment", "monthly");

console.log(salary.format());     // +8,000 QAR (monthly)
console.log(netflix.format());    // -45 QAR (monthly)

console.log("Is expense?", netflix.isExpense()); // true (inherited)


// ---- Exercise 3: instanceof and Type Checking ----
// Create one of each type and test with instanceof.
// Inheritance means: a SavingsAccount IS an Account, a RecurringTransaction IS a Transaction.

// TODO: Create instances and test with instanceof

// Expected:
// salary instanceof Transaction -> true
// salary instanceof RecurringTransaction -> true
// savings instanceof Account -> true
// savings instanceof SavingsAccount -> true
// new Transaction("x", 1, "income", "y") instanceof RecurringTransaction -> false
console.log("salary instanceof Transaction:", salary instanceof Transaction);
console.log("salary instanceof RecurringTransaction:", salary instanceof RecurringTransaction);
console.log("savings instanceof Account:", savings instanceof Account);
console.log("savings instanceof SavingsAccount:", savings instanceof SavingsAccount);

// super class object is an instance of the subclass? 
// No, because the super class does not have the properties and methods of the subclass. 
// The subclass is a more specific type of the super class, but not vice versa.

const t = new Transaction("x", 1, "income", "y") instanceof RecurringTransaction
console.log("new Transaction instanceof RecurringTransaction:", t instanceof RecurringTransaction); //false
