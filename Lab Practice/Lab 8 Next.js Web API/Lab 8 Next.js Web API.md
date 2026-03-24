<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development Fundamentals</strong>
</p>

---

# Lab 8: Next.js Web API

# Building a RESTful Backend for MyFinance

**Duration:** 120 minutes
**Theme:** Personal Finance Platform - Part 8 of 11
**Prerequisites:** Labs 1-7 completed, Node.js v18+ installed

---

## Overview

Up to this point, your finance platform runs entirely in the browser. Data lives in localStorage, gets lost when users clear their browser, and can't be shared between devices. Real web apps don't work like that. They have a **backend** - a server that stores data, processes requests, and sends responses.

This lab introduces **Next.js**, a React framework that handles both frontend and backend. Today you'll focus on the backend side: building **API routes** that respond to HTTP requests with JSON data. Think of it as building the engine behind the scenes. Later labs will connect a React frontend to these APIs.

You'll build RESTful endpoints using the same HTTP methods you already know from fetching data in Lab 7. The difference is that now you're on the other side - instead of calling APIs, you're creating them.

### What You'll Build

- A `/api/hello` endpoint to understand the basics
- Full CRUD API for accounts (GET, POST, PUT, DELETE)
- Dynamic routes for single-resource operations (`/api/accounts/3`)
- Transactions API with query parameter filtering
- Complete finance platform API with budgets and goals

### Lab Structure

**Part A: Next.js API Routes (60 minutes)**
Instructor demonstrates each concept, you practice immediately, repeat.

**Part B: Complete MyFinance API (60 minutes)**
Build the full API backend with accounts, transactions, budgets, and goals.

---

## Learning Objectives

By the end of this lab, you will be able to:

- Create a Next.js project from scratch and run a development server
- Create API route handlers that return JSON responses
- Implement GET, POST, PUT, and DELETE operations
- Use dynamic route segments (`[id]`) for single-resource endpoints
- Read and write JSON files as a simple data store
- Validate request data and return appropriate status codes
- Filter data using URL query parameters

---

## Prerequisites

- Labs 1-7 completed
- **Node.js v18+** installed - run `node --version` to check
- **npm** available - run `npm --version` to check
- **Postman** installed for testing API endpoints (GET, POST, PUT, DELETE)

---

## Getting Started

### Step 1: Create Your Next.js Project

Open a terminal and run:

```bash
npx create-next-app@latest myfinance-api
```

When prompted, answer **No** to everything:

```
Would you like to use TypeScript? No
Would you like to use ESLint? No
Would you like to use Tailwind CSS? No
Would you like your code inside a `src/` directory? No
Would you like to use App Router? Yes
Would you like to use Turbopack for next dev? Yes
Would you like to customize the import alias? Yes (keep the default @/*)
```

### Step 2: Verify It Works

```bash
cd myfinance-api
npm run dev
```

Open `http://localhost:3000` in your browser. You should see the Next.js welcome page. Your server is running.

### Step 3: Copy the Data Files

Copy the JSON files from `Startup Code/data/` into your project. Create a `data/` folder in your project root and copy all 4 files into it:

```
myfinance-api/
  data/
    accounts.json
    transactions.json
    budgets.json
    goals.json
```

These JSON files are your simple database - each one stores an array of records that your API will read and write.

### Step 4: Copy the Client App

Copy the `client/` folder from Startup Code into your project's `public/` folder. Next.js serves static files from `public/`, so this gives you a pre-built UI to test your API as you build it.

```
myfinance-api/
  public/
    client/
      index.html
      css/styles.css
      js/app.js
      pages/
        accounts.html
        transactions.html
        budgets.html
        goals.html
```

This client is a vanilla JS single-page app that uses the same `fetch()` patterns from Lab 7 to call your API. You don't need to modify it - just build the API endpoints and the client will work automatically.

### Step 5: Clean Up the Default Files

Next.js generated some default code you don't need. Open `app/page.js` and replace its contents with:

