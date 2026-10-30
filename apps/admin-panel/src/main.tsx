
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, HashRouter } from "react-router-dom"

import "./index.css"
import App from "./App"

import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "./components/ui/sidebar"

// Detect whether the application is running inside Electron
const isElectron = window.location.protocol === "file:"

// Select the appropriate router
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
  