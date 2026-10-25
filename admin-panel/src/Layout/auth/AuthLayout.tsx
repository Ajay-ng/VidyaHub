import { Outlet } from "react-router"

function AuthLayout() {
  return (
    <main className="h-screen w-full items-center justify-center">
      <Outlet />
    </main>
  )
}

export default AuthLayout
