import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../base";
import Modal from "../Modal/Modal";
const db = app.firestore();

const ItemCreator = (props) => {
  const sumBtn = props.filters ? "Add item to shop" : "Update item";
  const [filters, setFilters] = useState(props.filters || []);
  const [title, setTitle] = useState(props.title || "");
  const id = props.id || uuidv4();
  const [image, setImage] = useState(props.image || "");
  const [description, setDescription] = useState(props.description || "");
  const [price, setPrice] = useState(props.price || "");
  const [category, setCategory] = useState(props.category || "");

  const [gallery, setGallery] = useState([]);
  const modal = useRef(null);

  useEffect(() => {
    console.log(props);
    if (filters.length === 0) {
      getFilters();
    }
    setFilters((prev) => (prev = props.filters));
    //eslint-disable-next-line
  }, [props.filters]);

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
      id,
      image,
      price,
      description,
      text: title,
    };

    db.collection("All")
      .doc(data.id)
      .set(data)
      .then(() => {
        if (props.id === id) {
          props.close();
          return props.find();
        }
        return clearInputs();
      });
  };

  const loadImage = async (e) => {
    try {
      const file = e;
      const storageRef = app.storage().ref().child("images");
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      const fileUrl = await fileRef.getDownloadURL();

      if (modal.current.visible.current) {
        loadGallery();
      }

      setImage(fileUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImage = async (file) => {
    console.log(file);
    const storageRef = app.storage();
    storageRef
      .refFromURL(file)
      .delete(file)
      .then(() => {
        loadGallery();
      });
  };

  const loadGallery = async (e) => {
    if (e) {
      e.preventDefault();
    }
    var storageRef = app.storage().ref();
    var listRef = storageRef.child("images");
    listRef.listAll().then(function (result) {
      let row = [];
      result.items.length > 0
        ? result.items.forEach(function (imgRef) {
            imgRef.getDownloadURL().then(function (url) {
              row = row.concat(url);
              setGallery(row);
            });
          })
        : setGallery([]);
    });
    modal.current.open();
  };

  const handleTitle = (e) => {
    if (!e) return setTitle("");
    let newTitle = e[0].toUpperCase();
    newTitle = newTitle + e.slice(1);
    setTitle(newTitle);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6">
          <form className="text-center" onSubmit={(e) => newItem(e)}>
            <p className="mb-4 title">Create item</p>
            <div className="row justify-content-center mb-4">
              <div className="col-10">
                <div>&nbsp;</div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Item title"
                    onChange={(e) => handleTitle(e.target.value)}
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
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => loadGallery(e)}
                    >
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
              {sumBtn}
            </button>
          </form>
        </div>
        <div className="col-12 col-md-6">
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

      <Modal ref={modal} size="fullscreen">
        <div className="row">
          {gallery.map((img, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="item">
                <div className="item-controls">
                  <div className="edit">
                    <button
                      className="item-control item-edit"
                      data-bs-toggle="modal"
                      data-bs-target="#Edit"
                      onClick={() => {
                        setImage(img);
                        modal.current.close();
                      }}
                    >
                      <i className="fa fa-check" />
                    </button>
                  </div>
                  <div className="delete">
                    <button
                      onClick={() => deleteImage(img)}
                      className="item-control item-delete"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                <img className="item-img" src={img} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="modal-controls">
          <label className="btn btn-success mb-0 mr-3" htmlFor="loadFile">
            Load file &nbsp; <i className="fas fa-upload" />
          </label>
          <input
            className="d-none"
            type="file"
            name="loadFile"
            id="loadFile"
            onChange={(e) => loadImage(e.target.files[0])}
          />
          <button
            className="btn btn-primary"
            onClick={() => modal.current.close()}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ItemCreator;
