import React, { useEffect, useState } from "react"
import "./Strokes.scss"

const Strokes = ({ offset }) => {
    const [width, setWidth] = useState(() => window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            return setWidth(window.innerWidth)
        }
        window.removeEventListener("resize", handleResize)
        window.addEventListener("resize", handleResize)
        return (_) => window.removeEventListener("resize", handleResize)
    }, [width])
    return (
        <>
            <svg
                width={width}
                height={505}
                viewBox={`0 0 ${width} 505`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-33 497C-33 497 136.802 350.806 246.553 305.506C356.303 260.207 400.107 253.844 501.256 231.38C701.756 186.851 819.727 185.917 1025.16 184.021C1253.95 181.91 1394.08 309.127 1609.11 231.38C1718.76 191.737 1764.46 136.859 1861.74 72.8312C1899.15 48.2126 1957 9 1957 9"
                    stroke="#E54900"
                    strokeWidth={20}
                    pathLength="1"
                    strokeDashoffset={1.2 - offset}
                    strokeDasharray={1}
                />
            </svg>
            <svg
                width={width}
                height={945}
                viewBox={`0 0 ${width} 945`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-27.4902 12.0375C-67.1296 -4.31503 118.55 81.5358 164.448 134.682C210.346 187.827 203.074 293.346 270.849 367.705C329.705 432.278 384.932 443.763 460.701 488.305C652.551 601.088 754.283 704.318 976.014 733.593C1182.17 760.811 1297.69 610.288 1501.76 649.787C1712.64 690.604 1838.94 768.844 1967 938"
                    stroke="#0327B3"
                    strokeWidth={20}
                    pathLength="1"
                    strokeDashoffset={1.2 - offset}
                    strokeDasharray={1}
                />
            </svg>
            <svg
                width={width}
                height={937}
                viewBox={`0 0 ${width} 937`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M-73.4902 7.03751C-113.13 -9.31503 72.5499 76.5358 118.448 129.682C164.346 182.827 157.074 288.346 224.849 362.705C283.705 427.278 338.932 438.763 414.701 483.305C606.551 596.088 708.283 699.318 930.014 728.593C1136.17 755.811 1251.69 605.288 1455.76 644.787C1666.64 685.604 1792.94 763.844 1921 933"
                    stroke="black"
                    strokeWidth={10}
                    pathLength="1"
                    strokeDashoffset={1.2 - offset}
                    strokeDasharray={1}
                />
            </svg>
        </>
    )
}

export default Strokes
