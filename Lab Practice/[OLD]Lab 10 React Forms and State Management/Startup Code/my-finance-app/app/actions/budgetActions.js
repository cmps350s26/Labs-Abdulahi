"use server";

import budgetsRepo from "@/repos/BudgetsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBudgetAction(formData) {
    // TODO 5a: const data = Object.fromEntries(formData)
    // TODO 5b: Coerce data.budgeted, data.spent, data.year to Number
    // TODO 5c: Call budgetsRepo.create(data), revalidatePath("/budgets"), redirect("/budgets")
}

export async function updateBudgetAction(formData) {
    // TODO 6a: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 6b: Coerce fields.budgeted, fields.spent, fields.year to Number
    // TODO 6c: Call budgetsRepo.update(id, fields), revalidatePath("/budgets"), redirect("/budgets")
}

export async function deleteBudgetAction(id) {
    // TODO 7a: Call budgetsRepo.delete(id)
    // TODO 7b: revalidatePath("/budgets") and revalidatePath("/")
}
