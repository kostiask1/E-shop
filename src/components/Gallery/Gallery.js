import React, { useEffect, useState } from "react"
import { app } from "../../base"
import { DeleteIcon, UploadIcon } from "./../../icons"

const Gallery = ({ setImagesArray, imagesArray, loadImages, close }) => {
    const [drag, setDrag] = useState(false)
    const [gallery, setGallery] = useState([])

    useEffect(() => {
        loadGallery()
    }, [])

    const loadGallery = async (e) => {
        if (e) {
            e.preventDefault()
        }
        var storageRef = app.storage().ref()
        var listRef = storageRef.child("images")
        listRef.listAll().then(function (result) {
            if (result.items.length === 0) return setGallery([])
            let promises = result.items.map(function (imgRef) {
                return imgRef.getDownloadURL().then(function (url) {
                    return url
                })
            })
            Promise.all(promises).then((items) => {
                setGallery(items)
            })
        })
    }

    const deleteImage = async (file) => {
        const storageRef = app.storage()
        setGallery((gallery) => gallery.filter((img) => img !== file))
        storageRef.refFromURL(file).delete(file)
        let clone = [...imagesArray]
        clone = clone.filter((img) => img !== file)
        setImagesArray(clone)
    }

    const onDragLoad = (e) => {
        e.preventDefault()
        try {
            let files = [...e.dataTransfer.files]
            files.map((file) => {
                if (
                    !imagesArray.length ||
                    (imagesArray.length === 1 && imagesArray[0] === "")
                ) {
                    close()
                }
                return loadImages([file]).then(setDrag(false))
            })
        } catch (err) {
            console.error(err)
        }
    }
    const onDragStart = (e) => {
        e.preventDefault()
        if (!e.target.classList.contains("img-fluid")) setDrag(true)
    }
    const onDragLeave = (e) => {
        e.preventDefault()
        setDrag(false)
    }
    return (
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
                <div className="row images-catalog">
                    {gallery.map((img, idx) => (
                        <div className="item pop-in" key={idx}>
                            <div className="item-controls">
                                <div className="edit"></div>
                                <div className="delete">
                                    <button
                                        onClick={() => deleteImage(img)}
                                        className="item-control item-delete"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                            <span className="image-format">
                                {/\b(?:.jpg|.webp|.png|.svg)\b/gi.exec(img)}
                            </span>
                            <img
                                className="item-img img-fluid"
                                src={img}
                                alt=""
                                onClick={() => {
                                    setImagesArray((prevArray) =>
                                        prevArray.concat(img)
                                    )
                                    close()
                                }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ height: "100%" }}>Перетащите файлы сюда...</div>
            )}
            <div className="modal-controls">
                <label
                    className="btn btn-success btn-expanded"
                    htmlFor="loadFile"
                >
                    Загрузить файл&nbsp;&nbsp;&nbsp;&nbsp;
                    <UploadIcon
                        fill="var(--main)"
                        height="1.4em"
                        viewbox="0 0 20 24"
                    />
                </label>
                <input
                    className="hidden"
                    type="file"
                    name="loadFile"
                    id="loadFile"
                    onChange={(e) => loadImages(e.target.files)}
                />
                <button className="btn btn-primary" onClick={close}>
                    Закрыть
                </button>
            </div>
        </div>
    )
}

export default Gallery
