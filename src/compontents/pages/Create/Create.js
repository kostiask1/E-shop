import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../base";

const db = app.firestore();

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
      let filt = await db.collection("categories").get();
      filt ? (filt = filt.docs.map((doc) => doc.data())) : (filt = []);
      if (filt.length) {
        filt = Object.values(filt[0].categories);
      }

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
    if (filters && filters.includes(value)) {
      alert("This category already exists");
      return false;
    }
    const data = filters.concat(value);

    db.collection("categories")
      .doc("categories")
      .set({ categories: data })
      .then(() => {
        setCategoryToAdd("");
        return getFilters();
      });
  };

  const deleteFilter = (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    const data = filters.filter((el) => el !== value);

    db.collection("categories").doc("categories").set({ categories: data });

    db.collection("categories")
      .doc("categories")
      .onSnapshot((doc) => {
        setCategoryToAdd("");
        return getFilters();
      });
  };

  const clearInputs = (e) => {
    if (e) e.preventDefault();
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

    db.collection("All")
      .doc(`${data.text} ${data.price}`)
      .set(data)
      .then(() => clearInputs());
  };

  const loadImage = async (e) => {
    try {
      const file = e;
      const storageRef = app.storage().ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();

      setImage(fileUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (file) => {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.delete(file).then(() => {
      console.log(file.name, "has been deleted");
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
                <div className="row justify-content-center mb-4">
                  {/* <div className="col-4">
                    Product:
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Title</li>
                      <li className="list-group-item">Image URL</li>
                      <li className="list-group-item">OR</li>
                      <li className="list-group-item">Description</li>
                      <li className="list-group-item">Price</li>
                    </ul>
                  </div> */}
                  <div className="col-10">
                    <div>&nbsp;</div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Item title"
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
                        placeholder="ImageURL"
                        onChange={(e) => setImage(e.target.value)}
                      />{" "}
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <label
                          className="btn btn-sm btn-primary mb-0"
                          htmlFor="loadFile"
                        >
                          Load file &nbsp; <i className="fas fa-upload" />
                        </label>
                        <input
                          className="d-none"
                          type="file"
                          name="loadFile"
                          id="loadFile"
                          onChange={(e) => loadImage(e.target.files[0])}
                        />
                        <button className="btn btn-sm btn-primary">
                          Browse gallery <i className="far fa-share-square" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-2">
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={description}
                        placeholder="Item description"
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
                        placeholder="Item price"
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
                  onClick={(e) => clearInputs(e)}
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
