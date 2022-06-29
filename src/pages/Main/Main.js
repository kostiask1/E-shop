import React from "react"
import MainCarousel from "./MainCarousel/MainCarousel"
import Heading from "./Heading/Heading"
import About from "./About/About"
import Tout from "./Tout/Tout"
import { Footer } from "../../layout/footer/footer"

const Main = () => {
  return (
    <>
      <Heading />
      <About />
      <MainCarousel />
      <Tout />
      <Footer />
    </>
  )
}

export default Main