```javascript
export default function Home() {
    return (
        <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
            <h1>MyFinance API</h1>
            <p>Your API server is running. Test the endpoints below:</p>
            <ul>
                <li><a href="/api/hello">/api/hello</a></li>
            </ul>
        </main>
    );
}
```

You can also delete the default `app/globals.css` and `app/page.module.css` files - we won't need them. Remove the CSS import from `app/layout.js` if it has one.

### Project Structure

By the end of this lab, your project will look like this:

```
myfinance-api/
  app/
    api/
      hello/route.js              <- Module 1
      accounts/
        route.js                  <- Module 2
        [id]/route.js             <- Module 3
      transactions/
        route.js                  <- Module 4
        [id]/route.js             <- Module 4
      budgets/                    <- Part B
        route.js
        [id]/route.js
      goals/                      <- Part B
        route.js
        [id]/route.js
    layout.js
    page.js
  public/
    client/
      index.html                  <- Pre-built client UI
      css/styles.css
      js/app.js
      pages/
        accounts.html
        transactions.html
        budgets.html
        goals.html
  data/
    accounts.json
    transactions.json
    budgets.json
    goals.json
  package.json
```

You'll build this structure piece by piece. Each module adds new folders and route files to the same project.

> **Testing POST, PUT, DELETE:** Your browser can only make GET requests by typing URLs. For other methods, use **Postman**. Create a new request, set the method (POST, PUT, DELETE), enter the URL, and for POST/PUT add the JSON body under Body > raw > JSON.

---

# Part A: Next.js API Routes (60 minutes)

## Module 1: Next.js Setup and Your First API Route (15 minutes)

### Instructor Demo (7 minutes)

Next.js is a full-stack React framework. It can serve web pages AND handle API requests. Today we only care about the API side.

**File-Based Routing**

The key idea: **file path = URL path**. A file at `app/api/hello/route.js` handles requests to `/api/hello`. A file at `app/api/accounts/route.js` handles `/api/accounts`. This is called file-based routing.

**How API Routes Work**

Each `route.js` file exports functions named after HTTP methods. Next.js calls the right one based on the request:

```javascript
import { NextResponse } from "next/server";

// Handles GET /api/hello
export async function GET() {
    return NextResponse.json({
        message: "Hello from the API!",
        timestamp: new Date().toISOString()
    });
}

// Handles POST /api/hello
export async function POST(request) {
    const body = await request.json();
    return NextResponse.json({
        received: body,
        processedAt: new Date().toISOString()
    });
}
```

`NextResponse.json()` creates an HTTP response with JSON content and a 200 status code. To use a different status code:

```javascript
return NextResponse.json({ error: "Not found" }, { status: 404 });
```

The `request` parameter (a standard Web API `Request` object) is passed automatically by Next.js. You only need it for POST/PUT where you read the body.

**Testing in Postman**

Open Postman and create a new GET request:

- **Method:** GET
- **URL:** `http://localhost:3000/api/hello`
- Click Send to see the JSON response.

### Practice (8 minutes)

Make sure your dev server is still running (`npm run dev`).

Create the folder `app/api/hello/` in your project, then create a file called `route.js` inside it:

```
app/
  api/
    hello/
      route.js    <- create this file
```

Open `app/api/hello/route.js` and complete the exercises:

**Exercise 1:** Create a GET handler that returns a JSON object with `message`, `version`, and `timestamp` fields.

**Exercise 2:** Create a POST handler that reads a `name` from the request body and returns a greeting. Return a 400 error if the name is missing.

Test both handlers in Postman:

**GET `/api/hello`:**

- **Method:** GET
- **URL:** `http://localhost:3000/api/hello`

**POST `/api/hello`:**

- **Method:** POST
- **URL:** `http://localhost:3000/api/hello`
- **Body:** raw > JSON > `{"name": "Ahmed"}`

---

## Module 2: GET and POST with JSON File Storage (15 minutes)

### Instructor Demo (7 minutes)

Real APIs need to store data somewhere. We'll use JSON files as a simple database. Node's `fs/promises` module reads and writes files asynchronously.

**Reading JSON Data**

