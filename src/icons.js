export const CartIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "1.5em"}
        height={height ?? "1.5em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
)
export const CartRemoveIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M1.41 1.13L0 2.54l4.39 4.39 2.21 4.66-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h7.46l1.38 1.38c-.5.36-.83.95-.83 1.62 0 1.1.89 2 1.99 2 .67 0 1.26-.33 1.62-.84L21.46 24l1.41-1.41L1.41 1.13zM7 15l1.1-2h2.36l2 2H7zM20 4H7.12l2 2h9.19l-2.76 5h-1.44l1.94 1.94c.54-.14.99-.49 1.25-.97l3.58-6.49C21.25 4.82 20.76 4 20 4zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2z"></path>
    </svg>
)
export const DeleteIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
    </svg>
)

export const EditIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
    </svg>
)

export const UploadIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 16"}
        fill={fill ?? "var(--textBlack)"}
    >
        <g>
            <rect fill="none" height={24} width={24} />
        </g>
        <g>
            <path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z" />
        </g>
    </svg>
)

export const ShareIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 16"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path>
    </svg>
)
export const PhoneIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 20"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
)

export const TelegramIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <g>
            <rect fill="none" height={24} width={24} y={0} />
        </g>
        <g>
            <path d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2z M16.64,8.8 c-0.15,1.58-0.8,5.42-1.13,7.19c-0.14,0.75-0.42,1-0.68,1.03c-0.58,0.05-1.02-0.38-1.58-0.75c-0.88-0.58-1.38-0.94-2.23-1.5 c-0.99-0.65-0.35-1.01,0.22-1.59c0.15-0.15,2.71-2.48,2.76-2.69c0.01-0.03,0.01-0.12-0.05-0.18c-0.06-0.05-0.14-0.03-0.21-0.02 c-0.09,0.02-1.49,0.95-4.22,2.79c-0.4,0.27-0.76,0.41-1.08,0.4c-0.36-0.01-1.04-0.2-1.55-0.37c-0.63-0.2-1.12-0.31-1.08-0.66 c0.02-0.18,0.27-0.36,0.74-0.55c2.92-1.27,4.86-2.11,5.83-2.51c2.78-1.16,3.35-1.36,3.73-1.36c0.08,0,0.27,0.02,0.39,0.12 c0.1,0.08,0.13,0.19,0.14,0.27C16.63,8.48,16.65,8.66,16.64,8.8z" />
        </g>
    </svg>
)

