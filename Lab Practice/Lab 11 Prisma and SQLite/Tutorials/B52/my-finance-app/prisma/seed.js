import { PrismaClient } from "@prisma/client";
import { promises as fs } from "fs";
import path from "path";

const prisma = new PrismaClient();

async function readJson(name) {
    const file = path.join(process.cwd(), "data", name);
    return JSON.parse(await fs.readFile(file, "utf-8"));
}

async function seed(name, model, items) {
    try {
        const existing = await model.findMany();
        if (existing.length > 0) {
            console.log(`Skipped ${name} - already has ${existing.length} rows`);
            return;
        }
        for (const item of items) {
            await model.create({ data: item });
        }
        console.log(`Seeded ${items.length} ${name}`);
    } catch (e) {
        if (e.code === "P2021" || /does not exist|no such table/i.test(e.message)) {
            console.log(`Skipped ${name} - table not in schema yet`);
        } else throw e;
    }
}

async function main() {
    await seed("accounts", prisma.account, await readJson("accounts.json"));
    await seed("transactions", prisma.transaction, await readJson("transactions.json"));
    await seed("budgets", prisma.budget, await readJson("budgets.json"));
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
