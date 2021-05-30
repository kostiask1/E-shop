import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
  useRef,
  useCallback,
} from "react";

export function Modal(
  { children, size, fade = false, defaultOpened = false },
  ref
) {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  let visible = useRef(false);
  useEffect(() => {
    visible.current = isOpen;
  }, [isOpen]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
      visible,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return isOpen ? (
    <div
      className="modal fade show"
      id="Edit"
      aria-labelledby="EditLabel"
      aria-hidden="true"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={close} />
      <div
        className={`modal-dialog ${
          size ? `modal-${size}` : ""
        } modal-dialog-centered`}
      >
        <div className="modal-content">
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  ) : null;
}
export default forwardRef(Modal);
