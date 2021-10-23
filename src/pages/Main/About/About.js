import React, { useRef } from "react"
import "./About.scss"
import Strokes from "./Strokes/Strokes"

const About = () => {
    const containerRef = useRef()

    return (
        <div id="about" ref={containerRef}>
            <Strokes refferer={containerRef.current} />
            <div className="wrapper">
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
        </div>
    )
}

About.propTypes = {}

export default About
