'use client'

import { useActionState } from 'react'
import { signIn, type ActionState } from '../actions'
import { ErrorNote, FieldLabel, SubmitButton, inputClass } from './fields'

export default function LoginForm() {
  const [state, action] = useActionState<ActionState, FormData>(signIn, null)

  return (
    <form action={action} className="flex flex-col gap-5">
      <label className="block">
        <FieldLabel>Email</FieldLabel>
        <input name="email" type="email" autoComplete="email" required className={inputClass} />
      </label>
      <label className="block">
        <FieldLabel>Password</FieldLabel>
        <input name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </label>
      <ErrorNote error={state?.error} />
      <div>
        <SubmitButton>Sign in</SubmitButton>
      </div>
    </form>
  )
}
