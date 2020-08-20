import React from "react"
import { styled } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

const Container = styled("div")({
  minHeight: 100,
  paddingLeft: 50,
  paddingRight: 50,
  alignItems: "center",
  display: "flex",
  marginBottom: 100,
  flexWrap: "wrap",
})
const Text = styled(Button)({
  fontSize: 18,
  fontWeight: 700,
  color: "#fff",
})
const The = styled("span")({
  borderBottom: `1px solid rgba(255, 255, 255, 0.5)`,
  marginRight: 8,
})
const B = styled(Button)({
  fontSize: 14,
  margin: 8,
  color: "#76adff",
  "&.app": {
    backgroundColor: "#0062f4",
    color: "#fff",
  },
})

export const Header = () => {
  return (
    <Container>
      <Text href="/">
        <The>UDT</The>
      </Text>
      <Box flexGrow={1} />
      <B href="/courses">Courses</B>
      <B href="https://www.youtube.com/playlist?list=PLy9z5rqheGWLDN2zWekdzsqZMneQ6eYyJ">
        Contributor Video Series
      </B>
      <B href="https://github.com/UniversalDataTool/universal-data-tool">
        Github
      </B>
      <B className="app" href="/app/">
        Use Online
      </B>
    </Container>
  )
}

export default Header
