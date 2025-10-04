/* "use client"

import { UserButton as ClerkUserButton } from "@clerk/nextjs"

export function UserButton() {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: "w-8 h-8",
          userButtonTrigger: "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
        }
      }}
      showName={false}
      afterSignOutUrl="/"
    />
  )
} */