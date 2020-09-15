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
import DownloadIcon from "@material-ui/icons/GetApp"
import GithubIcon from "@material-ui/icons/GitHub"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import useConverter from "../../hooks/use-converter"
import VisualDropdown from "../VisualDropdown"
import jac from "jac-format"

const notSupportedOutputFormats = {
  "UDT CSV": "https://github.com/UniversalDataTool/website/issues/1",
  "TSV with Labels":
    "https://github.com/UniversalDataTool/universal-data-tool/issues/301",
  labelimg:
    "https://github.com/UniversalDataTool/universal-data-tool/issues/302",
  labelme: "https://github.com/UniversalDataTool/website/issues/2",
  CoNLL: "https://github.com/UniversalDataTool/universal-data-tool/issues/303",
  COCO: "https://github.com/UniversalDataTool/universal-data-tool/issues/282",
  "PASCAL VOC XML":
    "https://github.com/UniversalDataTool/universal-data-tool/issues/267",
  "Something Else":
    "https://github.com/UniversalDataTool/universal-data-tool/issues/new?title=Support%20Importing/Exporting%20SOMETHING&body=I%27m%20using%20XXX%20for%20YYY,%20and%20it%27d%20sure%20be%20nifty%20if%20I%20could%20get%20the%20UDT%20to...",
}

export const ConvertPage = () => {
  const [selectOutputFormatOpen, setSelectOutputFormatOpen] = useState(false)
  const [selectInputFormatOpen, setSelectInputFormatOpen] = useState(false)
  const outputFormatButton = useRef()
  const inputFormatButton = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputFormat, setInputFormat] = useState("UDT JSON")
  const [outputFormat, setOutputFormat] = useState("Mask PNGs")
  const {
    progress,
    conversionRunning,
    startConversion,
    downloadUrl,
    task,
    resetConversion,
    error: conversionError,
  } = useConverter()
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
        if (inputFormat === "UDT JSON") {
          startConversion(JSON.parse(reader.result), outputFormat)
        } else if (inputFormat === "UDT CSV") {
          startConversion(jac.fromCSV(reader.result), outputFormat)
        }
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

  const isSupportedFormat = !notSupportedOutputFormats[outputFormat]

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
        {conversionError && (
          <parts.Error onClick={() => setError(null)}>
            {conversionError}
          </parts.Error>
        )}
        <parts.ConvertContainer>
          <parts.ConverterBox
            className={frames}
            {...(!isSupportedFormat
              ? {
                  onClick: () => {
                    window.location.href =
                      notSupportedOutputFormats[outputFormat]
                  },
                }
              : !downloadUrl
              ? getRootProps()
              : {
                  onClick: () => {
                    window.location.href = downloadUrl
                  },
                })}
          >
            <input {...getInputProps()} />
            <div>
              {conversionRunning ? (
                <parts.ConversionProgressContainer>
                  <parts.ConversionItem className={!downloadUrl ? "show" : ""}>
                    <div className="progressbarcontainer">
                      <CircularProgressbar
                        value={progress * 100}
                        text={`${Math.floor(progress * 100)}%`}
                        styles={buildStyles({
                          textColor: "#fff",
                          pathColor: "#fff",
                          trailColor: "rgba(255,255,255,0.5)",
                        })}
                      />
                    </div>
                    <div className="task">{task}</div>
                  </parts.ConversionItem>
                  <parts.ConversionItem className={downloadUrl ? "show" : ""}>
                    <DownloadIcon className="icon" />
                  </parts.ConversionItem>
                </parts.ConversionProgressContainer>
              ) : !loading ? (
                isSupportedFormat ? (
                  <InsertDriveFileIcon
                    className={{ icon: true, isDragActive }}
                  />
                ) : (
                  <GithubIcon className="icon" />
                )
              ) : (
                <CircularProgress size={100} color="#fff" />
              )}
            </div>
          </parts.ConverterBox>
          <parts.ArrowToConvertBox className={{ ...frames, conversionRunning }}>
            <div className="arrow">↑</div>
            {isSupportedFormat
              ? "Drag and drop file here, or click to select a udt.json or udt.csv file"
              : "The format you selected isn't supported yet. Show that this is something you want by upvoting the github issue!"}
          </parts.ArrowToConvertBox>
          {downloadUrl && (
            <div>
              <parts.Selectable
                onClick={() => {
                  resetConversion()
                  setLoading(false)
                }}
                style={{ paddingRight: 24 }}
              >
                Reset
              </parts.Selectable>
            </div>
          )}
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
        options={[
          "Mask PNGs",
          "Mask SVGs",
          "Mask SVGs with Image",
          "UDT CSV",
          "TSV with Labels",
          "labelimg",
          "labelme",
          "CoNLL",
          "COCO",
          "PASCAL VOC XML",
          "Something Else",
        ]}
        onSelect={(outputFormat) => setOutputFormat(outputFormat)}
        onClose={() => setSelectOutputFormatOpen(false)}
      />
    </parts.Container>
  )
}

export default ConvertPage
