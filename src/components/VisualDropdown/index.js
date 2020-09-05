import React, { useMemo, useState, useRef } from "react"
import * as parts from "./parts"
import ImageIcon from "@material-ui/icons/Image"
import { useInterval, useClickAway } from "react-use"

const IconForOption = ({ option }) => {
  if (option.toLowerCase().includes("svg")) {
    return <parts.IconText>{"<svg />"}</parts.IconText>
  }

  switch (option) {
    case "Mask PNGs":
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
