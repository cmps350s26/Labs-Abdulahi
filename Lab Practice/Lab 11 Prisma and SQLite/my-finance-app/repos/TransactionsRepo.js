import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "transactions.json");

class TransactionsRepo {
    async getAll() {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        const all = await this.getAll();
        return all.find(t => t.id === Number(id));
    }

    async create(data) {
        const all = await this.getAll();
        const newItem = {
            id: Math.max(...all.map(t => t.id), 0) + 1,
            description: data.description,
            amount: Number(data.amount),
            type: data.type,
            category: data.category,
            date: data.date || new Date().toISOString().split("T")[0]
        };
        all.push(newItem);
        await this.save(all);
        return newItem;
    }

    async update(id, data) {
        const all = await this.getAll();
        const index = all.findIndex(t => t.id === Number(id));
        if (index === -1) return null;
        all[index] = { ...all[index], ...data, id: Number(id) };
        await this.save(all);
        return all[index];
    }

    async delete(id) {
        const all = await this.getAll();
        const index = all.findIndex(t => t.id === Number(id));
        if (index === -1) return false;
        all.splice(index, 1);
        await this.save(all);
        return true;
    }

    async search(query) {
        const all = await this.getAll();
        const q = query.toLowerCase();
        return all.filter(t =>
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
        );
    }

    async getTotalByType(type) {
        const all = await this.getAll();
        return all.filter(t => t.type === type).reduce((sum, t) => sum + t.amount, 0);
    }

    async getBalance() {
        const income = await this.getTotalByType("income");
        const expense = await this.getTotalByType("expense");
        return income - expense;
    }
}

export default new TransactionsRepo();
