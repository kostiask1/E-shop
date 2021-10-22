import React from "react"
import "./Main.scss"
import MainCarousel from "./MainCarousel/MainCarousel"
import Heading from "./Heading/Heading"
import About from "./About/About"

const Main = () => {
    return (
        <>
            <div>
                <Heading />
                <About />
                <MainCarousel />
            </div>
        </>
    )
}

export default Main
