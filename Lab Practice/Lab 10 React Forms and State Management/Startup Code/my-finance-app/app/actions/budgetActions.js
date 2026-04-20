"use server";

import budgetsRepo from "@/repos/BudgetsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBudgetAction(prevState, formData) {
    // TODO 5a: const data = Object.fromEntries(formData)
    // TODO 5b: Coerce data.budgeted, data.spent, data.year to Number
    // TODO 5c: Validate — category not empty, budgeted > 0, month not empty, year >= 2020
    //   Return errors if any fail
    // TODO 5d: await budgetsRepo.create(data)
    // TODO 5e: revalidatePath("/") then redirect("/budgets")
}

export async function updateBudgetAction(prevState, formData) {
    // TODO 6a: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 6b: Coerce fields.budgeted, fields.spent, fields.year to Number
    // TODO 6c: Validate (same rules as create). Return errors if any fail.
    // TODO 6d: await budgetsRepo.update(id, fields)
    // TODO 6e: revalidatePath("/") then redirect("/budgets")
}

export async function deleteBudgetAction(id) {
    // TODO 7a: await budgetsRepo.delete(id)
    // TODO 7b: revalidatePath("/")
}
