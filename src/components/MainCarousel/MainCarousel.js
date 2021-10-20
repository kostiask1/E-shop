import React, { useContext, useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "./MainCarousel.scss"
import { catalogContext } from "../../context/catalog/catalog-context"

const MainCarousel = () => {
    const { data, getData } = useContext(catalogContext)
    const [clone, setClone] = useState([])
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
            // a должно быть равным b
            return 0
        })
        newClone = newClone.splice(0, 5)
        setClone(newClone)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    if (clone.length) {
        return (
            <div className="MainCarousel">
                <h4>Our bags</h4>
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={false}
                    emulateTouch
                    infiniteLoop={false}
                    dynamicHeight={false}
                    renderIndicator={false}
                    selectedItem={1}
                    renderArrowPrev={(clickHandler, hasPrev, labelNext) => (
                        <p
                            className="prev"
                            onClick={hasPrev ? clickHandler : null}
                        >
                            Prev
                        </p>
                    )}
                    renderArrowNext={(clickHandler, hasNext, labelNext) => (
                        <p
                            className="next"
                            onClick={hasNext ? clickHandler : null}
                        >
                            Next
                        </p>
                    )}
                    centerMode
                    centerSlidePercentage={40}
                >
                    {clone.map((item) => (
                        <img
                            key={item}
                            src={item.imagesArray[0]}
                            alt={item.imagesArray[0]}
                        />
                    ))}
                </Carousel>
            </div>
        )
    } else return null
}

export default MainCarousel
