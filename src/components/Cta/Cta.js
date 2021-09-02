import React, { useState, useEffect } from "react";
import "./Cta.scss";
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME;

const Cta = () => {
    const [action, setAction] = useState("");
    const actions = [
        "buy our shoppers",
        "buy our rings",
        "only the best goods",
    ];
    useEffect(() => {
        let index = Math.floor(Math.random() * actions.length);
        setAction(actions[index]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main className="main">
            <div className="bg">
                <div className="cta">
                    <h1 style={{ fontWeight: 300 }}>{SHOP_NAME}</h1>
                    <p>{action}</p>
                </div>
                <div className="container">
                    <p>Shop by Apollin Ko</p>
                </div>
            </div>
        </main>
    );
};

export default Cta;
