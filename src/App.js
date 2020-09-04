import React from "react"
import Theme from "./components/Theme"
import LandingPage from "./components/LandingPage"
import ConvertPage from "./components/ConvertPage"

function App() {
  return (
    <Theme>
      <>
        {window.location.href.includes("/convert") ? (
          <ConvertPage />
        ) : (
          <LandingPage />
        )}
      </>
    </Theme>
  )
}

export default App
