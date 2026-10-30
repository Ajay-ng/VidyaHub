
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { GraduationCap, Eye, EyeOff } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Login() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)

    const studentId = formData.get("studentId")?.toString().trim()
    const password = formData.get("password")?.toString()

    setLoading(true)

    // Demo login credentials
    if (
      studentId === "student123@gmail.com" &&
      password === "123456"
    ) {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("studentId", studentId)

      navigate("/dashboard", { replace: true })
    } else {
      setError("Invalid student ID or password. Please try again.")
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10 text-foreground">

      <Card className="w-full max-w-lg rounded-none border shadow-lg">

        {/* Header */}
        <CardHeader className="space-y-5 px-8 pt-9">

          {/* Centered Graduation Cap */}
          <div className="flex w-full justify-center">
            <div className="flex size-[72px] items-center justify-center rounded-[20px] bg-blue-700 text-white">
              <GraduationCap className="size-12" />
            </div>
          </div>

          {/* Centered VIDYAHUB Heading */}
          <div className="space-y-3 text-center">
            <CardTitle className="text-3xl font-bold uppercase tracking-wide">
              VIDYAHUB
            </CardTitle>

            <CardDescription className="text-base">
              Student Portal — Sign in to continue
            </CardDescription>
          </div>

        </CardHeader>

        {/* Login Form */}
        <CardContent className="px-8 pb-9 pt-7">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Student ID or Email */}
            <div className="space-y-2">
              <Label
                htmlFor="studentId"
                className="text-sm font-semibold uppercase tracking-wide"
              >
                Student ID or Email
              </Label>

              <Input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="Enter your student ID"
                autoComplete="username"
                required
                disabled={loading}
                onChange={() => setError("")}
                className="h-11 rounded-none border-0 border-b border-border px-0 text-base shadow-none focus-visible:border-primary focus-visible:ring-0"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold uppercase tracking-wide"
              >
                Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  onChange={() => setError("")}
                  className="h-11 rounded-none border-0 border-b border-border px-0 pr-10 text-base shadow-none focus-visible:border-primary focus-visible:ring-0"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-6" />
                  ) : (
                    <Eye className="size-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-none bg-blue-700 font-semibold uppercase tracking-wide text-white hover:bg-blue-800"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Footer Message */}
            <p className="pt-1 text-center text-sm text-muted-foreground">
              Having trouble signing in? Contact your school administrator.
            </p>

          </form>

        </CardContent>
      </Card>

    </main>
  )
}
