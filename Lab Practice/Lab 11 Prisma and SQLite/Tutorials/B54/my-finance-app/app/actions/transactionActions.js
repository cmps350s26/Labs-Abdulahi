"use server";

import transactionsRepo from "@/repos/TransactionsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransactionAction(prevState, formData) {
    const data = Object.fromEntries(formData);
    data.amount = Number(data.amount);

    const errors = {};
    if (!data.description?.trim()) errors.description = "Description is required";
    if (!data.amount || data.amount <= 0) errors.amount = "Amount must be greater than 0";
    if (!data.date) errors.date = "Date is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await transactionsRepo.create(data);
    revalidatePath("/");
    redirect("/transactions");
}

export async function updateTransactionAction(prevState, formData) {
    const { id, ...fields } = Object.fromEntries(formData);
    fields.amount = Number(fields.amount);

    const errors = {};
    if (!fields.description?.trim()) errors.description = "Description is required";
    if (!fields.amount || fields.amount <= 0) errors.amount = "Amount must be greater than 0";
    if (!fields.date) errors.date = "Date is required";

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    await transactionsRepo.update(id, fields);
    revalidatePath("/");
    redirect("/transactions");
}

export async function deleteTransactionAction(id) {
    await transactionsRepo.delete(id);
    revalidatePath("/");
}
