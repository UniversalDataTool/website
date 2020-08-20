import React, { useState, useEffect } from "react"
import { styled } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import Theme from "./components/Theme"
import Header from "./components/Header"
import CenteredContent from "./components/CenteredContent"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"

import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage"
import GetAppIcon from "@material-ui/icons/GetApp"
import GithubIcon from "@material-ui/icons/GitHub"
import StarIcon from "@material-ui/icons/Star"

// https://colordesigner.io/#004B8D-1B76FF-374140-2A2C2B-BDC3C7
const Container = styled("div")({})
const Section1 = styled("div")({
  backgroundImage: `linear-gradient(to right,#000813,#000f26)`,
})
const Section2 = styled("div")({
  backgroundColor: "#000f26",
  minHeight: 800,
})
const Section3 = styled("div")({
  backgroundColor: "#001738",
  minHeight: 800,
})
const HeroTitle = styled("div")({
  fontSize: 60,
  color: "#fff",
  fontWeight: 700,
  textAlign: "center",
})
const HeroSubtitle = styled("div")({
  fontSize: 22,
  marginTop: 48,
  color: colors.grey[400],
  textAlign: "center",
  maxWidth: "70%",
  lineHeight: 1.5,
})
const HeroButton = styled(Button)({
  margin: 16,
  fontSize: 18,
  color: colors.grey[100],
  borderColor: "rgba(255,255,255,0.3)",
  "& .icon": {
    fontSize: 22,
    marginRight: 8,
  },
  "&.useonline": {
    backgroundColor: "#0062f4",
  },
})
const L = styled("a")({
  textDecoration: "none",
  "&&&": {
    color: "#2a7fff",
  },
})

const Category = styled("div")({
  marginTop: 128,
  color: "#76adff",
  fontWeight: 500,
  fontSize: 16,
})
const SectionHeader = styled("div")({
  color: "#fff",
  fontSize: 32,
  marginTop: 16,
  fontWeight: 700,
})
const SectionText = styled("div")({
  marginTop: 16,
  color: colors.grey[400],
  fontSize: 20,
  lineHeight: 1.5,
})

function App() {
  const [stars, setStars] = useState(null)
  useEffect(() => {
    if (stars !== null) return
    fetch("https://api.github.com/repos/UniversalDataTool/universal-data-tool")
      .then((r) => r.json())
      .then((r) => {
        setStars(r.stargazers_count)
      })
  }, [])
  return (
    <Theme>
      <Container>
        <Section1>
          <Header />
          <CenteredContent>
            <HeroTitle>Universal Data Tool</HeroTitle>
            <Box width="100%" display="flex" justifyContent="center">
              <HeroSubtitle>
                An{" "}
                <L href="https://github.com/UniversalDataTool/universal-data-tool">
                  open-source tool
                </L>{" "}
                for creating and labeling datasets of images, audio, text,
                documents and video in an{" "}
                <L href="https://github.com/UniversalDataTool/udt-format">
                  open data format
                </L>
                .
              </HeroSubtitle>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              marginTop={4}
              flexWrap="wrap"
              paddingBottom={24}
            >
              <HeroButton
                href="https://github.com/UniversalDataTool/universal-data-tool/releases"
                variant="outlined"
              >
                <GetAppIcon className="icon" />
                Download
              </HeroButton>
              <HeroButton
                href="/app"
                variant="outlined"
                className={"useonline"}
              >
                <EmojiFoodBeverageIcon className="icon" />
                Use Online
              </HeroButton>
              <HeroButton
                href="https://github.com/UniversalDataTool/universal-data-tool"
                variant="outlined"
              >
                <GithubIcon className="icon" />
                Become Star {stars ? stars + 1 : "..."}
              </HeroButton>
            </Box>
          </CenteredContent>
        </Section1>
        <Section2>
          <CenteredContent>
            <Category>Simplicity and Power</Category>
            <SectionHeader>Easy for everyone</SectionHeader>
            <SectionText>
              The Universal Data Tool can be used by anyone on your team, no
              data or programming skills needed. Simplicity without sacrificing
              any powerful developer features and integrations.
            </SectionText>
          </CenteredContent>
        </Section2>
        <Section3>{/*  */}</Section3>
        <Section2>{/*  */}</Section2>
        <Section3>{/*  */}</Section3>
      </Container>
    </Theme>
  )
}

export default App
