import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
export default async function Auth() {
  const user = await currentUser()
  const userId = user?.id
  console.log(userId)

  return (
    <main className="min-h-screen bg-[#1d3c4b] flex flex-col items-center px-4 py-20">
      <div className="w-full max-w-md space-y-8 py-20">
        <div className="flex justify-center">
          <Image src="/images/LOGO.png" alt="Logo" width={80} height={80} className="mb-8" />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-[#7dd1e4] text-3xl font-medium">Save your Account Here</h1>
          <p className="text-[#7dd1e4]/80 text-sm">
            With this application it will be easier for you
            <br />
            to save as many accounts as possible
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <SignInButton mode="modal">
            <Button asChild className="w-full py-6 text-base bg-[#7dd1e4] hover:bg-[#7dd1e4]/90 text-[#1d3c4b]">
              <span>Login</span>
            </Button>
          </SignInButton>
        </div>

        {/* Sign up link */}
        <div className="text-center pt-4">
          <p className="text-[#7dd1e4]/80">
            Don&apos;t have an account?
            <SignUpButton mode="modal">
              <span className="text-[#98ff7c] hover:underline cursor-pointer">Sign up</span>
            </SignUpButton>
          </p>
        </div>
      </div>
    </main>
  )
}

