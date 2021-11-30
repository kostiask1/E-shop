import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { catalogContext } from "../../context/catalog/catalog-context"
import InCart from "../../components/InCart/InCart"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./Card.scss"

const Card = (match) => {
    const { data, getById } = useContext(catalogContext)
    const [loading, setLoading] = useState("")
    const id = match && match.params && match.params.name
    useEffect(() => {
        let timeout
        if (id) {
            getById([id])
            timeout = setTimeout(
                () =>
                    setLoading(
                        (prev) => (prev = "Error occurred while loading")
                    ),
                2000
            )
        }
        return () => {
            clearTimeout(timeout)
        }
        //eslint-disable-next-line
    }, [id])

    if (data && data.length === 1) {
        const { text, imagesArray, price, description, discountPrice } = data[0]
        const discountPercent =
            discountPrice && 100 - Math.ceil((discountPrice / price) * 100)
        return (
            <div className="card container pop-in">
                <div className="row">
                    {Object.keys(data).length !== 0 ? (
                        <>
                            <div className="img">
                                {discountPercent ? (
                                    <span className="price-discount">
                                        {discountPercent}%
                                    </span>
                                ) : null}
                                {imagesArray && imagesArray.length > 1 ? (
                                    <Carousel
                                        showStatus={false}
                                        infiniteLoop={true}
                                        emulateTouch={true}
                                        showThumbs={false}
                                    >
                                        {imagesArray.map((img) => (
                                            <img
                                                src={img}
                                                alt={text}
                                                key={img}
                                            />
                                        ))}
                                    </Carousel>
                                ) : (
                                    <img
                                        src={imagesArray && imagesArray[0]}
                                        alt={text}
                                    />
                                )}
                            </div>
                            <div className="text-info">
                                <h1>{text}</h1>
                                {!discountPrice ? (
                                    <p className="price-now">{price} грн</p>
                                ) : (
                                    <>
                                        <del className="price-was">{price}</del>
                                        <span className="price-now">
                                            {discountPrice} грн
                                        </span>
                                    </>
                                )}
                                <div className="description">{description}</div>
                                <InCart id={id} inCard={true} />
                            </div>
                        </>
                    ) : (
                        <div>
                            <p>Broken item id</p>
                            <Link to="/">Go to Home Page</Link>
                        </div>
                    )}
                </div>
            </div>
        )
    } else return <h1 className="pop-in">{loading}</h1>
}

export default Card
