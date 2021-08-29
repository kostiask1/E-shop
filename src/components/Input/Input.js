import React from "react";
import "./Input.scss";

const Input = (props) => {
    const {
        name,
        type,
        label,
        change,
        defaultValue,
        value,
        placeholder,
        required,
        symbol,
    } = props;
    return (
        <>
            {label ? (
                <label className="input-component" htmlFor={name ?? "input"}>
                    {label}
                </label>
            ) : null}
            <div className="input-component-wrapper">
                <input
                    className="input-component"
                    type={type ?? "text"}
                    defaultValue={defaultValue ?? ""}
                    value={value ?? ""}
                    placeholder={placeholder ?? ""}
                    onChange={(e) => change(e.target.value)}
                    name={name ?? "input"}
                    required={required ? "required" : false}
                />
                <span
                    className="input-component"
                    style={!symbol ? { borderLeft: "unset" } : null}
                >
                    {symbol ?? "\u00a0"}
                </span>
            </div>
        </>
    );
};

export default Input;
