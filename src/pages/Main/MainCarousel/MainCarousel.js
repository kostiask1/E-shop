import React, { useContext, useEffect, useState } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "./MainCarousel.scss"
import { useHistory } from "react-router-dom"
import { catalogContext } from "../../../context/catalog/catalog-context"

const MainCarousel = () => {
  const { data, getData } = useContext(catalogContext)
  const [clone, setClone] = useState([])
  const [mouseMoved, setMouseMoved] = useState(false)
  const [width, setWidth] = useState(() => window.innerWidth)
  const history = useHistory()
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    let newClone = [...data]
    newClone = newClone.filter((item) => !item.archived)
    newClone = newClone.sort((a, b) => {
      if (+a.boughtCount < +b.boughtCount) {
        return 1
      }
      if (+a.boughtCount > +b.boughtCount) {
        return -1
      }
      return 0
    })
    newClone = newClone.splice(0, 5)
    setClone(newClone)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    const handleResize = () => {
      if (width < 767 && window.innerWidth > 767) {
        return setWidth(window.innerWidth)
      } else if (width >= 767 && window.innerWidth <= 767) {
        return setWidth(window.innerWidth)
      }
    }
    window.removeEventListener("resize", handleResize)
    window.addEventListener("resize", handleResize)
    return (_) => window.removeEventListener("resize", handleResize)
  }, [width])

  const handleClick = (id) => {
    if (!mouseMoved) {
      history.push("/catalog/" + id)
    }
  }

  const SampleNextArrow = (props) => {
    const { className, onClick } = props
    return (
      <p className={className + " next"} onClick={onClick}>
        Следующие
      </p>
    )
  }

  const SamplePrevArrow = (props) => {
    const { className, onClick } = props
    return (
      <p className={className + " prev"} onClick={onClick}>
        Предыдущие
      </p>
    )
  }
  const settings = {
    infinite: true,
    slidesToShow: width > 767 ? 3 : 1,
    speed: 400,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  if (clone.length) {
    return (
      <div className="main-carousel">
        <h4>Популярные товары</h4>
        <Slider {...settings}>
          {clone.map((item) => (
            <div
              key={item.id}
              onMouseMove={() => setMouseMoved(true)}
              onMouseDown={() => setMouseMoved(false)}
              onMouseUp={() => handleClick(item.id)}
            >
              <img src={item.imagesArray[0]} alt={item.imagesArray[0]} />
            </div>
          ))}
        </Slider>
      </div>
    )
  } else return null
}

export default MainCarousel
