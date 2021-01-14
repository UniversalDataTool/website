import React from "react"
import Theme from "./components/Theme"
import LandingPage from "./components/LandingPage"
import PremiumLandingPage from "./components/PremiumLandingPage"
import ConvertPage from "./components/ConvertPage"

function App() {
  return (
    <Theme>
      <>
        {window.location.href.includes("/convert") ? (
          <ConvertPage />
        ) : window.location.href.includes("/scale") ? (
          <PremiumLandingPage />
        ) : (
          <LandingPage />
        )}
      </>
    </Theme>
  )
}

export default App
