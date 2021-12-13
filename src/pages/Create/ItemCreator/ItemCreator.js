import React, { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import Modal from "../../../components/Modal/Modal"
import { app } from "../../../base"
import "./ItemCreator.scss"
import { DropDown } from "../../../components/DropDown/DropDown"
import Input from "../../../components/Input/Input"
import { DeleteIcon, UploadIcon, ImageIcon } from "../../../icons"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import DragAndDrop from "../../../components/DragAndDrop/DragAndDrop"
import ShopItem from "../../../components/ShopItem/ShopItem"
const db = app.firestore()

const ItemCreator = (props) => {
    const sumBtn = props.filters || props.new ? "Добавить" : "Обновить"
    const [filters, setFilters] = useState(props.filters || [])
    const [title, setTitle] = useState(props.title || "")
    const [imagesArray, setImagesArray] = useState(props.imagesArray || [""])
    const [description, setDescription] = useState(props.description || "")
    const [archived, setArchived] = useState(props.archived || false)
    const [category, setCategory] = useState(props.category || "")
    const [drag, setDrag] = useState(false)
    const [gallery, setGallery] = useState([])
    const [price, setPrice] = useState(props.price || "")
    const [discountPrice, setDiscountPrice] = useState(
        props.discountPrice || ""
    )
    const [discountPercent, setDiscountPercent] = useState(
        (discountPrice && 100 - Math.ceil((discountPrice / price) * 100)) ||
            false
    )
    const [boughtCount, setBoughtCount] = useState(props.boughtCount || "")
    const [tab, setTab] = useState("big")
    const id = props.id || uuidv4()
    const modal = useRef(null)

    useEffect(() => {
        if (discountPercent) handleDiscountPercent(discountPercent)
        //eslint-disable-next-line
    }, [price])

    useEffect(() => {
        if (filters && filters.length === 0) {
            getFilters()
        }
        setFilters((prev) => (prev = props.filters))
        //eslint-disable-next-line
    }, [props.filters])

    const getFilters = async () => {
        try {
            let filt = await db.collection("categories").get()
            filt ? (filt = filt.docs.map((doc) => doc.data())) : (filt = [])
            if (filt.length) {
                filt = Object.values(filt[0].categories)
            }
            setFilters(filt)
            return filters
        } catch (err) {
            console.error(err)
        }
    }
    const clearInputs = (e) => {
        if (e) e.preventDefault()
        setTitle(props.title ?? "")
        setImagesArray(props.imagesArray ?? [""])
        setDescription(props.description ?? "")
        setArchived(props.archived ?? false)
        setPrice(props.price ?? "")
        setDiscountPrice(props.discountPrice ?? "")
        setDiscountPercent(
            props.discountPrice
                ? 100 - Math.ceil((props.discountPrice / props.price) * 100)
                : ""
        )
        setBoughtCount(props.boughtCount ?? "")
        setCategory(props.category ?? "")
    }
    const newItem = (e) => {
        e.preventDefault()
        const data = {
            category,
            id,
            imagesArray,
            price: +price,
            discountPrice: +discountPrice,
            description,
            timestamp: new Date().getTime(),
            text: title,
            boughtCount,
            archived,
        }
        db.collection("All")
            .doc(data.id)
            .set(data)
            .then(() => {
                if (props.id === id || props.hasOwnProperty("close")) {
                    props.close()
                    return props.getData()
                }
                clearInputs()
            })
    }
    const loadImages = async (e) => {
        try {
            let files = Array.from(e)
            let links = []
            const storageRef = app.storage().ref().child("images")
            let requests = Promise.all(
                files.map(async (file) => {
                    const fileRef = storageRef.child(file.name)
                    await fileRef.put(file)
                    links.push(await fileRef.getDownloadURL())
                })
            )
            requests.then(() => {
                setImagesArray((array) => {
                    if (array[array.length - 1] === "") {
                        array.pop()
                    }
                    return array.concat(links)
                })
                if (modal.current.visible.current) {
                    loadGallery()
                }
            })
        } catch (err) {
            console.error(err)
        }
    }
    const deleteImage = async (file) => {
        const storageRef = app.storage()
        setGallery((gallery) => gallery.filter((img) => img !== file))
        storageRef.refFromURL(file).delete(file)
        let clone = [...imagesArray]
        clone = clone.filter((img) => img !== file)
        setImagesArray(clone)
    }
    const clearImages = (event) => {
        event.preventDefault()
        setImagesArray([""])
    }
    const resetImages = (event) => {
        event.preventDefault()
        setImagesArray(props.imagesArray ?? [""])
    }
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
        modal.current.open()
    }
    const handleTitle = (e) => {
        if (!e) return setTitle("")
        let newTitle = e[0].toUpperCase()
        newTitle = newTitle + e.slice(1)
        setTitle(newTitle)
    }
    const handleArchive = (e) => {
        e.preventDefault()
        setArchived((archived) => !archived)
    }
    const onDragStart = (e) => {
        e.preventDefault()
        if (!e.target.classList.contains("img-fluid")) setDrag(true)
    }
    const onDragLeave = (e) => {
        e.preventDefault()
        setDrag(false)
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
                    modal.current.close()
                }
                return loadImages([file]).then(setDrag(false))
            })
        } catch (err) {
            console.error(err)
        }
    }
    const handleDiscountPercent = (percent) => {
        percent = +percent
        if (percent && percent > 0 && percent < 100) {
            let newPrice = Math.floor(price - (price / 100) * percent)
            setDiscountPrice(newPrice)
            setDiscountPercent(percent)
        } else if (percent && percent >= 100) {
            let newPrice = Math.floor(price - (price / 100) * 99)
            setDiscountPrice(newPrice)
            setDiscountPercent(99)
        } else {
            setDiscountPrice("")
            setDiscountPercent("")
        }
    }
    const handleDiscountPrice = (discountPrice) => {
        discountPrice = +discountPrice
        if (discountPrice && discountPrice > 0 && discountPrice < price) {
            let newPercent = 100 - Math.ceil((discountPrice / price) * 100)
            setDiscountPrice(discountPrice)
            setDiscountPercent(newPercent)
        } else if (discountPrice && discountPrice > price) {
            setDiscountPrice(price - 1)
            setDiscountPercent(1)
        } else {
            setDiscountPrice("")
            setDiscountPercent("")
        }
    }
    const handleTabs = (tab) => {
        if (tab === "card") {
            setTab(tab)
        } else {
            setTab("big")
        }
    }
    const handleImageSet = (index, url) => {
        setImagesArray((prevArray) =>
            prevArray.splice(prevArray.splice(index, 1, url))
        )
    }
    const deleteImg = (index) => {
        let clone = [...imagesArray]
        clone = clone.splice(clone.splice(index, 1))
        setImagesArray(clone)
    }
    const addToImgArray = (event) => {
        event.preventDefault()
        setImagesArray((prevArray) => prevArray.concat(""))
    }
    return (
        <div className="item-creator">
            <div className="row">
                <div>
                    <form onSubmit={(e) => newItem(e)}>
                        <p className="title">Создать элемент</p>
                        <div className="row">
                            <div>
                                <Input
                                    type="text"
                                    name="title"
                                    value={title}
                                    placeholder="Название"
                                    change={handleTitle}
                                    symbol="Имя"
                                    required
                                />
                            </div>
                            <DragAndDrop
                                key={imagesArray.length}
                                list={imagesArray}
                                setImagesArray={setImagesArray}
                                handleImageSet={handleImageSet}
                                deleteImg={deleteImg}
                            />
                            <div>
                                <label
                                    className="btn btn-outline"
                                    onClick={addToImgArray}
                                >
                                    + изображение
                                </label>
                                <label
                                    className="btn btn-outline btn-danger"
                                    onClick={() =>
                                        deleteImg(imagesArray.length - 1)
                                    }
                                >
                                    - изображение
                                </label>
                            </div>
                            <div>
                                <label
                                    className="btn btn-primary btn-expanded"
                                    htmlFor="loadFile"
                                >
                                    Загрузить файл &nbsp;&nbsp;&nbsp;
                                    <UploadIcon
                                        fill="var(--main)"
                                        height="1.4em"
                                        viewbox="0 0 20 24"
                                    />
                                </label>
                            </div>
                            <div>
                                <input
                                    className="hidden"
                                    type="file"
                                    name="loadFile"
                                    id="loadFile"
                                    multiple="multiple"
                                    onChange={(e) => loadImages(e.target.files)}
                                />
                                <button
                                    className="btn btn-primary btn-expanded"
                                    onClick={(e) => loadGallery(e)}
                                >
                                    Обзор галереи&nbsp;&nbsp;
                                    <ImageIcon
                                        fill="var(--main)"
                                        width="1.6em"
                                        height="1.2em"
                                        viewbox="0 0 20 22"
                                    />
                                </button>
                            </div>
                            <div>
                                <label
                                    className="btn btn-warning btn-expanded"
                                    onClick={resetImages}
                                >
                                    Сбросить изображения
                                </label>
                            </div>
                            <div>
                                <button
                                    className="btn btn-danger btn-expanded"
                                    onClick={clearImages}
                                >
                                    Очистить изображения
                                </button>
                            </div>
                            <div>
                                <textarea
                                    type="text"
                                    name="description"
                                    rows="5"
                                    value={description}
                                    placeholder="описание"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    name="price"
                                    value={price}
                                    placeholder="цена"
                                    change={setPrice}
                                    symbol="грн"
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    name="discount"
                                    value={discountPrice}
                                    placeholder="Цена со скидкой (необязательно)"
                                    change={handleDiscountPrice}
                                    symbol="грн - %"
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    name="percent"
                                    value={discountPercent}
                                    placeholder="Процент скидки (необязательно)"
                                    change={handleDiscountPercent}
                                    symbol="%"
                                />
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    name="boughtCount"
                                    value={boughtCount}
                                    placeholder="Сколько раз купили (необязательно)"
                                    change={setBoughtCount}
                                    symbol="Куплено"
                                />
                            </div>
                            <DropDown
                                key={filters + "sas"}
                                defaultValue={category}
                                change={setCategory}
                                options={filters}
                                placeholder="Выберите категорию"
                            />
                            <div>
                                <button
                                    className="btn btn-primary"
                                    onClick={(e) => handleArchive(e)}
                                >
                                    {archived ? "В Архиве" : "В Каталоге"}
                                </button>
                            </div>
                            <div>
                                <button
                                    className="btn btn-warning"
                                    onClick={(e) => clearInputs(e)}
                                >
                                    сброс настроек
                                </button>
                                <button
                                    className="btn btn-success"
                                    type="submit"
                                >
                                    {sumBtn}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="item-preview">
                    <p className="title">Предварительный просмотр товара</p>
                    <div className="btns-wrapper">
                        <button
                            className={
                                tab !== "card" ? "btn-primary" : "btn-outline"
                            }
                            onClick={() => handleTabs("big")}
                        >
                            Целая карточка
                        </button>
                        <button
                            className={
                                tab === "card" ? "btn-primary" : "btn-outline"
                            }
                            onClick={() => handleTabs("card")}
                        >
                            Каталог карточка
                        </button>
                    </div>
                    <div className="row">
                        {tab === "card" ? (
                            <ShopItem
                                item={{
                                    id,
                                    imagesArray,
                                    text: title,
                                    description,
                                    price,
                                    discountPrice,
                                    category,
                                    boughtCount,
                                }}
                                disabledControls={true}
                            />
                        ) : (
                            <div className="card-preview">
                                {imagesArray && (
                                    <div className="img">
                                        {imagesArray &&
                                        imagesArray.length > 1 ? (
                                            <Carousel
                                                showStatus={false}
                                                infiniteLoop={true}
                                                emulateTouch={true}
                                                showThumbs={false}
                                                renderIndicator={(
                                                    onClickHandler,
                                                    isSelected,
                                                    index,
                                                    label
                                                ) => {
                                                    if (isSelected) {
                                                        return (
                                                            <li
                                                                className="li selected"
                                                                aria-label={`Selected: ${label} ${
                                                                    index + 1
                                                                }`}
                                                                title={`Selected: ${label} ${
                                                                    index + 1
                                                                }`}
                                                            >
                                                                {index + 1}
                                                            </li>
                                                        )
                                                    }
                                                    return (
                                                        <li
                                                            className="li"
                                                            onClick={
                                                                onClickHandler
                                                            }
                                                            onKeyDown={
                                                                onClickHandler
                                                            }
                                                            value={index}
                                                            key={index}
                                                            role="button"
                                                            tabIndex={0}
                                                            title={`${label} ${
                                                                index + 1
                                                            }`}
                                                            aria-label={`${label} ${
                                                                index + 1
                                                            }`}
                                                        >
                                                            {index + 1}
                                                        </li>
                                                    )
                                                }}
                                            >
                                                {imagesArray.map((img) => (
                                                    <img
                                                        src={img}
                                                        alt={title}
                                                        key={img}
                                                    />
                                                ))}
                                            </Carousel>
                                        ) : (
                                            <img
                                                src={
                                                    imagesArray &&
                                                    imagesArray[0]
                                                }
                                                className="img-fluid"
                                                alt={title}
                                            />
                                        )}
                                    </div>
                                )}
                                <div className="text-info">
                                    {title && <h1>{title}</h1>}
                                    {!discountPrice ? (
                                        <p className="price-now">{price} грн</p>
                                    ) : (
                                        <>
                                            <del className="price-was">
                                                {price}
                                            </del>
                                            <span className="price-now">
                                                {discountPrice} грн
                                            </span>
                                        </>
                                    )}
                                    {description && (
                                        <div className="description">
                                            {description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row"></div>
                </div>
            </div>

            <Modal ref={modal} size="xl">
                {modal.current && modal.current.visible.current && (
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
                                                    onClick={() =>
                                                        deleteImage(img)
                                                    }
                                                    className="item-control item-delete"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <span className="image-format">
                                            {/\b(?:.jpg|.webp|.png|.svg)\b/gi.exec(
                                                img
                                            )}
                                        </span>
                                        <img
                                            className="item-img img-fluid"
                                            src={img}
                                            alt=""
                                            onClick={() => {
                                                setImagesArray((prevArray) =>
                                                    prevArray.concat(img)
                                                )
                                                modal.current.close()
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ height: "100%" }}>
                                Перетащите файлы сюда...
                            </div>
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
                            <button
                                className="btn btn-primary"
                                onClick={() => modal.current.close()}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps.filters === nextProps.filters
}

export default React.memo(ItemCreator, arePropsEqual)
