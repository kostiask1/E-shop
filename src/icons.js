import React from "react";

export const CartIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
);
export const DeleteIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
);

export const EditIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
);

export const UploadIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <g>
            <rect fill="none" height={24} width={24} />
        </g>
        <g>
            <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z" />
        </g>
    </svg>
);

export const ShareIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
);
export const PhoneIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
);

export const TelegramIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
);

export const InstagramIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "24px"}
        height={height ?? "24px"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
);
