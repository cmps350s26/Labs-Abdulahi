<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 11: Prisma ORM and SQLite

# Replacing JSON File Storage with a Real Database

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 11 of 11
**Prerequisites:** Lab 10 completed, Node.js v18+

---

## Overview

Until now, your finance app has stored everything in JSON files. Open `data/transactions.json` and you can see them sitting there. That works for a course project, but it falls apart in production: no concurrent writes, no queries, no relationships, no migrations when the schema changes.

This lab swaps the JSON files for **SQLite** (a real relational database) using **Prisma** (an ORM that gives you a typed JavaScript API for your tables). The good news: only ONE file changes per resource. Your components, server actions, pages, and API routes don't move a single line. They call `transactionsRepo.getAll()` exactly like before. Internally, that call now hits SQLite instead of `fs.readFile`.

Here's what the swap looks like:

```js
// repos/TransactionsRepo.js - BEFORE (Lab 10)
async getAll() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
}

// repos/TransactionsRepo.js - AFTER (this lab)
async getAll() {
    return prisma.transaction.findMany({ orderBy: { id: "asc" } });
}
```

That's it. Same method name, same return shape, completely different storage backend.

### What You'll Build

- A `prisma/schema.prisma` file describing your `Account`, `Transaction`, and `Budget` tables
- A SQLite database created and migrated by Prisma
- A `TransactionsRepo` that uses `@prisma/client` instead of `fs`
- A new `Account` model that owns Transactions and Budgets - a real one-to-many relationship - without touching any UI code
- A new read-only `/api/accounts` endpoint that returns each account with its nested transactions (and budgets in Part B), demonstrating Prisma's `include`
- (Part B) The same migration applied to `BudgetsRepo` on your own, plus extending the Account relation to Budgets

### Lab Structure

You work on **a single project** (`Startup Code/my-finance-app`) for the entire lab.

**Part A: Guided Practice - Migrate TransactionsRepo + Add Relations (60 minutes)**
Instructor walks you through the 5-step migration. You apply each step to your project.

**Part B: Independent Project - Migrate BudgetsRepo + Extend Relations (60 minutes)**
Without instructor guidance, apply the same pattern to `BudgetsRepo` and extend the Account relation to Budgets.

---

## Learning Objectives

By the end of this lab, you will be able to:

- Install Prisma and `@prisma/client` in a Next.js project
- Define a model in `schema.prisma` (fields, types, defaults, primary keys)
- Run `prisma migrate dev` to generate and apply a SQL migration
- Run a seed script to populate the database from existing JSON data
- Inspect the database with Prisma Studio
- Replace `fs`-based repo methods with Prisma client calls (`findMany`, `findUnique`, `create`, `update`, `delete`)
- Add a second model and run a follow-up migration without losing data
- Define a one-to-many relation in Prisma (`@relation`, foreign keys, back-references)
- Use `include` to load related rows in a single query
- Build a Next.js API route that returns nested data (account → transactions → ...)

---

## Prerequisites

- Lab 10 completed (server actions, forms, the working finance app)
- Node.js v18+ installed
- Text editor and browser
- **Prisma 6.x** (not 7) - you'll install it in Module 1 with an explicit `@^6` pin. Prisma 7 changed schema syntax in breaking ways; this lab is built and tested against v6.

---

## Getting Started

### 1. Open the Project

