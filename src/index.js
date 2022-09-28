import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ContextProvider } from "./Context"
import App from "./App"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(
   <ContextProvider>
      <StrictMode>
         <App />
      </StrictMode>
   </ContextProvider>
)
