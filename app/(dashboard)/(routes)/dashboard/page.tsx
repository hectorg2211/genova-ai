import { UserButton } from '@clerk/nextjs'

export default function Dashboard() {
  return (
    <div>
      <p>Dashboard Page (Protected)</p>

      <UserButton />
    </div>
  )
}