1. Navigate to `Startup Code/my-finance-app`
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000` in your browser

This is the **complete Lab 10 finance app**. Everything works: list transactions, add, edit, delete. Try it. Notice that mutations still write to `data/transactions.json` - open the file and watch it change as you add a transaction.

Keep the dev server running. You'll come back to the browser at the end of each module to verify nothing broke.

### 2. What's Already Provided

The starter is your complete Lab 10 work. The only Lab 11 additions are:

- **`data/seed.js`** - a seed script that copies `data/transactions.json` and `data/budgets.json` into the database. You'll move it to `prisma/seed.js` in Module 2 (after `prisma init` creates the `prisma/` folder). It's tolerant: if a table doesn't exist yet (e.g., before you add the Budget model in Part B), it logs a "skipped" message instead of crashing. You don't write this; you just run it.
- **`.env`** - contains `DATABASE_URL="file:./dev.db"` so Prisma knows where to put the SQLite file.
- **`.gitignore`** - extended to ignore `*.db` files so you don't commit your local database.

Everything else (components, pages, server actions, API routes, vanilla client) is exactly what you submitted for Lab 10. **Do not change any of those.** The whole point of using a repo is that the storage layer can swap without anything else noticing.

### 3. Files You Will Touch

| File                          | What you do                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `prisma/schema.prisma`      | **Create** in Module 1 - define the `Transaction` model              |
| `repos/TransactionsRepo.js` | **Rewrite** in Modules 3 & 4 - replace each method with a Prisma call  |
| `prisma/schema.prisma`      | **Extend** in Module 5 - add the `Account` model + foreign keys      |
| `repos/AccountsRepo.js`     | **Create** in Module 5 - uses `include` to load related transactions |
| `app/api/accounts/route.js` | **Create** in Module 5 - new read-only API endpoint                    |
| `prisma/schema.prisma`      | **Extend** in Part B - add the `Budget` model + relate it to Account |
| `repos/BudgetsRepo.js`      | **Rewrite** in Part B - same pattern as Modules 3 & 4                  |
| `repos/AccountsRepo.js`     | **Update** in Part B - also `include` budgets                        |

### 4. Schemas You'll Define

```prisma
// Transaction (Module 1) - foreign key added in Module 5
model Transaction {
    id          Int      @id @default(autoincrement())
    description String
    amount      Float
    type        String
    category    String
    date        String
    accountId   Int      @default(1)
    account     Account  @relation(fields: [accountId], references: [id])
    createdAt   DateTime @default(now())
}

// Account (Module 5) - "owns" transactions and (later) budgets
model Account {
    id           Int           @id @default(autoincrement())
    name         String
    transactions Transaction[]
    budgets      Budget[]      // appears once you add Budget in Part B
    createdAt    DateTime      @default(now())
}

// Budget (Part B - you write this)
model Budget {
    id        Int      @id @default(autoincrement())
    category  String
    budgeted  Float
    spent     Float    @default(0)
    month     String
    year      Int
    accountId Int      @default(1)
    account   Account  @relation(fields: [accountId], references: [id])
    createdAt DateTime @default(now())
}
```

---

# Part A: Guided Practice - Migrate TransactionsRepo + Add Relations (60 minutes)

## Module 1: Install Prisma and Define the Schema (12 minutes)

### VS Code Extensions (install once, before you start)

Two extensions make working with Prisma a lot nicer. Install them from the Extensions panel (Cmd+Shift+X / Ctrl+Shift+X):

| Extension                                         | What it does                                                                         |
| ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Prisma** (publisher: Prisma)              | Syntax highlighting, autocomplete, and**format-on-save** for `.prisma` files |
| **Prisma Generate UML** (publisher: AbianS) | Right-click your schema → generate a UML diagram so you can see relations visually  |

After installing the **Prisma** extension, enable format-on-save for `.prisma` (VS Code → Settings → search "Format On Save" → check the box). Saving will then auto-indent your model blocks consistently.

### Instructor Demo (6 minutes)

Prisma needs two packages: `prisma` (the CLI used at build time) and `@prisma/client` (the runtime library your app imports). Install both:

```bash
npm install prisma@^6 --save-dev
npm install @prisma/client@^6
```

> **Why `@^6`?** Prisma 7 (released early 2026) made breaking changes - most notably, the `url = env("DATABASE_URL")` line in the schema is no longer supported (it lives in `.env` or `prisma.config.ts` instead). This lab is built and tested against Prisma 6.x, so we pin it explicitly. Without the `@^6`, npm grabs the latest (Prisma 7) and your schema won't validate.

> **Already installed Prisma 7?** If you ran `npm install prisma --save-dev` without the pin and got v7 (check `node_modules/prisma/package.json` for the version), downgrade with:
>
> ```bash
> npm install prisma@^6 --save-dev
> npm install @prisma/client@^6
> ```
>
> npm will replace v7 with the latest 6.x in `package.json` and `node_modules`. Your schema's `url = env("DATABASE_URL")` line will be valid again.

Then initialize Prisma:

```bash
npx prisma init --datasource-provider sqlite
```

This creates the `prisma/` folder with a starter `schema.prisma`, and would normally add `DATABASE_URL` to `.env` - your `.env` already has it, so Prisma leaves it alone.

> **Note:** the starter ships `seed.js` at `data/seed.js` (not inside `prisma/`) so this command can run cleanly. You'll move it into the new `prisma/` folder in Module 2.

Open the new `prisma/schema.prisma`. You'll see two blocks Prisma needs:

```prisma
generator client {
    provider = "prisma-client-js"
}

datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL")
}
```

The `generator` block tells Prisma to produce a JavaScript client. The `datasource` block says "the database is SQLite, and the connection string lives in `.env` as `DATABASE_URL`".

Now add a `model` block. A model maps to a table; each line inside is a column:

```prisma
model Transaction {
    id          Int      @id @default(autoincrement())
    description String
    amount      Float
    type        String
    category    String
    date        String
    createdAt   DateTime @default(now())
}
```

Three things to notice:

1. **`@id`** marks the primary key. **`@default(autoincrement())`** lets the database generate IDs. (We're keeping `Int` IDs to match the existing JSON data.)
2. **Field types** (`String`, `Float`, `Int`, `DateTime`) are Prisma types - they map to SQL types behind the scenes.
3. **`date` is a String**, not `DateTime`. Lab 10 stores dates as ISO strings (`"2026-03-01"`); keeping the type as `String` avoids forcing every form and component to switch to Date objects.

### Your Turn - TODO 1 (6 minutes)

1. Run the two `npm install` commands above (`prisma --save-dev` and `@prisma/client`).
2. Run `npx prisma init --datasource-provider sqlite`. This creates `prisma/schema.prisma` with a Prisma default skeleton.
3. Open `prisma/schema.prisma` and **replace its entire contents** with the schema above (generator, datasource, and the `Transaction` model).
4. Save. The schema is just text - no migration runs yet.

---

## Module 2: Migrate and Seed the Database (12 minutes)

### Instructor Demo (6 minutes)

Now turn the schema into an actual SQLite database. Prisma compares your schema to the database and generates a SQL migration:

```bash
npx prisma migrate dev --name init
```

What this does:

1. Creates `prisma/dev.db` (the SQLite file).
2. Creates `prisma/migrations/<timestamp>_init/migration.sql` with the SQL that built the table. Open it - it's plain SQL.
3. Generates `@prisma/client` with TypeScript-style autocomplete for your models.

The database is empty. To populate it, you'll run the provided seed - but first move the seed file into `prisma/` (it currently lives at `data/seed.js` so `prisma init` could create the folder):

```bash
mv data/seed.js prisma/seed.js
```

Now run the seed:

```bash
npx prisma db seed
```

The seed script reads `data/transactions.json` and inserts each row using `prisma.transaction.create`. Before inserting, it checks `findMany().length > 0` and skips if the table already has rows - safe to re-run.

> **Note:** for `npx prisma db seed` to find the script, `package.json` needs a `"prisma": { "seed": "node prisma/seed.js" }` block. Check yours; we added it for you.

Inspect the result with Prisma Studio (a free GUI for your DB):

```bash
npx prisma studio
```

Browser opens at `http://localhost:5555`. Click `Transaction`. You should see all your seeded rows.

### Your Turn - TODO 2 (6 minutes)

1. Run `npx prisma migrate dev --name init`. Confirm `prisma/dev.db` and the migration folder appear.
2. Open `prisma/migrations/<timestamp>_init/migration.sql` and read the generated SQL.
3. Move the seed file: `mv data/seed.js prisma/seed.js`.
4. Run `npx prisma db seed`. You should see "Seeded N transactions".
5. Run `npx prisma studio` and verify your transactions are in the `Transaction` table.

The app's UI is still using JSON at this point. The DB has data, but `TransactionsRepo` doesn't read from it yet. That's the next module.

---

## Module 3: Replace the Read Methods (12 minutes)

### Instructor Demo (6 minutes)

Open `repos/TransactionsRepo.js`. Replace the two read methods. Start with the imports:

```js
// BEFORE
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "transactions.json");

// AFTER
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
```

