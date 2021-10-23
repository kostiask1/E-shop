import React, { useEffect, useState } from "react"
import "./Strokes.scss"

const Strokes = ({ refferer }) => {
    const [width, setWidth] = useState(() => window.innerWidth)
    const [scrollPos, setScrollPos] = useState(0)
    const [offset, setOffset] = useState(0)
    const root = document.getElementById("root")

    useEffect(() => {
        const handleResize = () => {
            return setWidth(window.innerWidth)
        }
        window.removeEventListener("resize", handleResize)
        window.addEventListener("resize", handleResize)
        return (_) => window.removeEventListener("resize", handleResize)
    }, [width])

    useEffect(() => {
        const scroll = () => {
            setScrollPos(root.scrollTop)
            return setOffset(
                (refferer
                    ? (scrollPos - (refferer.clientHeight * 2) / 3) /
                      (refferer.scrollHeight + refferer.clientHeight)
                    : 0) * 400
            )
        }
        root.removeEventListener("scroll", scroll)
        root.addEventListener("scroll", scroll)
        return () => root.removeEventListener("scroll", scroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPos])

    return (
        <div
            className="strokes-wrapper"
            style={{
                clipPath: `polygon(0 0, ${offset}% 0, ${offset}% 100%, 0% 100%)`,
            }}
        >
            <img src="./vectors/Vector 1.svg" alt="" />
            <img src="./vectors/Vector 2.svg" alt="" />
            <img
                src="./vectors/Vector 3.svg"
                alt=""
                style={{
                    top: 50,
                }}
            />
        </div>
    )
}

export default Strokes
