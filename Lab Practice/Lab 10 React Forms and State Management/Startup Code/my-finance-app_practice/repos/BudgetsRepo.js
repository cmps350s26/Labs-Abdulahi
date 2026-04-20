import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "budgets.json");

class BudgetsRepo {
    async getAll() {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    }

    async save(items) {
        await fs.writeFile(dataPath, JSON.stringify(items, null, 4));
    }

    async getById(id) {
        const all = await this.getAll();
        return all.find(b => b.id === Number(id));
    }

    async create(data) {
        const all = await this.getAll();
        const newItem = {
            id: Math.max(...all.map(b => b.id), 0) + 1,
            category: data.category,
            budgeted: Number(data.budgeted),
            spent: Number(data.spent || 0),
            month: data.month,
            year: Number(data.year)
        };
        all.push(newItem);
        await this.save(all);
        return newItem;
    }

    async update(id, data) {
        const all = await this.getAll();
        const index = all.findIndex(b => b.id === Number(id));
        if (index === -1) return null;
        all[index] = { ...all[index], ...data, id: Number(id) };
        await this.save(all);
        return all[index];
    }

    async delete(id) {
        const all = await this.getAll();
        const index = all.findIndex(b => b.id === Number(id));
        if (index === -1) return false;
        all.splice(index, 1);
        await this.save(all);
        return true;
    }
}

export default new BudgetsRepo();
