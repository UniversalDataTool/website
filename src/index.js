import React from "react"
import ReactDOM from "react-dom"
import App from "./App"

if (window.location.search.includes("?s=")) {
  window.location.href =
    "https://universaldatatool.com/app/" + window.location.search
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
