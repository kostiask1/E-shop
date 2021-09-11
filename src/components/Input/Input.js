import React from "react";
import "./Input.scss";

const Input = (props) => {
    const {
        className,
        name,
        type,
        label,
        change,
        value,
        defaultValue,
        placeholder,
        required,
        symbol,
        symbolClick,
        important,
    } = props;
    const values =
        important === "defaultValue"
            ? {
                  defaultValue,
              }
            : important === "value" || (!important && { value: value ?? "" });
    return (
        <>
            {label ? (
                <label className="input-component" htmlFor={name ?? "input"}>
                    {label}
                </label>
            ) : null}
            <div
                className={`input-component-wrapper${
                    symbol ? " input-component-wrapper-with-symbol" : ""
                }`}
            >
                <input
                    className={`${className ?? ""} input-component`}
                    type={type ?? "text"}
                    {...values}
                    placeholder={placeholder ?? ""}
                    onChange={(e) => change(e.target.value)}
                    name={name ?? "input"}
                    required={required ? "required" : false}
                />
                {symbol && (
                    <span
                        onClick={() =>
                            props.hasOwnProperty("symbolClick")
                                ? symbolClick()
                                : false
                        }
                        className="input-component"
                        style={
                            props.hasOwnProperty("symbolClick")
                                ? {
                                      cursor: "pointer",
                                  }
                                : {}
                        }
                    >
                        {symbol}
                    </span>
                )}
            </div>
        </>
    );
};

export default Input;
