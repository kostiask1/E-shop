import React, { useState } from "react";
import "./PurchaseForm.scss";
import { DropDown } from "../DropDown/DropDown";
import Input from "../Input/Input";
import {
    local_userName,
    local_userPhone,
    local_userAddress,
    local_userCode,
    local_userService,
    local_userPayment,
} from "../../localStorage";
const PurchaseForm = ({ buy, modal }) => {
    const [name, setName] = useState(
        JSON.parse(localStorage.getItem(local_userName)) || ""
    );
    const [phone, setPhone] = useState(
        JSON.parse(localStorage.getItem(local_userPhone)) || ""
    );
    const [address, setAddress] = useState(
        JSON.parse(localStorage.getItem(local_userAddress)) || ""
    );
    const [code, setCode] = useState(
        JSON.parse(localStorage.getItem(local_userCode)) || ""
    );
    const [service, setService] = useState(
        JSON.parse(localStorage.getItem(local_userService)) || "Nova Poshta"
    );
    const [payment, setPayment] = useState(
        JSON.parse(localStorage.getItem(local_userPayment)) || "Card"
    );
    const [message, setMessage] = useState("");
    const [memorize, setMemorize] = useState(true);

    const handleModal = (event) => {
        event.preventDefault();
        if (memorize) rememberUser();
        buy({ name, phone, address, code, service, payment, message });
    };
    const rememberUser = () => {
        localStorage.setItem(local_userName, JSON.stringify(name));
        localStorage.setItem(local_userPhone, JSON.stringify(phone));
        localStorage.setItem(local_userAddress, JSON.stringify(address));
        localStorage.setItem(local_userCode, JSON.stringify(code));
        localStorage.setItem(local_userService, JSON.stringify(service));
        localStorage.setItem(local_userPayment, JSON.stringify(payment));
    };
    return (
        <div className="purchase-form">
            <form onSubmit={handleModal}>
                <Input
                    name="name"
                    value={name}
                    label="Type your Name and Surname"
                    change={setName}
                    required={true}
                />
                <Input
                    name="tel"
                    type="tel"
                    value={phone}
                    label="Enter your phone number"
                    change={setPhone}
                    required={true}
                />
                <Input
                    name="address"
                    value={address}
                    label="Enter your delivery address"
                    change={setAddress}
                    required={true}
                />
                <Input
                    name="postal_code"
                    value={code}
                    label="Enter your postal code"
                    change={setCode}
                />
                <label className="service">Choose post service</label>
                <DropDown
                    defaultValue={service}
                    change={setService}
                    options={["Nova Poshta", "Ukr Poshta"]}
                    searchable={false}
                />
                <label className="service">Choose payment type</label>
                <DropDown
                    defaultValue={payment}
                    change={setPayment}
                    options={["Card", "Cash"]}
                    searchable={false}
                />
                <label className="service">Message</label>
                <textarea
                    type="text"
                    name="message"
                    rows={5}
                    value={message}
                    placeholder="Enter your wishes (optional)"
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className="memorize-wrap">
                    <label htmlFor="memorize">Remember me</label>
                    <input
                        className="memorize"
                        id="memorize"
                        name="memorize"
                        type="checkbox"
                        checked={memorize && "checked"}
                        value={memorize}
                        onChange={() => setMemorize(!memorize)}
                    />
                </div>
                <button type="submit" className="btn-success">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PurchaseForm;