export const InstagramIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 512 512"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="m305 256c0 27.0625-21.9375 49-49 49s-49-21.9375-49-49 21.9375-49 49-49 49 21.9375 49 49zm0 0"></path>
        <path d="m370.59375 169.304688c-2.355469-6.382813-6.113281-12.160157-10.996094-16.902344-4.742187-4.882813-10.515625-8.640625-16.902344-10.996094-5.179687-2.011719-12.960937-4.40625-27.292968-5.058594-15.503906-.707031-20.152344-.859375-59.402344-.859375-39.253906 0-43.902344.148438-59.402344.855469-14.332031.65625-22.117187 3.050781-27.292968 5.0625-6.386719 2.355469-12.164063 6.113281-16.902344 10.996094-4.882813 4.742187-8.640625 10.515625-11 16.902344-2.011719 5.179687-4.40625 12.964843-5.058594 27.296874-.707031 15.5-.859375 20.148438-.859375 59.402344 0 39.25.152344 43.898438.859375 59.402344.652344 14.332031 3.046875 22.113281 5.058594 27.292969 2.359375 6.386719 6.113281 12.160156 10.996094 16.902343 4.742187 4.882813 10.515624 8.640626 16.902343 10.996094 5.179688 2.015625 12.964844 4.410156 27.296875 5.0625 15.5.707032 20.144532.855469 59.398438.855469 39.257812 0 43.90625-.148437 59.402344-.855469 14.332031-.652344 22.117187-3.046875 27.296874-5.0625 12.820313-4.945312 22.953126-15.078125 27.898438-27.898437 2.011719-5.179688 4.40625-12.960938 5.0625-27.292969.707031-15.503906.855469-20.152344.855469-59.402344 0-39.253906-.148438-43.902344-.855469-59.402344-.652344-14.332031-3.046875-22.117187-5.0625-27.296874zm-114.59375 162.179687c-41.691406 0-75.488281-33.792969-75.488281-75.484375s33.796875-75.484375 75.488281-75.484375c41.6875 0 75.484375 33.792969 75.484375 75.484375s-33.796875 75.484375-75.484375 75.484375zm78.46875-136.3125c-9.742188 0-17.640625-7.898437-17.640625-17.640625s7.898437-17.640625 17.640625-17.640625 17.640625 7.898437 17.640625 17.640625c-.003906 9.742188-7.898437 17.640625-17.640625 17.640625zm0 0"></path>
        <path d="m256 0c-141.363281 0-256 114.636719-256 256s114.636719 256 256 256 256-114.636719 256-256-114.636719-256-256-256zm146.113281 316.605469c-.710937 15.648437-3.199219 26.332031-6.832031 35.683593-7.636719 19.746094-23.246094 35.355469-42.992188 42.992188-9.347656 3.632812-20.035156 6.117188-35.679687 6.832031-15.675781.714844-20.683594.886719-60.605469.886719-39.925781 0-44.929687-.171875-60.609375-.886719-15.644531-.714843-26.332031-3.199219-35.679687-6.832031-9.8125-3.691406-18.695313-9.476562-26.039063-16.957031-7.476562-7.339844-13.261719-16.226563-16.953125-26.035157-3.632812-9.347656-6.121094-20.035156-6.832031-35.679687-.722656-15.679687-.890625-20.6875-.890625-60.609375s.167969-44.929688.886719-60.605469c.710937-15.648437 3.195312-26.332031 6.828125-35.683593 3.691406-9.808594 9.480468-18.695313 16.960937-26.035157 7.339844-7.480469 16.226563-13.265625 26.035157-16.957031 9.351562-3.632812 20.035156-6.117188 35.683593-6.832031 15.675781-.714844 20.683594-.886719 60.605469-.886719s44.929688.171875 60.605469.890625c15.648437.710937 26.332031 3.195313 35.683593 6.824219 9.808594 3.691406 18.695313 9.480468 26.039063 16.960937 7.476563 7.34375 13.265625 16.226563 16.953125 26.035157 3.636719 9.351562 6.121094 20.035156 6.835938 35.683593.714843 15.675781.882812 20.683594.882812 60.605469s-.167969 44.929688-.886719 60.605469zm0 0"></path>
    </svg>
)

export const PowerOffIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path>
    </svg>
)
export const SearchIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill="none"
        stroke={fill ?? "var(--textBlack)"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx={11} cy={11} r={8} />
        <line x1={21} y1={21} x2="16.65" y2="16.65" />
    </svg>
)
export const ImageIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "2.4em"}
        height={height ?? "2.4em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill="none"
        stroke={fill ?? "var(--textBlack)"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
)
export const ArrowUpIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "1.2em"}
        height={height ?? "1.2em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"></path>
    </svg>
)
export const ArrowDownIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "1.2em"}
        height={height ?? "1.2em"}
        viewBox={viewbox ?? "0 0 24 24"}
        fill={fill ?? "var(--textBlack)"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"></path>
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
    </svg>
)
export const ArrowRightIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "1.2em"}
        height={height ?? "1.2em"}
        viewBox={viewbox ?? "0 0 24 24"}
        stroke={fill ?? "var(--textBlack)"}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
)

export const ArrowLeftIcon = ({ width, height, fill, viewbox }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? "1.2em"}
        height={height ?? "1.2em"}
        viewBox={viewbox ?? "0 0 24 24"}
        stroke={fill ?? "var(--textBlack)"}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
)
