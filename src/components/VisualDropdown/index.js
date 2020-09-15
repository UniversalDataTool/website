import React, { useMemo, useState, useRef } from "react"
import * as parts from "./parts"
import ImageIcon from "@material-ui/icons/Image"
import { useInterval, useClickAway } from "react-use"
import TextFieldsIcon from "@material-ui/icons/TextFields"
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline"

const IconForOption = ({ option }) => {
  if (option.toLowerCase().includes("svg")) {
    return <parts.IconText>{"<svg />"}</parts.IconText>
  }
  if (
    option.toLowerCase().includes("csv") ||
    option.toLowerCase().includes("tsv")
  ) {
    return <ViewHeadlineIcon className="icon" />
  }
  if (option.toLowerCase().includes("json")) {
    return <parts.IconText>{"JSON"}</parts.IconText>
  }

  switch (option.toLowerCase()) {
    case "something else": {
      return <parts.IconText>{"?"}</parts.IconText>
    }
    case "text class tsv":
    case "conll":
      return <TextFieldsIcon className="icon" />
    case "mask pngs":
    default:
      return <ImageIcon className="icon" />
  }
}

export default ({ open, selected, target, options, onClose, onSelect }) => {
  const [count, setCount] = useState(0)
  const containerRef = useRef(null)
  useClickAway(containerRef, onClose)
  useInterval(() => setCount(count + 1), target ? 1000 : 0)
  const targetPosition = useMemo(() => {
    if (!target) return { left: 0, top: 0 }
    const bounds = target.getBoundingClientRect()
    return {
      left: Math.max(
        0,
        bounds.left + window.scrollX + bounds.width / 2 - 540 / 2
      ),
      top: bounds.bottom + window.scrollY + 16,
    }
  }, [target, count])
  return (
    <parts.Container
      style={targetPosition}
      className={{ open }}
      ref={containerRef}
    >
      {options.map((option) => (
        <parts.Item
          className={selected === option ? "selected" : ""}
          onClick={() => {
            onSelect(option)
            onClose()
          }}
        >
          <div className="iconContainer">
            <IconForOption option={option} />
          </div>
          <div className="text">{option}</div>
        </parts.Item>
      ))}
    </parts.Container>
  )
}