Then replace `getAll` and `getById`:

```js
async getAll() {
    return prisma.transaction.findMany({ orderBy: { id: "asc" } });
}

async getById(id) {
    return prisma.transaction.findUnique({ where: { id: Number(id) } });
}
```

A few notes:

- **`prisma.transaction`** is auto-generated from your model name (lowercased).
- **`findMany`** returns an array. **`findUnique`** returns the row or `null`.
- **`where: { id: Number(id) }`** - IDs come from URL params as strings, so coerce to `Number`. (Same trick you used in Lab 10's repo.)
- The old `save` helper isn't needed anymore - Prisma handles persistence per call. You can delete it once `create`, `update`, `delete` are migrated too.

Save the file and refresh `http://localhost:3000/transactions`. The list should still render - but now it's pulling from SQLite. Open Prisma Studio in another tab; the rows match exactly.x

### Your Turn - TODO 3 (6 minutes)

In `repos/TransactionsRepo.js`:

1. Swap the imports (out: `fs` and `path`; in: `PrismaClient`).
2. Add `const prisma = new PrismaClient();` after the imports.
3. Replace `getAll` with the Prisma version above.
4. Replace `getById` with the Prisma version above.
5. Leave `create`, `update`, `delete` for now.
6. Refresh the transactions page. The list should still load.

If something breaks, check the terminal - Prisma errors are very explicit (e.g., "Unknown field `descriptionn`").

---

## Module 4: Replace the Write Methods (12 minutes)

### Instructor Demo (6 minutes)

Three methods left: `create`, `update`, `delete`. The shapes:

```js
async create(data) {
    return prisma.transaction.create({
        data: {
            description: data.description,
            amount: Number(data.amount),
            type: data.type,
            category: data.category,
            date: data.date || new Date().toISOString().split("T")[0]
        }
    });
}

async update(id, data) {
    return prisma.transaction.update({
        where: { id: Number(id) },
        data: {
            description: data.description,
            amount: Number(data.amount),
            type: data.type,
            category: data.category,
            date: data.date
        }
    });
}

async delete(id) {
    try {
        await prisma.transaction.delete({ where: { id: Number(id) } });
        return true;
    } catch {
        return false;
    }
}
```

Three things changed compared to Lab 10:

1. **No more reading the whole array, mutating, then writing back.** Each call is one DB statement.
2. **No `id` in `create`'s `data`** - the database auto-generates it via `@default(autoincrement())`.
3. **`delete` throws if the id doesn't exist.** Wrap in try/catch and return a boolean to keep the same signature your server actions expect.

Once all three are in place, you can delete the old `save` helper and remove the `fs` import (it's already gone if you followed Module 3).

Two more methods power the dashboard: `getTotalByType` and `getBalance`. In Lab 10 these fetched every row and filtered in JavaScript. Prisma has a built-in `aggregate` that pushes the math to the database:

```js
async getTotalByType(type) {
    const result = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type }
    });
    return result._sum.amount ?? 0;
}

async getBalance() {
    const income = await this.getTotalByType("income");
    const expense = await this.getTotalByType("expense");
    return income - expense;
}
```

- **`aggregate`** runs a SQL `SUM` instead of loading every row into memory.
- **`_sum: { amount: true }`** tells Prisma which field to sum.
- **`?? 0`** handles the case where no rows match (returns `null`).

The file is now under 60 lines and has zero references to the file system.

### Your Turn - TODO 4 (6 minutes)

In `repos/TransactionsRepo.js`:

1. Replace `create` with the Prisma version.
2. Replace `update` with the Prisma version.
3. Replace `delete` with the Prisma version.
4. Replace `getTotalByType` and `getBalance` with the Prisma `aggregate` versions.
5. Delete the unused `save` method.
5. Test in the browser:
   - Add a transaction → it appears in the list AND in Prisma Studio.
   - Edit it → both views update.
   - Delete it → both views remove it.
6. **Proof it's all DB now:** open `data/transactions.json` and watch - it doesn't change anymore. (You could even delete the file; the app keeps working.)

---

## Module 5: Add a Relation + Account API (12 minutes)

### Instructor Demo (6 minutes)

Real apps have relationships. A `Transaction` belongs to an `Account`; an `Account` has many `Transaction`s. Prisma models this with two pieces:

1. A foreign-key field on the child (`accountId`)
2. A relation field on both sides (`account` on `Transaction`, `transactions` on `Account`)

Open `prisma/schema.prisma` and add an `Account` model PLUS the foreign key on `Transaction`:

```prisma
model Account {
    id           Int           @id @default(autoincrement())
    name         String
    transactions Transaction[]
    createdAt    DateTime      @default(now())
}

model Transaction {
    // ... existing fields ...
    accountId   Int      @default(1)
    account     Account  @relation(fields: [accountId], references: [id])
}
```

Three things to notice:

1. **`@default(1)`** on `accountId` is the magic. Existing transactions and any new ones created via the form will automatically belong to account id 1. The form doesn't even need to know accounts exist.
2. **`Transaction[]`** on `Account.transactions` is the back-reference. It tells Prisma "one Account, many Transactions" - that's the one-to-many.
3. **`@relation(fields: [accountId], references: [id])`** wires the foreign key - `Transaction.accountId` points to `Account.id`.

Run a NEW migration (the existing tables stay; this one just adds Account and the column):

```bash
npx prisma migrate dev --name add-account
```

The seed already inserts two accounts (`Main Account`, `Savings`) and uses each transaction's `accountId` from `data/transactions.json`. Re-run the seed:

```bash
npx prisma db seed
```

Now the magic - the **`include`** option lets one query pull a row AND its related rows:

```js
// repos/AccountsRepo.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AccountsRepo {
    async getAll() {
        return prisma.account.findMany({
            include: { transactions: true },
            orderBy: { id: "asc" }
        });
    }

    async getById(id) {
        return prisma.account.findUnique({
            where: { id: Number(id) },
            include: { transactions: true }
        });
    }
}

export default new AccountsRepo();
```

And expose it via a Next.js API route:

```js
// app/api/accounts/route.js
import { NextResponse } from "next/server";
import accountsRepo from "@/repos/AccountsRepo";

export async function GET() {
    const accounts = await accountsRepo.getAll();
    return NextResponse.json(accounts);
}
```

Open `http://localhost:3000/api/accounts` in the browser. You'll see a JSON array - each account with a `transactions` array nested inside. ONE query, two tables.

### Your Turn - TODO 5 (6 minutes)

1. Edit `prisma/schema.prisma` - add the `Account` model and the `accountId` + `account` fields on `Transaction` (see above).
2. Run `npx prisma migrate dev --name add-account` and confirm a new migration folder appears.
3. Run `npx prisma db seed` again. The output should now also say "Seeded 2 accounts".
4. Open Prisma Studio (`npx prisma studio`). Click `Account` - you should see two rows. Click `Transaction` - every row should have an `accountId`.
5. Create `repos/AccountsRepo.js` with `getAll` and `getById` using `include`.
6. Create `app/api/accounts/route.js` and `app/api/accounts/[id]/route.js`. The `[id]` route returns one account, or 404 if missing:

```js
// app/api/accounts/[id]/route.js
import { NextResponse } from "next/server";
import accountsRepo from "@/repos/AccountsRepo";

export async function GET(_request, { params }) {
    const { id } = await params;
    const account = await accountsRepo.getById(id);
    if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(account);
}
```

7. Visit `/api/accounts` and `/api/accounts/1` in the browser. Confirm transactions appear nested inside each account.

The transactions UI hasn't changed at all - but every transaction is now linked to an account via a real foreign key, queryable through `include`.

---

# Part B: Independent Project - Migrate BudgetsRepo + Extend Account (60 minutes)

## Project Overview

Apply everything from Part A to `BudgetsRepo` on `Startup Code/my-finance-app`, AND extend the Account relation to cover budgets. The starter is a fresh copy of your Lab 10 finance app with the Prisma infrastructure (`.env`, `package.json` seed config, `prisma/seed.js`) already in place.

This time:

- The `prisma/seed.js` we provide seeds **accounts**, **transactions**, AND **budgets**.
- You'll do the full Transactions migration AGAIN (without the instructor walking you through it), define a `Budget` model with an account foreign key, AND extend the API endpoint to return budgets nested under each account.

### Files You'll Modify

- `prisma/schema.prisma` - create it; define `Account`, `Transaction`, AND `Budget` models with relations
- `repos/TransactionsRepo.js` - rewrite using Prisma (same as Modules 3-4)
- `repos/BudgetsRepo.js` - rewrite using Prisma (the new work)
- `repos/AccountsRepo.js` - add `budgets: true` to the `include`
- `app/api/accounts/route.js` and `app/api/accounts/[id]/route.js` - same code, but the response now includes budgets too

### Steps

1. **Setup** - install `prisma` and `@prisma/client`, create `prisma/schema.prisma` with `Account`, `Transaction`, AND `Budget` models (use the schemas from "Getting Started" at the top of this lab - Account has BOTH `transactions: Transaction[]` and `budgets: Budget[]`).
2. **Migrate + seed** - `npx prisma migrate dev --name init`, then `npx prisma db seed`. Confirm all three tables in Prisma Studio.
3. **Migrate `TransactionsRepo`** - replace all 5 methods with Prisma calls (same code as Modules 3-4).
4. **Migrate `BudgetsRepo`** - apply the SAME pattern. The fields differ (category, budgeted, spent, month, year) but the API surface is identical. Coerce `budgeted`, `spent`, and `year` to `Number` in `create` and `update`.
5. **Add the Account API + extend it for budgets**:
   - Create `repos/AccountsRepo.js` with `getAll` and `getById`. Use `include: { transactions: true, budgets: true }` so each account brings both its transactions AND its budgets.
   - Create `app/api/accounts/route.js` (GET all) and `app/api/accounts/[id]/route.js` (GET one + 404).
   - Visit `/api/accounts/1` and `/api/accounts/2` - each response should show `transactions` AND `budgets` nested inside.
6. **Test the app end-to-end**:
   - Transactions: list, add, edit, delete - all work, all hit the DB.
   - Budgets: list, add, edit, delete - all work, all hit the DB.
   - `data/transactions.json` and `data/budgets.json` no longer change when you mutate via the UI.

### Tips

- **`prisma migrate dev` is idempotent for additive schema changes** - adding a new model creates a new migration without dropping existing tables. If you mess up early on, `npx prisma migrate reset` wipes the DB and re-runs all migrations + the seed.
- **The seed uses `upsert`**, so re-running it never duplicates rows. Use that freely while testing.
- **One `PrismaClient()` per repo file is fine** for Lab purposes. In production you'd share a single client across the app to avoid connection pool exhaustion - that's a Next.js + Prisma topic for another day.
- **Forms still don't send `accountId`** - the schema's `@default(1)` handles new rows automatically. You never touched a single component.

---

## Self-Assessment Checklist

- [ ] `prisma/schema.prisma` defines `Account`, `Transaction`, AND `Budget` models with correct field types
- [ ] `Transaction` and `Budget` each have `accountId Int @default(1)` and a `@relation` field
- [ ] `Account` has back-reference fields `transactions Transaction[]` AND `budgets Budget[]`
- [ ] `npx prisma migrate dev` ran successfully and `prisma/dev.db` exists
- [ ] Prisma Studio shows seeded data in all three tables (2 accounts, all transactions, all budgets)
- [ ] `repos/TransactionsRepo.js` has zero `fs` references and uses `prisma.transaction.*` for all 5 methods
- [ ] `repos/BudgetsRepo.js` has zero `fs` references and uses `prisma.budget.*` for all 5 methods
- [ ] `repos/AccountsRepo.js` exists and uses `include: { transactions: true, budgets: true }`
- [ ] `GET /api/accounts` returns a JSON array with each account's transactions AND budgets nested inside
- [ ] `GET /api/accounts/1` returns one account with its children; `/api/accounts/999` returns 404
- [ ] Listing, adding, editing, and deleting transactions all work in the UI
- [ ] Listing, adding, editing, and deleting budgets all work in the UI
- [ ] `data/transactions.json` and `data/budgets.json` no longer change when you mutate via the UI
- [ ] No component, page, form, server action, or existing API route was modified - only the schema, the seed (provided), the two repos, the new AccountsRepo, and the two new account API routes

---

**Author:** Abdulahi Hassen
