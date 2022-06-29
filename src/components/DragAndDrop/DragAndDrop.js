import React, { useState } from "react"
import Input from "../Input/Input"
import { DeleteIcon } from "../../icons"

const DragAndDrop = ({ list, handleImageSet, deleteImg, setImagesArray }) => {
  const [orderedList, setOrderedList] = useState(
    () =>
      list &&
      list.map((item, index) => {
        return {
          order: index,
          id: index,
          link: item,
        }
      })
  )
  const [currentCard, setCurrentCard] = useState(null)

  const dragStartHandler = (e, card) => {
    setCurrentCard(card)
  }
  const dragEndHandler = (e) => {
    e.preventDefault()
  }
  const dropHandler = (e, card) => {
    e.preventDefault()
    let newOrder = orderedList.map((c) => {
      if (c.id === card.id) {
        return { ...c, order: currentCard.order }
      }
      if (c.id === currentCard.id) {
        return { ...c, order: card.order }
      }
      return c
    })
    setImagesArray(newOrder.sort(sortCards).map((item) => item.link))
    setOrderedList(newOrder.sort(sortCards))
  }
  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }
  return (
    <>
      {orderedList
        ? orderedList.map((item, index) => (
            <div
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, item)}
              onDragOver={(e) => dragEndHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragLeave={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, item)}
              key={item.link + index}
            >
              <Input
                type="text"
                name="image"
                value={list[index]}
                placeholder="Ссылка на картинку"
                change={handleImageSet.bind(null, index)}
                symbol={<DeleteIcon width=".7rem" />}
                symbolClick={deleteImg.bind(null, index)}
                required={index === 0 && list.length === 1 ? true : false}
              />
            </div>
          ))
        : null}
    </>
  )
}

export default DragAndDrop
