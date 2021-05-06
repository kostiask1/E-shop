import React, { useState, useEffect } from "react";
import axios from "axios";
const Catalog = () => {
  const GetData = async (filter = "albumId", value = 1) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?${filter}=${value}`
    );
    console.log(response);
    useData(response.data);
  };
  const [data, useData] = useState([]);
  const [filter, useFilter] = useState("albumId");
  const [value, useValue] = useState(1);

  const Filters = (newFilter, newValue) => {
    useFilter((prev) => newFilter);
    useValue((prev) => newValue);
  };

  useEffect(() => {
    GetData(filter, value);
    console.log("bthusd");
  }, [filter, value]);
  return (
    <main className="main">
      <div className="bg">
        <h1>The Bloom</h1>
        <div className="container-fluid">
          <p className="navbar">Shop by Apolin Ko</p>
        </div>
      </div>
      <div className="catalog__wrapper">
        <div className="row">
          <div className="col-12 col-md-2">
            <div className="catalog__filters">
              <button
                className="btn btn-primary"
                onClick={() => Filters("albumId", 1)}
              ></button>
              <button
                className="btn btn-primary"
                onClick={() => Filters("albumId", 51)}
              ></button>
              <button
                className="btn btn-primary"
                onClick={() => Filters("albumId", 31)}
              ></button>
            </div>
          </div>
          <div className="col-12 col-md-10">
            <div className="catalog">
              <div className="container">
                <div className="row">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <div className="col-6 col-md-3" key={item.id}>
                        <div className="item">
                          <img src={item.thumbnailUrl} alt="" />
                          <p>{item.title}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span>No matching results found</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
