"use server"

import { prisma } from "@/lib/prisma"

/**
 * Find a user by their Clerk ID
 * @param clerkId The Clerk user ID to search for
 * @returns The user object if found, null otherwise
 */
type User = {
  id: number;
  iduserclerk: string;
  subscribed:boolean;

  // Tambahkan kolom lain yang ada di tabel users
};
export async function findUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.$queryRaw<User[]>`
      SELECT * FROM "users" WHERE "iduserclerk" = ${clerkId} LIMIT 1;
    `;

    return user.length > 0 ? user[0] : null; // Pastikan jika kosong, return null
  } catch (error) {
    console.error("Error finding user by Clerk ID:", error);
    throw new Error("Failed to find user in database");
  }
}


/**
 * Check if a user exists by Clerk ID, create if they don't
 * @param clerkId The Clerk user ID
 * @returns The existing or newly created user
 */
export async function checkOrCreateUser(clerkId: string): Promise<User> {
  try {
    const user = await prisma.users.create({
      data: {
        iduserclerk: clerkId,
        subscribed: false, 
      }
    });
    return {
      id: user.id,
      iduserclerk: user.iduserclerk,
      subscribed: user.subscribed ?? false, // Pastikan tidak null
    };
  } catch (error) {
    console.error("Error checking or creating user:", error);
    throw new Error("Failed to check or create user in database");
  }
}

