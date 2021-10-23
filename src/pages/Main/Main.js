import React from "react"
import "./Main.scss"
import MainCarousel from "./MainCarousel/MainCarousel"
import Heading from "./Heading/Heading"
import About from "./About/About"
import Tout from "./Tout/Tout"

const Main = () => {
    return (
        <>
            <div>
                <Heading />
                <About />
                <MainCarousel />
                <Tout />
            </div>
        </>
    )
}

export default Main
