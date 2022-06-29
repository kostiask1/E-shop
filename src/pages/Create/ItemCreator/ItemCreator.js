import React, { useEffect, useRef, useState, useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import Modal from "../../../components/Modal/Modal"
import { app } from "../../../base"
import "./ItemCreator.scss"
import { DropDown } from "../../../components/DropDown/DropDown"
import Input from "../../../components/Input/Input"
import { UploadIcon, ImageIcon } from "../../../icons"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import DragAndDrop from "../../../components/DragAndDrop/DragAndDrop"
import ShopItem from "../../../components/ShopItem/ShopItem"
import { catalogContext } from "./../../../context/catalog/catalog-context"
import Gallery from "../../../components/Gallery/Gallery"

const ItemCreator = (props) => {
  const { item = {} } = props
  const { getFilters, uploadItem } = useContext(catalogContext)
  const sumBtn = props.filters || props.new ? "Добавить" : "Обновить"
  const [filters, setFilters] = useState(props.filters || [])
  const [title, setTitle] = useState(item.text || "")
  const [imagesArray, setImagesArray] = useState(item.imagesArray || [""])
  const [description, setDescription] = useState(item.description || "")
  const [archived, setArchived] = useState(item.archived || false)
  const [category, setCategory] = useState(item.category || "")
  const [price, setPrice] = useState(item.price || "")
  const [discountPrice, setDiscountPrice] = useState(item.discountPrice || "")
  const [discountPercent, setDiscountPercent] = useState(
    (discountPrice && 100 - Math.ceil((discountPrice / price) * 100)) || false
  )
  const [boughtCount, setBoughtCount] = useState(item.boughtCount || "")
  const [tab, setTab] = useState("big")
  const id = item.id || uuidv4()
  const modal = useRef(null)

  useEffect(() => {
    if (discountPercent) handleDiscountPercent(discountPercent)
    //eslint-disable-next-line
  }, [price])

  useEffect(() => {
    if (!filters || filters.length === 0) {
      getFilters().then((resp) => setFilters(resp))
    } else {
      setFilters((prev) => (prev = props.filters))
    }
    //eslint-disable-next-line
  }, [props.filters])

  const clearInputs = (e) => {
    if (e) e.preventDefault()
    setTitle(item.text ?? "")
    setImagesArray(item.imagesArray ?? [""])
    setDescription(item.description ?? "")
    setArchived(item.archived ?? false)
    setPrice(item.price ?? "")
    setDiscountPrice(item.discountPrice ?? "")
    setDiscountPercent(
      item.discountPrice
        ? 100 - Math.ceil((item.discountPrice / item.price) * 100)
        : ""
    )
    setBoughtCount(item.boughtCount ?? "")
    setCategory(item.category ?? "")
  }
  const newItem = (e) => {
    const data = {
      category,
      id,
      imagesArray,
      price: +price,
      discountPrice: +discountPrice,
      description,
      text: title,
      boughtCount,
      archived,
    }
    uploadItem(e, data).then(() => {
      if (item.id === id || props.hasOwnProperty("close")) {
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
  const clearImages = (event) => {
    event.preventDefault()
    setImagesArray([""])
  }
  const resetImages = (event) => {
    event.preventDefault()
    setImagesArray(item.imagesArray ?? [""])
  }
  const loadGallery = async (e) => {
    e.preventDefault()
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
                <label className="btn btn-outline" onClick={addToImgArray}>
                  + изображение
                </label>
                <label
                  className="btn btn-outline btn-danger"
                  onClick={() => deleteImg(imagesArray.length - 1)}
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
                  accept=".jpg, .avif, .webp, .png, .jpeg"
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
                  onChange={(e) => setDescription(e.target.value)}
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
              <div className="divider"></div>
              <button
                className="btn btn-warning"
                onClick={(e) => clearInputs(e)}
              >
                Сбросить до старых значений
              </button>
              <div className="divider"></div>
              <div>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "5px" }}
                  onClick={(e) => handleArchive(e)}
                >
                  {archived ? "В Архиве" : "В Каталоге"}
                </button>
                <button className="btn btn-success" type="submit">
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
              className={tab !== "card" ? "btn-primary" : "btn-outline"}
              onClick={() => handleTabs("big")}
            >
              Целая карточка
            </button>
            <button
              className={tab === "card" ? "btn-primary" : "btn-outline"}
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
                  archived,
                }}
                disabledControls={true}
              />
            ) : (
              <div className={`card-preview ${archived ? "archived" : ""}`}>
                {imagesArray && (
                  <div className="img">
                    {imagesArray && imagesArray.length > 1 ? (
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
                                aria-label={`Selected: ${label} ${index + 1}`}
                                title={`Selected: ${label} ${index + 1}`}
                              >
                                {index + 1}
                              </li>
                            )
                          }
                          return (
                            <li
                              className="li"
                              onClick={onClickHandler}
                              onKeyDown={onClickHandler}
                              value={index}
                              key={index}
                              role="button"
                              tabIndex={0}
                              title={`${label} ${index + 1}`}
                              aria-label={`${label} ${index + 1}`}
                            >
                              {index + 1}
                            </li>
                          )
                        }}
                      >
                        {imagesArray.map((img) => (
                          <img src={img} alt={title} key={img} />
                        ))}
                      </Carousel>
                    ) : (
                      <img
                        src={imagesArray && imagesArray[0]}
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
                      <del className="price-was">{price}</del>
                      <span className="price-now">{discountPrice} грн</span>
                    </>
                  )}
                  {description && (
                    <div className="description">{description}</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="row"></div>
        </div>
      </div>

      <Modal ref={modal} size="xl">
        {modal.current && (
          <Gallery
            imagesArray={imagesArray}
            setImagesArray={setImagesArray}
            loadImages={loadImages}
            close={modal.current.close}
          />
        )}
      </Modal>
    </div>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.filters === nextProps.filters
}

export default React.memo(ItemCreator, arePropsEqual)
