import { styled } from "@material-ui/core/styles"

export const Container = styled("div")({
  position: "absolute",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  borderRadius: 8,
  width: 540,
  minHeight: 500,
  backgroundImage: "linear-gradient(to bottom right, #0062F4, #098cff)",
  boxShadow: "0px 0px 32px rgba(0,0,0,0.5)",
  padding: 16,
  boxSizing: "border-box",
  opacity: 0,
  transform: "translate(0,-20px)",
  left: 0,
  top: 0,
  transition: "transform 200ms, opacity 200ms, top 500ms, left 500ms",
  pointerEvents: "none",
  "&.open": {
    opacity: 1,
    pointerEvents: "inherit",
    transform: "translate(0,0)",
  },
})

export const Item = styled("div")({
  borderRadius: 8,
  margin: 8,
  alignSelf: "flex-start",
  backgroundColor: "rgba(0,0,0,0.2)",
  cursor: "pointer",
  transition: "background-color 100ms, transform 100ms",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.4)",
    transform: "scale(1.05,1.05)",
  },
  "&.selected": {
    backgroundColor: "rgba(255,255,255,0.1)",
    "&:hover": {
      transform: "scale(1,1)",
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
  "& .iconContainer": {
    marginTop: 16,
    height: 32,
  },
  display: "inline-flex",
  flexDirection: "column",
  color: "#fff",
  justifyContent: "center",
  alignItems: "center",
  width: 150,
  height: 120,
  "& .icon": {
    width: 32,
    height: 32,
  },
  "& .text": {
    height: 32,
    textAlign: "center",
    paddingTop: 12,
    fontWeight: 600,
  },
})

export const IconText = styled("div")({
  fontWeight: 800,
})
