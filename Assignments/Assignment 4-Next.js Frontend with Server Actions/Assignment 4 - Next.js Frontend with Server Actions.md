<p align="center">
<strong>Qatar University</strong><br>
College of Engineering - Department of Computer Science and Engineering<br>
<strong>CMPS 350 - Web Development</strong>
</p>

---

# Assignment 4: Next.js Frontend with Server Actions

**Graded out of:** 100%
**Deadline:** Saturday, May 2, 2026 - 11:59 PM

---

## Overview

In Assignment 3 you built the RecipeVault backend (API routes + repo). The vanilla JS client in `public/client/` was provided.

In Assignment 4 you **rebuild that vanilla client as a Next.js app**: same features, same look — but with React components, file-based routes, and Server Actions instead of `document.querySelector`, `innerHTML`, and `fetch()`.

The Assignment 3 backend is provided as a complete working solution. **Do not modify** the API routes, the repo, the data, the vanilla client, or `globals.css`. You build the Next.js frontend on top.

> **Spec:** open `http://localhost:3000/client/index.html` (the vanilla version) side-by-side with your app at `http://localhost:3000/`. They should behave the same.

---

## How to Get Started

1. Get the starter from the shared lab repo ([`Labs-Abdulahi`](https://github.com/cmps350s26/Labs-Abdulahi)) under `Assignments/Assignment 4 - Next.js Frontend with Server Actions`. Copy it into your own repo at the same path.
2. In `recipevault-app`, run `npm install`, then `npm run dev`.
3. Visit `http://localhost:3000/client/index.html` to confirm the Assignment 3 client still works.
4. Visit `http://localhost:3000/` to see the placeholder Dashboard you'll replace.

---

## What's Provided vs. What You Build

| Provided (do**not** modify)              | Where                    |
| ---------------------------------------------- | ------------------------ |
| API routes (GET / POST / PUT / DELETE / stats) | `app/api/recipes/`     |
| `RecipesRepo` class                          | `repos/RecipesRepo.js` |
| Seed data (10 recipes)                         | `data/recipes.json`    |
| Vanilla JS client (your spec)                  | `public/client/`       |
| Global CSS — all class names you need         | `app/globals.css`      |

| You build         | Where                                                 |
| ----------------- | ----------------------------------------------------- |
| Server Actions    | **You create** `app/actions/recipeActions.js` |
| React components  | **You create** `app/components/` (3 files)    |
| Recipes list page | **You create** `app/recipes/page.jsx`         |
| Recipe form page  | **You create** `app/recipes/form/page.jsx`    |
| Dashboard body    | Fill in the provided stub at `app/page.js`          |
| Layout wiring     | Fill in the provided stub at `app/layout.js`        |

> **You create the folders yourself** — Next.js uses **file-based routing**, so where you put a `page.jsx` *is* its URL. Picking the right folder path is part of the grade.

---

## Routes You Must Implement

| URL                             | File you create                       | Type                                       |
| ------------------------------- | ------------------------------------- | ------------------------------------------ |
| `/`                           | `app/page.js` *(already stubbed)* | Server Component (Dashboard)               |
| `/recipes`                    | `app/recipes/page.jsx`              | Client Component (list + filters + delete) |
| `/recipes/form`               | `app/recipes/form/page.jsx`         | Add mode                                   |
| `/recipes/form?id=…&name=…` | *(same file)*                       | Edit mode (detect via query params)        |

---

## What Each Piece Does

### Server Actions — `app/actions/recipeActions.js`

Three actions. Each calls the repo and refreshes cached pages. Create + Update validate inputs and return errors so the form can display them; Create + Update redirect back to `/recipes` on success.

- `createRecipeAction(prevState, formData)`
- `updateRecipeAction(prevState, formData)` — needs the recipe id from the form
- `deleteRecipeAction(id)`

### Components — `app/components/`

- **`NavBar.jsx`** — top nav with brand link to `/` and links to `/recipes` and `/recipes/form`. Use Next's client-side navigation.
- **`RecipeCard.jsx`** — one card showing image, name, description, prepTime, cookTime, servings, difficulty badge. Includes an Edit link (carries the recipe to the form so it pre-fills) and a Delete button (asks the parent to delete).
- **`RecipeForm.jsx`** — shared Add/Edit form. Detects mode from query params, picks the right server action, exposes validation errors and a pending state to the UI, pre-fills inputs in edit mode, and includes a hidden id field when editing.

### Pages

- **Dashboard (`app/page.js`)** — Server Component. Loads recipes via the repo (no fetch needed) and shows total count + average prep/cook time. Add links to `/recipes` and the add form.
- **Recipes list (`app/recipes/page.jsx`)** — Client Component. Loads from `/api/recipes`, supports a category dropdown + search input (re-fetch when either changes), renders a `recipes-grid` of `RecipeCard`s, and shows a confirmation dialog before deleting.
- **Recipe form (`app/recipes/form/page.jsx`)** — renders `<RecipeForm />`. Add mode when no query params; Edit mode when query params include a recipe id.

### Layout — `app/layout.js`

Render `<NavBar />` above `{children}` so the nav appears on every page. Keep `globals.css` imported.

---

## Grading Rubric

| # | Criteria                                                                                                        | Points        |
| - | --------------------------------------------------------------------------------------------------------------- | ------------- |
| 1 | **Server Actions** — create (with validation), update (with id), delete                                  | **20**  |
| 2 | **NavBar** — links work, rendered in layout                                                              | **5**   |
| 3 | **RecipeCard** — all fields shown, Edit link carries recipe data, Delete button                          | **15**  |
| 4 | **RecipeForm** — shared add/edit, mode detection, validation errors + pending state shown                | **25**  |
| 5 | **Recipes page (`/recipes`)** — created at the correct route, filters work, delete with confirm dialog | **20**  |
| 6 | **Dashboard (`/`)** — Server Component, stats from repo                                                | **10**  |
| 7 | **Layout + Form route (`/recipes/form`)** — layout wires NavBar, form route exists at the correct path | **5**   |
|   | **Total**                                                                                                 | **100** |

---

## Tips

- **Lab 10** is your closest reference — `TransactionForm` and the lab's server actions use the same patterns you need here.
- **Match the vanilla client.** Same fields, same filters, same flow. Open `/client/` next to your app as you build.
- **Reuse the existing CSS classes** — `recipe-card`, `recipe-card-img`, `recipes-grid`, `filter-bar`, `badge`, `stats-grid`, `stat-card`, `navbar`, `brand`, `nav-links`, `form-container`, etc. They're all in `globals.css`. Don't add new styles.
- **Server actions return errors, never throw** — the form expects to receive `{ field: "message" }` and render them.
- **Edit pre-fill trick:** the Edit link can carry the recipe object as query params; the form reads them on mount and uses them as default values.

---

## Target Folder Structure

When you're done, your project should look like this:

```
Assignment 4 - Next.js Frontend with Server Actions/
└── recipevault-app/
    ├── app/
    │   ├── globals.css                    (provided)
    │   ├── layout.js                      (wire NavBar)
    │   ├── page.js                        (Dashboard)
    │   ├── actions/
    │   │   └── recipeActions.js           (server actions — you create)
    │   ├── components/
    │   │   ├── NavBar.jsx                 (you create)
    │   │   ├── RecipeCard.jsx             (you create)
    │   │   └── RecipeForm.jsx             (you create)
    │   ├── recipes/
    │   │   ├── page.jsx                   (list page — you create)
    │   │   └── form/
    │   │       └── page.jsx               (form page — you create)
    │   └── api/recipes/                   (provided, don't modify)
    ├── repos/RecipesRepo.js               (provided)
    ├── data/recipes.json                  (provided)
    └── public/client/                     (provided, don't modify)
```

---

## Deliverables

1. Push your completed `recipevault-app/` to your own repo under `Assignments/Assignment 4 - Next.js Frontend with Server Actions` before **Saturday, May 3, 2026 at 11:59 PM**. **No late submissions.**
2. Complete and submit the **Testing & Grading Sheet** (`Testing-Grading-Sheet.md`) with all required screenshots in a `screenshots/` folder. ⚠️ N**ot submitting it deducts 10 points** from your grade.

Build everything yourself — no AI tools or code generators.
