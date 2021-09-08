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
} from "../../localStorage";
const PurchaseForm = ({ buy }) => {
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
    const [memorize, setMemorize] = useState(false);
    const handleModal = (event) => {
        event.preventDefault();
        if (memorize) rememberUser();
    };
    const rememberUser = () => {};
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
                <div className="memorize-wrap">
                    <label htmlFor="memorize">Remember me</label>
                    <input
                        className="memorize"
                        id="memorize"
                        name="memorize"
                        type="checkbox"
                        value={memorize}
                        change={() => setMemorize(!memorize)}
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
