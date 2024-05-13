import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function createUser(name: string, email: string) {
  const user = await prisma.user.create(
    {
      data: {
        name,
        email
      }
    }
  )
  return user
}

export async function getAllUsers() {
  return await prisma.user.findMany()
}
