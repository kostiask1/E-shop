import React from "react"
import CallToAction from "./CallToAction/CallToAction"
import "./Heading.scss"

const Heading = () => {
    return (
        <div id="main" className="container">
            <div className="heading">
                <div className="circle">
                    made by <br />
                    Apollin Ko
                </div>
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
