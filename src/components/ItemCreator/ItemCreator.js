import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "../Modal/Modal";
import { app } from "../../base";
import "./ItemCreator.scss";
const db = app.firestore();

const ItemCreator = (props) => {
    const sumBtn =
        props.filters || props.new ? "Add item to shop" : "Update item";
    const [filters, setFilters] = useState(props.filters || []);
    const [title, setTitle] = useState(props.title || "");
    const [image, setImage] = useState(props.image || "");
    const [description, setDescription] = useState(props.description || "");
    const [category, setCategory] = useState(props.category || "");
    const [drag, setDrag] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [price, setPrice] = useState(props.price || "");

    const id = props.id || uuidv4();
    const modal = useRef(null);

    useEffect(() => {
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
        setTitle(props.title ?? "");
        setImage(props.image ?? "");
        setDescription(props.description ?? "");
        setPrice(props.price ?? "");
        setCategory(props.category ?? "");
    };

    const newItem = (e) => {
        e.preventDefault();
        const data = {
            category,
            id,
            image,
            price: +price,
            description,
            timestamp: new Date().getTime(),
            text: title,
        };
        db.collection("All")
            .doc(data.id)
            .set(data)
            .then(() => {
                if (props.id === id || props.hasOwnProperty("close")) {
                    props.close();
                    return props.getData();
                }
                clearInputs();
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
            if (result.items.length === 0) return setGallery([]);
            let promises = result.items.map(function (imgRef) {
                return imgRef.getDownloadURL().then(function (url) {
                    return url;
                });
            });
            Promise.all(promises).then((items) => {
                setGallery(items);
            });
        });
        modal.current.open();
    };

    const handleTitle = (e) => {
        if (!e) return setTitle("");
        let newTitle = e[0].toUpperCase();
        newTitle = newTitle + e.slice(1);
        setTitle(newTitle);
    };

    const onDragStart = (e) => {
        e.preventDefault();
        setDrag(true);
    };
    const onDragLeave = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    const onDragLoad = (e) => {
        e.preventDefault();
        try {
            let files = [...e.dataTransfer.files];
            const storageRef = app.storage().ref().child("images");
            let requests = Promise.all(
                files.map((file) => {
                    const fileRef = storageRef.child(file.name);
                    return fileRef.put(file);
                })
            );
            requests.then(() => {
                setDrag(false);
                loadGallery();
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="item-creator">
            <div className="row">
                <div>
                    <form onSubmit={(e) => newItem(e)}>
                        <p className="title">Create item</p>
                        <div className="row">
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={title}
                                    placeholder="Item title"
                                    onChange={(e) =>
                                        handleTitle(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="image"
                                    value={image}
                                    placeholder="ImageURL"
                                    onChange={(e) => setImage(e.target.value)}
                                />
                                <div>
                                    <label
                                        className="btn  btn-primary mb-0"
                                        htmlFor="loadFile"
                                    >
                                        Load file &nbsp;{" "}
                                        <i className="fas fa-upload" />
                                    </label>
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="loadFile"
                                        id="loadFile"
                                        onChange={(e) =>
                                            loadImage(e.target.files[0])
                                        }
                                    />
                                    <button
                                        className="btn  btn-primary"
                                        onClick={(e) => loadGallery(e)}
                                    >
                                        Browse gallery{" "}
                                        <i className="far fa-share-square" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <textarea
                                    type="text"
                                    name="description"
                                    rows="5"
                                    value={description}
                                    placeholder="Item description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    placeholder="Item price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <select
                                    name="category"
                                    id="categoryChoose"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
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
                            </div>
                            <div>
                                <button
                                    className="btn btn-reset"
                                    onClick={(e) => clearInputs(e)}
                                >
                                    reset
                                </button>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    {sumBtn}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="item-preview">
                    <p className="title">Item preview</p>
                    <div className="row">
                        <div>
                            {image && (
                                <img
                                    src={image}
                                    className="img-fluid"
                                    alt={title ?? ""}
                                />
                            )}
                        </div>
                        <div className="text-info">
                            {title && <h4>{title}</h4>}
                            {description && <p>{description}</p>}
                            {price && <p>{price} uah</p>}
                        </div>
                    </div>
                </div>
            </div>

            <Modal ref={modal} size="fullscreen">
                <div
                    className={`modal-wrapper ${
                        drag || !gallery.length ? "dragging" : ""
                    }`}
                    onDragStart={(e) => onDragStart(e)}
                    onDragLeave={(e) => onDragLeave(e)}
                    onDragOver={(e) => onDragStart(e)}
                    onMouseUp={() => setDrag(false)}
                    onDrop={(e) => onDragLoad(e)}
                >
                    {!drag && gallery.length > 0 ? (
                        <div className="row catalog">
                            {gallery.map((img, idx) => (
                                <div
                                    className="item pop-in"
                                    key={idx}
                                    style={{ maxWidth: 220, maxHeight: 320 }}
                                >
                                    <div className="item-controls">
                                        <div className="edit"></div>
                                        <div className="delete">
                                            <button
                                                onClick={() => deleteImage(img)}
                                                className="item-control item-delete"
                                            >
                                                <i className="fas fa-times" />
                                            </button>
                                        </div>
                                    </div>
                                    <img
                                        className="item-img"
                                        src={img}
                                        alt=""
                                        onClick={() => {
                                            setImage(img);
                                            modal.current.close();
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ height: "100%" }}>Drop files here...</div>
                    )}
                    <div className="modal-controls">
                        <label
                            className="btn btn-success mb-0 "
                            htmlFor="loadFile"
                        >
                            Load file &nbsp; <i className="fas fa-upload" />
                        </label>
                        <input
                            className="hidden"
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
                </div>
            </Modal>
        </div>
    );
};

function arePropsEqual(prevProps, nextProps) {
    return prevProps.filters === nextProps.filters;
}

export default React.memo(ItemCreator, arePropsEqual);
