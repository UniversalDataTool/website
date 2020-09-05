import Button from "@material-ui/core/Button"
import { styled } from "@material-ui/core/styles"

export const Container = styled("div")({
  backgroundImage: `linear-gradient(to right,#000813,#000f26)`,
  paddingBottom: 200,
  minHeight: "100vh",
  position: "relative",
})
export const Hero = styled("div")({
  color: "#fff",
  fontSize: 32,
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  paddingBottom: 24,
  borderBottom: "2px solid rgba(255,255,255,0.5)",
})
export const Selectable = styled(Button)({
  color: "#fff",
  margin: 16,
  fontSize: 24,
  borderColor: "rgba(255,255,255,0.3)",
  "& .icon": {
    fontSize: 22,
    marginRight: 8,
    width: 32,
    height: 32,
  },
  paddingLeft: 24,
  fontWeight: 600,
  backgroundColor: "#0062f4",
  "&:hover": {
    backgroundColor: "#0062f4",
  },
})
export const DidYouKnow = styled("div")({
  fontSize: 18,
  marginTop: 24,
  color: "#fff",
  "& .didyouknow": {
    fontWeight: 700,
  },
  opacity: 0,
  transition: "opacity 250ms, transform 250ms",
  transform: "translate(0, 20px)",
  "&.t2": {
    opacity: 0.8,
    transform: "translate(0, 0)",
  },
})
export const L = styled("a")({
  textDecoration: "none",
  "&&&": {
    color: "#2a7fff",
  },
})
export const ConvertContainer = styled("div")({
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  flexDirection: "column",
})
export const ConverterBox = styled("div")({
  display: "inline-flex",
  width: 280,
  height: 280,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  borderRadius: 4,
  border: `2px dotted #fff`,
  backgroundColor: "#0062f4",
  padding: 16,
  "& .icon": {
    width: 96,
    height: 96,
    transition: "transform 200ms",
    "&.isDragActive": {
      transform: "scale(1.5,1.5)",
    },
  },
  opacity: 0,
  transition: "opacity 250ms, transform 200ms",
  transform: "translate(0, 20px)",
  "&.t1": {
    opacity: 1,
    transform: "translate(0, 0)",
  },
  cursor: "pointer",
  "&:hover": {
    opacity: 1,
    transform: "scale(1.05,1.05)",
  },
})
export const ArrowToConvertBox = styled("div")({
  marginTop: 16,
  fontSize: 18,
  fontWeight: 600,
  textAlign: "center",
  opacity: 0,
  transition: "opacity 250ms, transform 200ms",
  transform: "translate(0, 20px)",
  "& .arrow": {
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 24,
  },
  "&.t3": {
    opacity: 0.8,
    transform: "translate(0, 0)",
  },
  "&&.conversionRunning": {
    opacity: 0,
  },
})
export const Error = styled("div")({
  color: "#f00",
  padding: 16,
  backgroundColor: "rgba(255,0,0,0.25)",
  marginTop: 16,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.5,
  },
})
