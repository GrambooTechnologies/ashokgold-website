import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { ensureAdminPasswordHash, loginAdmin } from "@/shop/store"

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
})

function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")

    await ensureAdminPasswordHash()
    const success = await loginAdmin(username.trim(), password)

    setLoading(false)
    if (!success) {
      setError("Invalid username or password")
      return
    }

    navigate({ to: "/admin" })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4EDD6] px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-3xl border border-[#C8AD7B] bg-[#FAF5EA] p-8 shadow-elegant">
        <p className="text-xs uppercase tracking-[0.2em] text-[#AA6200]">Admin</p>
        <h1 className="mt-2 text-4xl">Admin Login</h1>
        <p className="mt-2 text-sm text-[#5A4420]">Default credentials: admin / admin321</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">Username</label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#C8AD7B] bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[#AA6200] px-4 py-2.5 text-sm font-medium text-[#F4EDD6]"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  )
}
