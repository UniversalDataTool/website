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
import teamImage from "../../assets/scale-screenshots/screenshot1.png"
import screenshot2 from "../../assets/scale-screenshots/screenshot2.png"
import screenshot3 from "../../assets/scale-screenshots/screenshot3.png"
import screenshot5 from "../../assets/scale-screenshots/screenshot5.png"

import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
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
  maxWidth: "80%",
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
  width: 600,
  overflow: "hidden",
  borderRadius: 8,
  top: 120,
  left: "calc(50% + 100px)",
  boxShadow: "-8px 8px 64px rgba(0,0,0,0.5)",
})
const ScreenshotRowImg = styled("img")({
  position: "absolute",
  width: 500,
  height: 400,
  objectFit: "cover",
  overflow: "hidden",
  borderRadius: 8,
  top: 120,
  left: "calc(33% - 50px)",
  "&:first-child": {
    left: -100,
  },
  "&:last-child": {
    left: "66%",
  },
  boxShadow: "-8px 8px 64px rgba(0,0,0,0.5)",
  transform: "rotate(-30deg)",
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
  return (
    <Container>
      <Section1>
        <Header />
        <CenteredContent>
          <HeroTitle>Universal Data Tool</HeroTitle>
          <HeroTitle style={{ color: "#ffa41b" }}>SCALE EDITION</HeroTitle>
          <Box width="100%" display="flex" justifyContent="center">
            <HeroSubtitle>
              Scale up operations, achieve higher label quality and get top-tier
              support with the backer-exclusive{" "}
              <span style={{ color: "#ffa41b" }}>SCALE EDITION</span>
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
              href="mailto:scale@universaldatatool.com"
              variant="outlined"
              className={"useonline"}
            >
              Get Access
            </HeroButton>
          </Box>
        </CenteredContent>
      </Section1>
      <Section2>
        <CenteredContent>
          <Category>Team Support</Category>
          <SectionHeader>Manage Your Team with Roles</SectionHeader>
          <SectionText>
            Add users as either "Admin", "Reviewer" or "Labeler". Each role
            provides different access permissions and a custom user interface
            specialized to their tasks.
          </SectionText>
        </CenteredContent>
        <Box position="relative" overflow="hidden" width="100%" minHeight={600}>
          <CenteredContent>
            <Grid container>
              <Grid item xs={6}>
                <ItemContainer>
                  <Item>
                    <ItemHeader>Login & Role System</ItemHeader>
                    <ItemDescription>
                      Each team member has their own login and role. Easily add
                      team member and change roles as your team scales.
                    </ItemDescription>
                  </Item>
                  <Item>
                    <ItemHeader>Dataset Browsing</ItemHeader>
                    <ItemDescription>
                      No need to manage links. Your team can browse and select
                      the dataset to work on.
                    </ItemDescription>
                  </Item>
                  <Item>
                    <ItemHeader>Continuous Backups</ItemHeader>
                    <ItemDescription>
                      Every submitted review, label or dataset change is saved
                      in your database. No need to manage files.
                    </ItemDescription>
                  </Item>
                </ItemContainer>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </CenteredContent>
          <SampleGridImage src={teamImage} />
        </Box>
      </Section2>
      <Section3>
        <CenteredContent>
          <Category>Quality Control</Category>
          <SectionHeader>
            Auditable, Controllable, High Quality Labels
          </SectionHeader>
          <SectionText>
            Guarantee great labels with visual audit trails, custom quality
            control parameters and intelligent consensus algorithms.
          </SectionText>
        </CenteredContent>
        <Box
          position="relative"
          textAlign="center"
          // mt="96px"
          overflow="hidden"
          // mb="96px"
          height="520px"
        >
          <CenteredContent>
            <Box position="relative">
              <ScreenshotRowImg src={screenshot2} />
              <ScreenshotRowImg src={screenshot5} />
              <ScreenshotRowImg src={screenshot3} />
            </Box>
          </CenteredContent>
        </Box>
      </Section3>
      <Section2>
        <CenteredContent>
          <Category>Training</Category>
          <SectionHeader>
            Train your labelers with <L href="/courses">Courses</L>
          </SectionHeader>
          <SectionText>
            Upload your dataset to a private instance of{" "}
            <L href="https://github.com/UniversalDataTool/courseware">
              UDT Courseware
            </L>{" "}
            to create a training course. Testing and exercises validate that
            your workforce knows exactly how the data should be labeled.
          </SectionText>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <ItemContainer>
                <Item>
                  <ItemHeader>Built-in Training Validation</ItemHeader>
                  <ItemDescription>
                    Datasets can be configured such that Labelers are required
                    to pass courses before beginning labeling.
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
          <Category>Priority Support</Category>
          <SectionHeader>
            Get Devops and Support from UDT Maintainers
          </SectionHeader>
          <SectionText>
            Our support team of UDT contributors and maintainers provide
            priority support and ensure that your deployment and usage is
            smooth, fast and easy. (We'll also deploy for you if you'd like)
          </SectionText>
          <Box pt="64px">
            <HeroButton
              href="mailto:scale@universaldatatool.com"
              variant="outlined"
              className={"useonline"}
            >
              Get Access
            </HeroButton>
          </Box>
        </CenteredContent>
      </Section3>
    </Container>
  )
}

export default LandingPage
