import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { catalogContext } from "../../context/catalog/catalog-context"
import InCart from "../../components/InCart/InCart"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./Card.scss"

const Card = (match) => {
    const { data, getById, addToStorage } = useContext(catalogContext)
    const [loading, setLoading] = useState("")
    const id = match && match.params && match.params.name
    let history = useHistory()
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
    const instantBuy = () => {
        addToStorage(id)
        history.push("/cart")
    }

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
                                    >
                                        {imagesArray.map((img) => (
                                            <img
                                                src={img}
                                                className="img-fluid"
                                                alt={text}
                                                key={img}
                                            />
                                        ))}
                                    </Carousel>
                                ) : (
                                    <img
                                        src={imagesArray && imagesArray[0]}
                                        className="img-fluid"
                                        alt={text}
                                    />
                                )}
                            </div>
                            <div className="text-info">
                                <h1>{text}</h1>
                                {!discountPrice ? (
                                    <p>{price} UAH</p>
                                ) : (
                                    <>
                                        <del className="price-was">{price}</del>
                                        <span className="price-now">
                                            {discountPrice} Uah
                                        </span>
                                    </>
                                )}
                                <div className="description">
                                    {description}
                                    <InCart id={id} />
                                </div>
                                <button onClick={() => instantBuy()}>
                                    Buy now!
                                </button>
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