```javascript
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "accounts.json");

async function readAccounts() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
}

export async function GET() {
    const accounts = await readAccounts();
    return NextResponse.json(accounts);
}
```

`process.cwd()` returns the project root directory. We join it with `"data"` and `"accounts.json"` to get the full file path. `fs.readFile` returns a string, so we parse it into a JavaScript array with `JSON.parse`.

**Writing JSON Data**

```javascript
async function writeAccounts(accounts) {
    await fs.writeFile(dataPath, JSON.stringify(accounts, null, 4));
}

export async function POST(request) {
    const body = await request.json();

    // Validate
    if (!body.name || !body.type || body.balance === undefined) {
        return NextResponse.json(
            { error: "name, type, and balance are required" },
            { status: 400 }
        );
    }

    const accounts = await readAccounts();

    // Auto-increment ID
    const newAccount = {
        id: Math.max(...accounts.map(a => a.id), 0) + 1,
        name: body.name,
        type: body.type,
        balance: Number(body.balance),
        status: "active"
    };

    accounts.push(newAccount);
    await writeAccounts(accounts);

    return NextResponse.json(newAccount, { status: 201 });
}
```

Status 201 means "Created" - the standard response when a POST successfully creates a resource. The `Math.max(...accounts.map(a => a.id), 0) + 1` pattern generates the next available ID.

**Validation matters.** Never trust client data. Check that required fields exist before doing anything with them. Return 400 (Bad Request) with a clear error message when validation fails.

### Practice (8 minutes)

Create the folder `app/api/accounts/` and a `route.js` file inside it:

```
app/
  api/
    hello/route.js          <- from Module 1
    accounts/
      route.js              <- create this file
```

Your `data/accounts.json` file is already in place from the setup step.

Open `app/api/accounts/route.js` and complete the exercises:

**Exercise 1:** Create a GET handler that reads and returns all accounts from `data/accounts.json`.

**Exercise 2:** Create a POST handler that validates the request body, creates a new account with an auto-incremented ID, saves to the file, and returns it with status 201.

Test both handlers in Postman:

**GET `/api/accounts`:**

- **Method:** GET
- **URL:** `http://localhost:3000/api/accounts`

**POST `/api/accounts`:**

- **Method:** POST
- **URL:** `http://localhost:3000/api/accounts`
- **Body:** raw > JSON > `{"name": "Investment Fund", "type": "savings", "balance": 5000}`

Refresh the GET endpoint to verify the new account appears.

---

## Module 3: Dynamic Routes - Single Resource Operations (15 minutes)

### Instructor Demo (7 minutes)

So far, `/api/accounts` handles the whole collection. But what about one specific account? That's where **dynamic routes** come in.

Create a folder named `[id]` (with the square brackets) inside `api/accounts/`. The brackets tell Next.js this is a dynamic segment:

```
app/api/accounts/[id]/route.js   ->  /api/accounts/1
                                      /api/accounts/2
                                      /api/accounts/42
```

Whatever value is in the URL gets passed as `params.id`.

**GET Single Resource**

```javascript
export async function GET(request, { params }) {
    const { id } = await params;
    const accounts = await readAccounts();
    const account = accounts.find(a => a.id === Number(id));

    if (!account) {
        return NextResponse.json(
            { error: "Account not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(account);
}
```

Two things to note:

1. `params` is a Promise in Next.js 15 - you must `await` it
2. `id` is always a string from the URL, so use `Number(id)` when comparing to numeric IDs

**PUT - Update a Resource**

```javascript
export async function PUT(request, { params }) {
    const { id } = await params;
    const body = await request.json();
    const accounts = await readAccounts();
    const index = accounts.findIndex(a => a.id === Number(id));

    if (index === -1) {
        return NextResponse.json(
            { error: "Account not found" },
            { status: 404 }
        );
    }

    accounts[index] = { ...accounts[index], ...body, id: Number(id) };
    await writeAccounts(accounts);

    return NextResponse.json(accounts[index]);
}
```

The spread pattern `{ ...accounts[index], ...body, id: Number(id) }` merges the existing data with the new data. The `id: Number(id)` at the end prevents the client from changing the ID.

