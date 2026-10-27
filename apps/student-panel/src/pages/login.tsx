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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const studentId = formData.get("studentId")?.toString().trim()
    const password = formData.get("password")?.toString()

    if (studentId === "student" && password === "Student@123") {
      navigate("/")
    } else {
      setError("Invalid Student ID or password.")
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10 text-foreground">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="items-center space-y-3 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <GraduationCap className="size-12" />
          </div>

          <CardTitle className="text-3xl font-bold">Vidyahub</CardTitle>

          <CardDescription>
            Student Portal — Sign in to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID or Email</Label>
              <Input
                id="studentId"
                name="studentId"
                type="text"
                placeholder="Enter your student ID"
                autoComplete="username"
                required
                onChange={() => setError("")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="pr-10"
                  required
                  onChange={() => setError("")}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-6" />
                  ) : (
                    <Eye className="size-6" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Having trouble signing in? Contact your school administrator.
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
