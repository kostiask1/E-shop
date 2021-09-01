import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";
import InCart from "../InCart/InCart";
import "./Card.scss";

const Card = (match) => {
    const { data, getById } = useContext(catalogContext);
    const [loading, setLoading] = useState("");
    const id = match && match.params && match.params.name;

    useEffect(() => {
        getById([id]);
        const timeout = setTimeout(
            () => setLoading((prev) => (prev = "Error occurred while loading")),
            2000
        );
        return () => {
            clearTimeout(timeout);
        };
        //eslint-disable-next-line
    }, []);

    if (data && data.length === 1) {
        const { text, image, price, description, discountPrice } = data[0];
        const discountPercent =
            discountPrice && 100 - Math.ceil((discountPrice / price) * 100);
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
                                <img
                                    src={image}
                                    className="img-fluid"
                                    alt={text}
                                />
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
                                <p className="description">{description}</p>
                                <span>
                                    add to cart ->
                                    <InCart id={id} />
                                </span>
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
        );
    } else return <h1 className="pop-in">{loading}</h1>;
};

export default Card;
