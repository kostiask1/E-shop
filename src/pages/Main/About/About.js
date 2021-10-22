import React, { useState, useRef, useEffect } from "react"
import "./About.scss"
import Strokes from "./Strokes/Strokes"

const About = () => {
    const [scrollPos, setScrollPos] = useState(0)
    const [offset, setOffset] = useState(0)
    const containerRef = useRef()
    const root = document.getElementById("root")

    useEffect(() => {
        const scroll = () => {
            setScrollPos(root.scrollTop)
            return setOffset(containerRef.current ?
                    scrollPos /
                        (containerRef.current.scrollHeight +
                            containerRef.current.clientHeight) : 0)
        }
        root.removeEventListener("scroll", scroll)
        root.addEventListener("scroll", scroll)
        return () => root.removeEventListener("scroll", scroll)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPos])

    console.log(containerRef.current && containerRef.current.offsetTop)

    return (
        <div id="about" ref={containerRef}>
            <Strokes offset={offset} />
            <div className="img">
                <img
                    src="./main/59d8d068b5b04944459e272c7fe7d99d 1.webp"
                    alt=""
                />
            </div>
            <div className="text">
                <h3>About </h3>
                <b>us</b>
                <p>
                    БлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБлаБл
                </p>
            </div>
        </div>
    )
}

About.propTypes = {}

export default About
