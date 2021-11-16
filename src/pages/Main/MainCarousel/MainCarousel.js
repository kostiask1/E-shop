import React, { useContext, useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
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
        newClone.sort((a, b) => {
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

    if (clone.length) {
        return (
            <div
                className="MainCarousel"
            >
                <h4>Our bags</h4>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    emulateTouch
                    infiniteLoop={true}
                    dynamicHeight={false}
                    renderIndicator={false}
                    selectedItem={1}
                    renderArrowPrev={(clickHandler, hasPrev) => (
                        <p
                            className="prev"
                            onClick={hasPrev ? clickHandler : null}
                        >
                            Prev
                        </p>
                    )}
                    renderArrowNext={(clickHandler, hasNext) => (
                        <p
                            className="next"
                            onClick={hasNext ? clickHandler : null}
                        >
                            Next
                        </p>
                    )}
                    centerMode
                    centerSlidePercentage={width > 767 ? 35 : 100}
                >
                    {clone.map((item) => (
                        <div
                            key={item.id}
                            onMouseMove={() => setMouseMoved(true)}
                            onMouseDown={() => setMouseMoved(false)}
                            onMouseUp={() => handleClick(item.id)}
                        >
                            <img
                                src={item.imagesArray[0]}
                                alt={item.imagesArray[0]}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    } else return null
}

export default MainCarousel
