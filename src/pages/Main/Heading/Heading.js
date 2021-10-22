import React from "react"
import "./Heading.scss"
import CallToAction from "../../../components/CallToAction/CallToAction"

const Heading = () => {
    return (
        <div className="container">
            <div className="heading">
                <div className="img-wrapper">
                    <div>
                        <img
                            src="./main/4071b96238d3880b590fe948aaa36bca 1.webp"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            src="./main/32707caf09b45dd06e456ce21e113ddc 1.webp"
                            alt=""
                        />
                    </div>
                </div>
                <CallToAction />
                <img
                    className="sticker"
                    src="./main/—Pngtree—cherry blossom pink texture insulation_5485330 1.png"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Heading
