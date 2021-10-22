import React, { useContext, useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "./MainCarousel.scss"
import { useHistory } from "react-router-dom"
import { catalogContext } from '../../../context/catalog/catalog-context';

const MainCarousel = () => {
    const { data, getData } = useContext(catalogContext)
    const [clone, setClone] = useState([])
    const [mouseMoved, setMouseMoved] = useState(false)
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
            // a должно быть равным b
            return 0
        })
        newClone = newClone.splice(0, 5)
        setClone(newClone)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    const handleClick = (id) => {
        if (!mouseMoved) {
            history.push("/catalog/" + id)
        }
    }

    if (clone.length) {
        return (
            <div
                className="MainCarousel"
                style={{ backgroundImage: "url(./main/wave.png)" }}
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
                    centerSlidePercentage={35}
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
