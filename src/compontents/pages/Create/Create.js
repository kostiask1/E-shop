import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Create = () => {
  const [filters, setFilters] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categoryToRemove, setCategoryToRemove] = useState("");
  const [categoryToAdd, setCategoryToAdd] = useState("");

  useEffect(() => {
    getFilters();
    //eslint-disable-next-line
  }, []);

  const getFilters = async () => {
    try {
      let filt = await axios.get(
        `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/categories.json`
      );
      filt = filt.data;
      filt ? (filt = filt) : (filt = []);
      setFilters(filt);
      return filters;
    } catch (err) {
      console.error(err);
    }
  };

  const newFilter = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (!value) return false;
    console.log(filters);
    if (filters && filters.includes(value)) {
      alert("This category already exists");
      return false;
    }
    const data = filters.concat(value);
    axios({
      method: "put",
      url: `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/categories.json`,
      data,
      transformResponse: [
        function () {
          setCategoryToAdd("");
          return getFilters();
        },
      ],
    });
  };

  const deleteFilter = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    const data = filters.filter((el) => el !== value);
    axios({
      method: "put",
      url: `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/categories.json`,
      data,
      transformResponse: [
        function () {
          setCategoryToRemove("0");
          return getFilters();
        },
      ],
    });
  };

  const clear = (e) => {
    e.preventDefault();
    setTitle("");
    setImage("");
    setDescription("");
    setPrice("");
    setCategory("");
  };

  const newItem = (e) => {
    e.preventDefault();
    const data = {
      category,
      id: uuidv4(),
      image,
      price,
      description,
      text: title,
    };
    console.log(data);
    axios({
      method: "post",
      url: `https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app/items/${data.category}/.json`,
      data,
      transformResponse: [clear()],
    });
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-sm-6 mt-5">
              <form
                onSubmit={(e) => newFilter(e)}
                className="text-center"
                action="/"
              >
                <p className="mb-4 title">Create category</p>
                <div>
                  <input
                    type="text"
                    value={categoryToAdd}
                    onChange={(e) => setCategoryToAdd(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary mt-3" type="submit">
                  Add category
                </button>
              </form>
            </div>
            <div className="col-12 col-sm-6 mt-5">
              <form
                onSubmit={(e) => deleteFilter(e)}
                className="text-center"
                action="/"
              >
                <p className="mb-4 title">Delete category</p>
                <select
                  className="form-select d-block form-select-lg m-auto"
                  name="category"
                  id="category"
                  value={categoryToRemove}
                  onChange={(e) => setCategoryToRemove(e.target.value)}
                >
                  <option value="0">Choose category:</option>
                  {filters
                    ? filters.map((el, idx) => (
                        <option value={el} key={idx}>
                          {el}
                        </option>
                      ))
                    : ""}
                </select>
                <button className="btn btn-primary mt-3" type="submit">
                  Delete category
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-md-6 mt-5">
              <form className="text-center" onSubmit={(e) => newItem(e)}>
                <p className="mb-4 title">Create item</p>
                <div className="row mb-4">
                  <div className="col-5">
                    Product:
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Title</li>
                      <li className="list-group-item">Image URL</li>
                      <li className="list-group-item">Description</li>
                      <li className="list-group-item">Price</li>
                    </ul>
                  </div>
                  <div className="col-7">
                    <div>&nbsp;</div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <select
                  className="form-select d-block form-select-lg m-auto"
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Choose category:</option>
                  {filters
                    ? filters.map((el, idx) => (
                        <option value={el} key={idx}>
                          {el}
                        </option>
                      ))
                    : ""}
                </select>
                <button
                  className="btn btn-secondary mr-2 mt-3"
                  onClick={(e) => clear(e)}
                >
                  reset
                </button>
                <button className="btn btn-primary mt-3" type="submit">
                  Add item to shop
                </button>
              </form>
            </div>
            <div className="col-12 col-md-6 mt-5">
              <p className="mb-4 title text-center">Item preview</p>
              <div className="row">
                <div className="col-12 col-md-5">
                  {image && (
                    <img src={image} className="img-fluid" alt={title ?? ""} />
                  )}
                </div>
                <div className="col-12 col-md-7">
                  {title && <h4>{title}</h4>}
                  {description && <p>{description}</p>}
                  {price && <p>{price} uah</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