**DELETE**

```javascript
export async function DELETE(request, { params }) {
    const { id } = await params;
    const accounts = await readAccounts();
    const index = accounts.findIndex(a => a.id === Number(id));

    if (index === -1) {
        return NextResponse.json(
            { error: "Account not found" },
            { status: 404 }
        );
    }

    accounts.splice(index, 1);
    await writeAccounts(accounts);

    return NextResponse.json({ message: "Account deleted" });
}
```

### Practice (8 minutes)

Create the folder `app/api/accounts/[id]/` and a `route.js` file inside it:

```
app/
  api/
    accounts/
      route.js              <- from Module 2
      [id]/
        route.js            <- create this file
```

Open `app/api/accounts/[id]/route.js` and complete all three exercises (GET, PUT, DELETE). You'll need the same imports and helper functions (`readAccounts`, `writeAccounts`) from Module 2.

Test in Postman:

| Method | URL                                      | Body (JSON)                                        |
| ------ | ---------------------------------------- | -------------------------------------------------- |
| GET    | `http://localhost:3000/api/accounts/1` | -                                                  |
| PUT    | `http://localhost:3000/api/accounts/1` | `{"name": "Primary Checking", "balance": 16000}` |
| DELETE | `http://localhost:3000/api/accounts/4` | -                                                  |

---

## Module 4: Transactions API with Query Parameters (15 minutes)

### Instructor Demo (7 minutes)

Time to build a second resource. The transactions API follows the exact same pattern as accounts, but adds one new concept: **query parameter filtering**.

**Reading Query Parameters**

When a client calls `/api/transactions?type=expense&category=Food`, you can read those parameters:

```javascript
export async function GET(request) {
    let transactions = await readTransactions();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");

    if (type) {
        transactions = transactions.filter(t => t.type === type);
    }
    if (category) {
        transactions = transactions.filter(t => t.category === category);
    }

    return NextResponse.json(transactions);
}
```

`new URL(request.url)` parses the full URL. `searchParams.get("type")` returns the value of the `type` parameter, or `null` if it's not there. The `if (type)` check means filtering only happens when the parameter exists - if no parameters are passed, all transactions are returned.

**Input Validation for POST**

Transactions have more fields to validate:

```javascript
export async function POST(request) {
    const body = await request.json();

    if (!body.description || !body.amount || !body.type || !body.category || !body.accountId) {
        return NextResponse.json(
            { error: "description, amount, type, category, and accountId are required" },
            { status: 400 }
        );
    }

    if (body.type !== "income" && body.type !== "expense") {
        return NextResponse.json(
            { error: "type must be 'income' or 'expense'" },
            { status: 400 }
        );
    }

    // ... create and save
}
```

Two levels of validation here: first check that all fields exist, then check that specific fields have valid values. This prevents garbage data from entering your system.

### Practice (8 minutes)

Create two new folders with `route.js` files:

```
app/
  api/
    accounts/
      route.js
      [id]/route.js
    transactions/
      route.js              <- create this file
      [id]/
        route.js            <- create this file
```

Your `data/transactions.json` file is already in place.

Complete the exercises in both `app/api/transactions/route.js` and `app/api/transactions/[id]/route.js`.

Test in Postman:

| Method | URL                                                                   | Body (JSON)                                                                                        |
| ------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| GET    | `http://localhost:3000/api/transactions`                            | -                                                                                                  |
| GET    | `http://localhost:3000/api/transactions?type=expense`               | -                                                                                                  |
| GET    | `http://localhost:3000/api/transactions?type=expense&category=Food` | -                                                                                                  |
| POST   | `http://localhost:3000/api/transactions`                            | `{"description": "Coffee", "amount": 25, "type": "expense", "category": "Food", "accountId": 1}` |

> **See It in Action:** Open `http://localhost:3000/client/index.html` in your browser. Click the **Accounts** and **Transactions** tabs - you should see your data rendered by a client app that uses the same `fetch()` patterns from Lab 7. Try adding or deleting a record through the UI.

---

# Part B: Complete MyFinance API (60 minutes)

