"use server";

import transactionsRepo from "@/repos/TransactionsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransactionAction(prevState, formData) {
    // TODO 1a: const data = Object.fromEntries(formData)
    // TODO 1b: data.amount = Number(data.amount)
    // TODO 1c: Validate — build errors object:
    //   if (!data.description?.trim()) errors.description = "Description is required"
    //   if (!data.amount || data.amount <= 0) errors.amount = "Amount must be greater than 0"
    //   if (!data.date) errors.date = "Date is required"
    //   if (Object.keys(errors).length > 0) return errors
    // TODO 1d: await transactionsRepo.create(data)
    // TODO 1e: revalidatePath("/") then redirect("/transactions")
}

export async function updateTransactionAction(prevState, formData) {
    // TODO 2a: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 2b: fields.amount = Number(fields.amount)
    // TODO 2c: Validate (same rules as create). Return errors if any fail.
    // TODO 2d: await transactionsRepo.update(id, fields)
    // TODO 2e: revalidatePath("/") then redirect("/transactions")
}

export async function deleteTransactionAction(id) {
    // TODO 3a: await transactionsRepo.delete(id)
    // TODO 3b: revalidatePath("/")
}
