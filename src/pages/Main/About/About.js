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
          <img src="./main/59d8d068b5b04944459e272c7fe7d99d 1.webp" alt="" />
        </div>
        <div className="text">
          <p>
            Привет! Меня зовут Полина и тут я выкладываю частичку моего
            творчества. Здесь вы найдете разнообразные шопперы, которые сделают
            ваши покупки более экологичными и много-много ярких украшений:
            начиная от колечек и заканчивая милыми чокерами.
          </p>
        </div>
      </div>
    </div>
  )
}

About.propTypes = {}

export default About