## Project Overview

You now have a working API with accounts and transactions from Part A. Time to extend it with two more resources: **budgets** and **goals**.

| Resource          | Endpoints             | Description                |
| ----------------- | --------------------- | -------------------------- |
| Accounts          | `/api/accounts`     | Bank accounts and balances |
| Transactions      | `/api/transactions` | Income and expense records |
| **Budgets** | `/api/budgets`      | Monthly category budgets   |
| **Goals**   | `/api/goals`        | Financial savings targets  |

Your job is to build the **budgets** and **goals** APIs following the same patterns you used for accounts and transactions. Keep working in the same `myfinance-api` project - your dev server should still be running.

## Data Files

Your `data/budgets.json` and `data/goals.json` files are already in place from the initial setup. Take a look at each one to understand the data model before you start coding.

## Tasks

### Task 1: GET /api/budgets

Create `app/api/budgets/route.js`. Write a GET handler that:

- Reads all budgets from `data/budgets.json`
- Supports optional query params: `month`, `year`, `category`
- Filters results when params are provided
- Returns the array as JSON

Test in Postman:

- **GET** `http://localhost:3000/api/budgets` (all budgets)
- **GET** `http://localhost:3000/api/budgets?month=March` (filtered)

### Task 2: POST /api/budgets

In the same file, create a POST handler that:

- Validates required fields: `category`, `budgeted`, `month`, `year`
- Returns 400 if any are missing
- Creates a new budget with auto-incremented `id` and `spent: 0`
- Saves to file and returns with status 201

### Task 3: GET/PUT/DELETE /api/budgets/:id

Create `app/api/budgets/[id]/route.js`. Create handlers for:

- **GET** - Find budget by ID, return 404 if not found
- **PUT** - Update budget by ID, return 404 if not found
- **DELETE** - Remove budget by ID, return `{ message: "Budget deleted" }`

### Task 4: GET /api/goals

Create `app/api/goals/route.js`. Write a GET handler that returns all goals.

### Task 5: POST /api/goals

In the same file, create a POST handler that:

- Validates required fields: `name`, `target`, `targetDate`
- Creates a new goal with auto-incremented `id` and `current: 0`
- Saves and returns with status 201

### Task 6: GET/PUT/DELETE /api/goals/:id

Create `app/api/goals/[id]/route.js`. Create all three handlers following the same pattern you used for accounts and budgets.

## Testing Your API

Use Postman to test each endpoint:

**Budgets:**

| Method | URL                                     | Body (JSON)                                                                   |
| ------ | --------------------------------------- | ----------------------------------------------------------------------------- |
| GET    | `http://localhost:3000/api/budgets`   | -                                                                             |
| POST   | `http://localhost:3000/api/budgets`   | `{"category": "Shopping", "budgeted": 800, "month": "March", "year": 2026}` |
| GET    | `http://localhost:3000/api/budgets/1` | -                                                                             |
| PUT    | `http://localhost:3000/api/budgets/1` | `{"spent": 4800}`                                                           |
| DELETE | `http://localhost:3000/api/budgets/6` | -                                                                             |

**Goals:**

| Method | URL                                   | Body (JSON)                                                            |
| ------ | ------------------------------------- | ---------------------------------------------------------------------- |
| GET    | `http://localhost:3000/api/goals`   | -                                                                      |
| POST   | `http://localhost:3000/api/goals`   | `{"name": "New Laptop", "target": 8000, "targetDate": "2026-06-01"}` |
| GET    | `http://localhost:3000/api/goals/1` | -                                                                      |
| PUT    | `http://localhost:3000/api/goals/1` | `{"current": 15000}`                                                 |
| DELETE | `http://localhost:3000/api/goals/4` | -                                                                      |

### Verification Checklist

