import React, { useState, useEffect } from "react"
import { styled } from "@material-ui/core/styles"
import * as colors from "@material-ui/core/colors"
import Theme from "../Theme"
import Header from "../Header"
import CenteredContent from "../CenteredContent"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import sampleGridSrc from "../../assets/sample_grid.png"

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

const SampleGridImage = styled("img")({
  position: "absolute",
  width: 500,
  overflow: "hidden",
  borderRadius: 8,
  top: 120,
  left: "calc(50% + 100px)",
  boxShadow: "-8px 8px 64px rgba(0,0,0,0.5)",
  transform: "rotate3d(1,1,1,-60deg)",
})

const ItemContainer = styled("div")({
  paddingTop: 48,
})
const Item = styled("div")({
  marginTop: 48,
  paddingLeft: 16,
  borderLeft: "2px solid #0044a9",
})
const ItemHeader = styled("div")({
  fontSize: 24,
  fontWeight: 700,
  color: "#fff",
})
const ItemDescription = styled("div")({
  paddingTop: 16,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.5,
  color: colors.grey[500],
})

function LandingPage() {
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
            <HeroButton href="/app/" variant="outlined" className={"useonline"}>
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
            The Universal Data Tool can be used by anyone on your team, no data
            or programming skills needed. Simplicity without sacrificing any
            powerful developer features and integrations.
          </SectionText>
        </CenteredContent>
        <Box position="relative" overflow="hidden" width="100%" minHeight={600}>
          <CenteredContent>
            <Grid container>
              <Grid item xs={6}>
                <ItemContainer>
                  <Item>
                    <ItemHeader>Easy/No Install</ItemHeader>
                    <ItemDescription>
                      Use the Universal Data Tool directly from a web browser or
                      with a Windows, Mac or Linux desktop application.
                    </ItemDescription>
                  </Item>
                  <Item>
                    <ItemHeader>Real-time Collaboration</ItemHeader>
                    <ItemDescription>
                      Join a link to a collaborative session and see dataset
                      samples from team members complete in real time.
                    </ItemDescription>
                  </Item>
                  <Item>
                    <ItemHeader>Easy Import from AWS</ItemHeader>
                    <ItemDescription>
                      Import from your S3 buckets easily with IAM or Cognito
                      authentication.
                    </ItemDescription>
                  </Item>
                </ItemContainer>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </CenteredContent>
          <SampleGridImage src={sampleGridSrc} />
        </Box>
      </Section2>
      <Section3>
        <CenteredContent>
          <Category>Community</Category>
          <SectionHeader>Built Community-First</SectionHeader>
          <SectionText>
            Working together, we can accomplish more. The Universal Data Tool
            was built to bring together the best ideas from different machine
            learning communities. Check out our{" "}
            <L href="https://universaldatatool.slack.com">Slack</L>,{" "}
            <L href="https://github.com/UniversalDataTool/universal-data-tool/blob/master/CONTRIBUTING.md">
              Contribution Guide
            </L>{" "}
            and{" "}
            <L href="https://www.youtube.com/playlist?list=PLy9z5rqheGWLDN2zWekdzsqZMneQ6eYyJ">
              Community Update Video Series
            </L>
            .
          </SectionText>
          <Box textAlign="center" paddingTop="96px" paddingBottom="96px">
            <iframe
              width="711"
              height="400"
              src="https://www.youtube.com/embed/uQ1ITe88TM8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Box>
        </CenteredContent>
        <Box height={60} />
      </Section3>
      <Section2>
        <CenteredContent>
          <Category>Training</Category>
          <SectionHeader>
            Train your labelers with <L href="/courses">Courses</L>
          </SectionHeader>
          <SectionText>
            Upload your dataset to <L href="/courses">Courses</L> to create a
            training course. Testing and exercises validate that your workforce
            knows exactly how the data should be labeled.
          </SectionText>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ItemContainer>
                <Item>
                  <ItemHeader>Totally Free, No Sign Up</ItemHeader>
                  <ItemDescription>
                    Get started in less than a minute. Courses uses
                    administrator links. No sign up needed.
                  </ItemDescription>
                </Item>
                <Item>
                  <ItemHeader>View Certified Labelers</ItemHeader>
                  <ItemDescription>
                    View all labelers that have passed, or programmatically
                    query and integrate certification into your workforce
                    system.
                  </ItemDescription>
                </Item>
                <Item>
                  <ItemHeader>Create Tests and Exercises</ItemHeader>
                  <ItemDescription>
                    Create testing where labelers must match the Intersection
                    over Union error of a segmentation, classifications and
                    more.
                  </ItemDescription>
                </Item>
              </ItemContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box textAlign="center" paddingTop="160px">
                <iframe
                  width="444"
                  height="250"
                  src="https://www.youtube.com/embed/2XXENmAIyzE"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Box>
            </Grid>
          </Grid>
        </CenteredContent>
        <Box height={140} />
      </Section2>
      <Section3>
        <CenteredContent>
          <Category>Jupyter</Category>
          <SectionHeader>Label data directly in Jupyter Notebook</SectionHeader>
          <SectionText>
            Import the Universal Data Tool pip module to label data, create
            collaborative sessions and transform datasets.
          </SectionText>
        </CenteredContent>
      </Section3>
    </Container>
  )
}

export default LandingPage
