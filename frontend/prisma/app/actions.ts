'use server'

import { createUser } from "@/lib/mysql"
import { revalidatePath } from "next/cache"

export async function addUser(username: string, email: string) {
  await createUser(username, email)
  revalidatePath('/', 'layout')
}

