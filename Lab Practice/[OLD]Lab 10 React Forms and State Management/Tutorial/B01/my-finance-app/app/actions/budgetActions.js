"use server";

import budgetsRepo from "@/repos/BudgetsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBudgetAction(formData) {
    // TODO 5a: const data = Object.fromEntries(formData)
    // TODO 5b: Coerce data.budgeted, data.spent, data.year to Number
    // TODO 5c: Call budgetsRepo.create(data), revalidatePath("/budgets"), redirect("/budgets")

    const data = Object.fromEntries(formData)
    data.budgeted = Number(data.budgeted);
    data.spent = Number(data.spent || 0);
    data.year = Number(data.year);

    await budgetsRepo.create(data);

    // reload the budgets page to show the new budget
    revalidatePath("/budgets");

    // navigate to the budgets page after creating a new budget
    redirect("/budgets");

}

export async function updateBudgetAction(formData) {
    // TODO 6a: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 6b: Coerce fields.budgeted, fields.spent, fields.year to Number
    // TODO 6c: Call budgetsRepo.update(id, fields), revalidatePath("/budgets"), redirect("/budgets")

    const { id, ...fields } = Object.fromEntries(formData);
    fields.budgeted = Number(fields.budgeted);
    fields.spent = Number(fields.spent || 0);
    fields.year = Number(fields.year);

    await budgetsRepo.update(id, fields);
    // reload the budgets page to show the updated budget
    revalidatePath("/budgets");
    // navigate to the budgets page after updating the budget
    redirect("/budgets");
}

export async function deleteBudgetAction(id) {
    // TODO 7a: Call budgetsRepo.delete(id)
    // TODO 7b: revalidatePath("/budgets") and revalidatePath("/")

    try {
        await budgetsRepo.delete(id);
        // reload the budgets page and the home page to reflect the deleted budget
        revalidatePath("/budgets");
        revalidatePath("/");
    } catch (e) {
        return e;
    }
}
