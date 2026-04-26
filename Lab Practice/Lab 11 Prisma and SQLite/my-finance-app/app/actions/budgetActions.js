"use server";

import budgetsRepo from "@/repos/BudgetsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBudgetAction(prevState, formData) {
    const data = Object.fromEntries(formData);
    data.budgeted = Number(data.budgeted);
    data.spent = Number(data.spent || 0);
    data.year = Number(data.year);

    const errors = {};
    if (!data.category?.trim()) errors.category = "Category is required";
    if (!data.budgeted || data.budgeted <= 0) errors.budgeted = "Budget amount must be greater than 0";
    if (!data.month) errors.month = "Month is required";
    if (!data.year || data.year < 2020) errors.year = "Valid year is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await budgetsRepo.create(data);
    revalidatePath("/");
    redirect("/budgets");
}

export async function updateBudgetAction(prevState, formData) {
    const { id, ...fields } = Object.fromEntries(formData);
    fields.budgeted = Number(fields.budgeted);
    fields.spent = Number(fields.spent || 0);
    fields.year = Number(fields.year);

    const errors = {};
    if (!fields.category?.trim()) errors.category = "Category is required";
    if (!fields.budgeted || fields.budgeted <= 0) errors.budgeted = "Budget amount must be greater than 0";
    if (!fields.month) errors.month = "Month is required";
    if (!fields.year || fields.year < 2020) errors.year = "Valid year is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await budgetsRepo.update(id, fields);
    revalidatePath("/");
    redirect("/budgets");
}

export async function deleteBudgetAction(id) {
    await budgetsRepo.delete(id);
    revalidatePath("/");
}
