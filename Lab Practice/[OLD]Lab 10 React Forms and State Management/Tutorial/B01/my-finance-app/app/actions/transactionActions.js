"use server";

import transactionsRepo from "@/repos/TransactionsRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransactionAction(formData) {
    // TODO 1a: Convert formData to object: const data = Object.fromEntries(formData)
    // TODO 1b: Coerce amount to number: data.amount = Number(data.amount)
    // TODO 1c: Call transactionsRepo.create(data)
    // TODO 1d: Call revalidatePath("/transactions") then redirect("/transactions")

    const data = Object.fromEntries(formData);
    data.amount = Number(data.amount);

    await transactionsRepo.create(data);

    // reload the transactions page to show the new transaction
    revalidatePath("/transactions");

    // navigate to the transactions page after creating a new transaction
    redirect("/transactions");

}

export async function updateTransactionAction(formData) {
    // TODO 2a: Convert formData: const { id, ...fields } = Object.fromEntries(formData)
    // TODO 2b: Coerce fields.amount to Number
    // TODO 2c: Call transactionsRepo.update(id, fields)
    // TODO 2d: revalidatePath("/transactions") then redirect("/transactions")

    const { id, ...fields } = Object.fromEntries(formData);
    fields.amount = Number(fields.amount);

    await transactionsRepo.update(id, fields);

    // reload the transactions page to show the updated transaction
    revalidatePath("/transactions");

    // navigate to the transactions page after updating the transaction
    redirect("/transactions");
}

export async function deleteTransactionAction(id) {
    // TODO 3a: Call transactionsRepo.delete(id)
    // TODO 3b: revalidatePath("/transactions") and revalidatePath("/")

    await transactionsRepo.delete(id);

    // reload the transactions page and the home page to reflect the deleted transaction
    revalidatePath("/transactions");
    revalidatePath("/");
}
