import React from "react"
import { styled } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import DescriptionIcon from "@material-ui/icons/Description"
import NextWeekIcon from "@material-ui/icons/NextWeek"
import SchoolIcon from "@material-ui/icons/School"
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary"
import GitHubIcon from "@material-ui/icons/GitHub"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"

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
  "& .icon": {
    marginRight: 6,
    fontSize: 14,
  },
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
      <B href="https://docs.universaldatatool.com">
        <DescriptionIcon className="icon" />
        Docs
      </B>
      <B href="/convert">
        <NextWeekIcon className="icon" />
        Convert
      </B>
      <B href="/courses">
        <SchoolIcon className="icon" />
        Courses
      </B>
      <B href="https://www.youtube.com/playlist?list=PLy9z5rqheGWLDN2zWekdzsqZMneQ6eYyJ">
        <VideoLibraryIcon className="icon" />
        Contributor Video Series
      </B>
      <B href="https://github.com/UniversalDataTool/universal-data-tool">
        <GitHubIcon className="icon" />
        Github
      </B>
      <B href="/app/">
        <PlayCircleFilledIcon className="icon" />
        Use Online
      </B>
    </Container>
  )
}

export default Header
