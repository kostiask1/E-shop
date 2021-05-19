import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { catalogContext } from "../../context/catalog/catalog-context";

const Card = ({ match }) => {
  const { data, findWithId } = useContext(catalogContext);
  useEffect(() => {
    findWithId(`${match.params.name}`);
    //eslint-disable-next-line
  }, []);

  const { text, image, price, description } = data;
  return (
    <div className="container pt-5 pb-5">
      <div className="row">
        {Object.keys(data).length !== 0 ? (
          <>
            <div className="col-12 col-md-5">
              <img src={image} className="img-fluid" alt={text} />
            </div>
            <div className="col-12 col-md-7">
              <h1>{text}</h1>
              <p>{price} uah</p>
              <p>{description}</p>
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
};

export default Card;
