import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, HashRouter } from "react-router"
import "./index.css"
import App from "./App"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "./components/ui/sidebar"

const isElectron = window.location.protocol === "file:"
const Router = isElectron ? HashRouter : BrowserRouter

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Router>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </Router>
    </ThemeProvider>
  </StrictMode>
)
