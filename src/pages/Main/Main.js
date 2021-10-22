import React from "react"
import "./Main.scss"
import MainCarousel from "./MainCarousel/MainCarousel"
import Heading from "./Heading/Heading"

const Main = () => {
    return (
        <>
            <Heading />
            <div id="main">
                <MainCarousel />
            </div>
        </>
    )
}

export default Main
