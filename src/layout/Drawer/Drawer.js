/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
} from "react"
import "./Drawer.scss"
import { CSSTransition } from "react-transition-group"
import { Times } from "../../icons"

function Drawer({ children, position }, ref) {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(!visible.current), [])

  let visible = useRef(false)
  useEffect(() => {
    if (isOpen) {
      document
        .querySelector(".backdrop")
        .addEventListener("mouseenter", mouseOverListener)
    }
    visible.current = isOpen
  }, [isOpen])

  const mouseOverListener = (e) => {
    if (position === "left" && e.screenX > 70) {
      close()
    } else if (position === "right" && e.screenX < window.innerWidth - 70) {
      close()
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      toggle,
      close,
      visible,
    }),
    [close, toggle]
  )

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close()
    },
    [close]
  )

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false)
    return () => {
      document.removeEventListener("keydown", handleEscape, false)
    }
  }, [handleEscape, isOpen])

  return (
    <CSSTransition in={isOpen} timeout={0}>
      <div className={"drawer " + position}>
        {isOpen ? <div className="backdrop" onClick={close}></div> : null}
        <div className="close" onClick={close}>
          <Times strokeWidth="3px" fill="var(--main-2)" />
        </div>
        {isOpen && <>{children}</>}
      </div>
    </CSSTransition>
  )
}

export default forwardRef(Drawer)
