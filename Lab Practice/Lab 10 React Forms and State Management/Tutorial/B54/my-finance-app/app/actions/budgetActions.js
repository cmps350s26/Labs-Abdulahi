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

    const data = Object.fromEntries(formData);
    data.budgeted = Number(data.budgeted);
    data.spent = Number(data.spent);
    data.year = Number(data.year);

    const errors = {};
    if (!data.category) errors.category = "Category is required";
    if (isNaN(data.budgeted) || data.budgeted <= 0) errors.budgeted = "Budgeted amount must be greater than 0";
    if (!data.month) errors.month = "Month is required";
    if (isNaN(data.year) || data.year < 2020) errors.year = "Year must be 2020 or later";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await budgetsRepo.create(data);

    revalidatePath("/");
    redirect("/budgets");
}

export async function updateBudgetAction(prevState, formData) {
    // TODO 6a: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 6b: Coerce fields.budgeted, fields.spent, fields.year to Number
    // TODO 6c: Validate (same rules as create). Return errors if any fail.
    // TODO 6d: await budgetsRepo.update(id, fields)
    // TODO 6e: revalidatePath("/") then redirect("/budgets")

    const { id, ...fields } = Object.fromEntries(formData);
    fields.budgeted = Number(fields.budgeted);
    fields.spent = Number(fields.spent);
    fields.year = Number(fields.year);

    const errors = {};
    if (!fields.category) errors.category = "Category is required";
    if (isNaN(fields.budgeted) || fields.budgeted <= 0) errors.budgeted = "Budgeted amount must be greater than 0";
    if (!fields.month) errors.month = "Month is required";
    if (isNaN(fields.year) || fields.year < 2020) errors.year = "Year must be 2020 or later";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await budgetsRepo.update(id, fields);

    revalidatePath("/");
    redirect("/budgets");
}

export async function deleteBudgetAction(id) {
    // TODO 7a: await budgetsRepo.delete(id)
    // TODO 7b: revalidatePath("/")

    await budgetsRepo.delete(id);

    revalidatePath("/");
}
