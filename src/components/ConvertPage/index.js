import React from "react"
import Header from "../Header"
import { styled } from "@material-ui/core/styles"

const Container = styled("div")({
  backgroundImage: `linear-gradient(to right,#000813,#000f26)`,
  minHeight: "100vh",
})

export const ConvertPage = () => {
  return (
    <Container>
      <Header />
    </Container>
  )
}

export default ConvertPage
