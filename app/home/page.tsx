// This is a Server Component
import { currentUser } from "@clerk/nextjs/server"
import { checkOrCreateUser, findUserByClerkId } from "../actions/user"
import { PasswordManager } from "./passwordManager"
import { SubscriptionModal } from "@/components/modal/paymen-modal"

export default async function Page() {
  const user = await currentUser()
  let subs: boolean = false
  const userId = user?.id || null
  // Cek apakah user ada di database
  let existingUser = userId ? await findUserByClerkId(userId) : null
  if (!existingUser) {
    const createUser = userId ? await checkOrCreateUser(userId) : null
    existingUser = createUser
  }
  subs = existingUser!.subscribed ?? false

  return (
    <div className="min-h-screen bg-slate-800 p-4">
      {/* Pass subscription modal directly in the page */}
      <SubscriptionModal userId={userId} isSubscribed={subs} />
      <PasswordManager userId={userId} />
    </div>
  )
}

