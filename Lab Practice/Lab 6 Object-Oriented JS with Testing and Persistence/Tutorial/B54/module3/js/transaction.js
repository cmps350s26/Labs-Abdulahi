/* =================================
   Transaction and Account Classes
   These are the classes you built in Modules 1-2.
   Module 3 is about TESTING them, not writing them.
   ================================= */

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
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount > this.balance) return false;
        this.balance -= amount;
        return true;
    }

    getBalance() {
        return this.balance.toLocaleString() + " QAR";
    }
}

class SavingsAccount extends Account {
    constructor(name, balance, profitRate) {
        super(name, "savings", balance);
        this.profitRate = profitRate;
    }

    applyProfit() {
        const profit = this.balance * this.profitRate;
        this.balance += profit;
        return profit;
    }
}

export { Transaction, Account, SavingsAccount };
