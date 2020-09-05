import React, { useMemo, useState, useRef } from "react"
import Header from "../Header"
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown"
import CenteredContent from "../CenteredContent"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
import { useTimeout } from "react-use"
import * as parts from "./parts"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useDropzone } from "react-dropzone"
import useEventCallback from "use-event-callback"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import useConverter from "../../hooks/use-converter"
import VisualDropdown from "../VisualDropdown"

export const ConvertPage = () => {
  const [selectOutputFormatOpen, setSelectOutputFormatOpen] = useState(false)
  const [selectInputFormatOpen, setSelectInputFormatOpen] = useState(false)
  const outputFormatButton = useRef()
  const inputFormatButton = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputFormat, setInputFormat] = useState("UDT JSON")
  const [outputFormat, setOutputFormat] = useState("Mask PNGs")
  const { progress, conversionRunning, startConversion } = useConverter()
  const onDrop = useEventCallback((acceptedFiles) => {
    setLoading(true)
    const reader = new FileReader()
    reader.onabort = () => {
      setLoading(false)
      setError("file reading was aborted")
    }
    reader.onerror = () => {
      setLoading(false)
      setError("file reading has failed")
    }
    reader.onload = () => {
      try {
        startConversion(JSON.parse(reader.result))
      } catch (e) {
        setError(e.toString())
        setLoading(false)
      }
    }
    reader.readAsText(acceptedFiles[0])
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: conversionRunning || loading,
  })
  const [[t1], [t2], [t3]] = [
    useTimeout(500),
    useTimeout(4000),
    useTimeout(800),
  ]
  const frames = useMemo(() => ({ t1: t1(), t2: t2(), t3: t3() }), [
    t1(),
    t2(),
    t3(),
  ])

  return (
    <parts.Container>
      <Header />
      <CenteredContent>
        <parts.Hero>
          Convert{" "}
          <parts.Selectable
            ref={inputFormatButton}
            onClick={() => setSelectInputFormatOpen(true)}
          >
            {inputFormat} <KeyboardArrowDown className="icon" />
          </parts.Selectable>{" "}
          into{" "}
          <parts.Selectable
            ref={outputFormatButton}
            onClick={() => setSelectOutputFormatOpen(true)}
          >
            {outputFormat}
            <KeyboardArrowDown className="icon" />
          </parts.Selectable>
        </parts.Hero>
        <parts.DidYouKnow className={frames}>
          <span className="didyouknow">Did you know?</span> You can run any of
          these{" "}
          <parts.L href="https://github.com/UniversalDataTool/awesome-udt#converters">
            open-source converters
          </parts.L>{" "}
          on a command line with just one line!
        </parts.DidYouKnow>
        {error && (
          <parts.Error onClick={() => setError(null)}>{error}</parts.Error>
        )}
        <parts.ConvertContainer>
          <parts.ConverterBox className={frames} {...getRootProps()}>
            <input {...getInputProps()} />
            <div>
              {conversionRunning ? (
                <CircularProgressbar
                  value={progress * 100}
                  text={`${Math.floor(progress * 100)}%`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "rgba(255,255,255,0.5)",
                  })}
                />
              ) : !loading ? (
                <InsertDriveFileIcon className={{ icon: true, isDragActive }} />
              ) : (
                <CircularProgress size={100} color="#fff" />
              )}
            </div>
          </parts.ConverterBox>
          <parts.ArrowToConvertBox className={{ ...frames, conversionRunning }}>
            <div className="arrow">↑</div>
            Drag and drop file here, or click to select a udt.json or udt.csv
            file
          </parts.ArrowToConvertBox>
        </parts.ConvertContainer>
      </CenteredContent>
      <VisualDropdown
        target={inputFormatButton.current}
        options={["UDT JSON", "UDT CSV"]}
        selected={inputFormat}
        open={selectInputFormatOpen}
        onSelect={(inputFormat) => setInputFormat(inputFormat)}
        onClose={() => setSelectInputFormatOpen(false)}
      />
      <VisualDropdown
        target={outputFormatButton.current}
        open={selectOutputFormatOpen}
        selected={outputFormat}
        options={["Mask PNGs", "Mask SVGs", "Mask SVGs with Image"]}
        onSelect={(outputFormat) => setOutputFormat(outputFormat)}
        onClose={() => setSelectOutputFormatOpen(false)}
      />
    </parts.Container>
  )
}

export default ConvertPage
