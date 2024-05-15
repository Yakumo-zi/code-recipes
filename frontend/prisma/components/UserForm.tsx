'use client'

import { addUser } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function UserForm() {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  return <form>
    <div>
      <label htmlFor="username">username:</label>
      <input id="username" name="username" type="text" onChange={e => setUserName(e.target.value)} value={username} />
    </div>
    <div>
      <label htmlFor="email">email:</label>
      <input type="text" id="email" name="email" onChange={e => setEmail(e.target.value)} value={email} />
    </div>
    <Button formAction={() => addUser(username, email)}>add</Button>
  </form>
}