- [ ] `GET /api/budgets` returns all budgets
- [ ] `GET /api/budgets?month=March` returns filtered results
- [ ] `POST /api/budgets` creates a new budget with `spent: 0`
- [ ] `POST /api/budgets` returns 400 when fields are missing
- [ ] `GET /api/budgets/1` returns a single budget
- [ ] `GET /api/budgets/999` returns 404
- [ ] `PUT /api/budgets/1` updates and returns the budget
- [ ] `DELETE /api/budgets/1` removes the budget
- [ ] `GET /api/goals` returns all goals
- [ ] `POST /api/goals` creates a new goal with `current: 0`
- [ ] `GET /api/goals/1` returns a single goal
- [ ] `PUT /api/goals/1` updates the goal
- [ ] `DELETE /api/goals/1` removes the goal
- [ ] All endpoints return proper status codes (200, 201, 400, 404)

> **Try the Full App:** Open `http://localhost:3000/client/index.html` and try all 4 pages. Add, edit, and delete records through the UI. This client app uses vanilla JS and `fetch()` to call the API you just built - the same patterns you learned in Lab 7, now talking to your own backend.

---

## Self-Assessment Checklist

### Next.js Basics

- [ ] I can explain what Next.js is and why it's used for full-stack apps
- [ ] I can create a Next.js project with `npx create-next-app` and run it with `npm run dev`
- [ ] I understand file-based routing (`app/api/hello/route.js` maps to `/api/hello`)

### API Route Handlers

- [ ] I can create GET handlers that return JSON data
- [ ] I can create POST handlers that read the request body and validate input
- [ ] I can return appropriate HTTP status codes (200, 201, 400, 404)
- [ ] I know the difference between `NextResponse.json(data)` and `NextResponse.json(data, { status: 201 })`

### Dynamic Routes

- [ ] I can create dynamic routes using `[id]` folders
- [ ] I can extract the `id` parameter from `params`
- [ ] I can implement GET, PUT, and DELETE for single resources

### Data Storage

- [ ] I can read JSON files using `fs.readFile` and `JSON.parse`
- [ ] I can write JSON files using `fs.writeFile` and `JSON.stringify`
- [ ] I can auto-increment IDs when creating new records

### Query Parameters

- [ ] I can read query parameters from the request URL
- [ ] I can filter results based on query parameters

---

## Common Mistakes

| Mistake                       | Fix                                                                        |
| ----------------------------- | -------------------------------------------------------------------------- |
| `Cannot find module 'next'` | Run `npm install` first                                                  |
| Port 3000 already in use      | Stop the previous server with Ctrl+C                                       |
| `params.id` is undefined    | In Next.js 15, await params:`const { id } = await params`                |
| POST body is undefined        | Use `await request.json()` - don't forget the `await`                  |
| ID comparison fails           | `params.id` is a string - use `Number(id)` to compare with numeric IDs |
| Changes not showing           | Next.js has hot reload, but if stuck, restart with `npm run dev`         |
| File write errors             | Check that the `data/` folder exists and the JSON file is valid          |
| 404 on valid route            | Check folder structure - must be `app/api/accounts/route.js` exactly     |

---

## Key Concepts Reference

### HTTP Methods and Status Codes

| Method | Purpose     | Success Code | Common Errors   |
| ------ | ----------- | ------------ | --------------- |
| GET    | Read data   | 200 OK       | 404 Not Found   |
| POST   | Create data | 201 Created  | 400 Bad Request |
| PUT    | Update data | 200 OK       | 404 Not Found   |
| DELETE | Remove data | 200 OK       | 404 Not Found   |

### REST API Route Patterns

```
GET    /api/accounts       -> List all accounts
POST   /api/accounts       -> Create new account
GET    /api/accounts/:id   -> Get one account
PUT    /api/accounts/:id   -> Update one account
DELETE /api/accounts/:id   -> Delete one account
```

### Next.js File Structure

```
app/api/accounts/route.js       -> handles /api/accounts (GET, POST)
app/api/accounts/[id]/route.js  -> handles /api/accounts/:id (GET, PUT, DELETE)
```

---

## What's Next?

In **Lab 9: Next.js React Pages and Components**, you'll build the frontend. You'll create React components that call these API endpoints to display data, navigate between pages, and build a real user interface. The API you built today becomes the backend that powers everything.

---

**Author:** Abdulahi Hassen
