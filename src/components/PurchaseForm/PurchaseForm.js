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
    local_userDepartment,
    local_userEmail,
} from "../../localStorage";
const PurchaseForm = ({ buy, modal }) => {
    const [name, setName] = useState(
        JSON.parse(localStorage.getItem(local_userName)) || ""
    );
    const [phone, setPhone] = useState(
        JSON.parse(localStorage.getItem(local_userPhone)) || ""
    );
    const [email, setEmail] = useState(
        JSON.parse(localStorage.getItem(local_userEmail)) || ""
    );
    const [address, setAddress] = useState(
        JSON.parse(localStorage.getItem(local_userAddress)) || ""
    );
    const [code, setCode] = useState(
        JSON.parse(localStorage.getItem(local_userCode)) || ""
    );
    const [department, setDepartment] = useState(
        JSON.parse(localStorage.getItem(local_userDepartment)) || ""
    );
    const [service, setService] = useState(
        JSON.parse(localStorage.getItem(local_userService)) || "nova"
    );
    const [payment, setPayment] = useState(
        JSON.parse(localStorage.getItem(local_userPayment)) || "Card"
    );
    const [deliveryType, setDeliveryType] = useState("department");
    const [message, setMessage] = useState("");
    const [memorize, setMemorize] = useState(true);

    const handleModal = (event) => {
        event.preventDefault();
        if (memorize) rememberUser();
        let params = {
            name,
            phone,
            address,
            service,
            payment,
            message,
            deliveryType,
            email,
        };
        service === "nova"
            ? (params["department"] = department)
            : (params["code"] = code);
        //buy(params);
    };
    const rememberUser = () => {
        localStorage.setItem(local_userName, JSON.stringify(name));
        localStorage.setItem(local_userPhone, JSON.stringify(phone));
        localStorage.setItem(local_userEmail, JSON.stringify(email));
        localStorage.setItem(local_userAddress, JSON.stringify(address));
        localStorage.setItem(local_userCode, JSON.stringify(code));
        localStorage.setItem(local_userDepartment, JSON.stringify(department));
        localStorage.setItem(local_userService, JSON.stringify(service));
        localStorage.setItem(local_userPayment, JSON.stringify(payment));
    };
    return (
        <div className="purchase-form">
            <form onSubmit={handleModal}>
                <div>
                    <Input
                        name="name"
                        value={name}
                        label="Type your Name and Surname"
                        change={setName}
                        required={true}
                    />
                </div>
                <div>
                    <Input
                        name="tel"
                        type="tel"
                        value={phone}
                        label="Enter your phone number"
                        change={setPhone}
                        required={true}
                    />
                </div>
                <div>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        label="Enter your e-mail"
                        change={setEmail}
                        required={true}
                    />
                </div>
                <div>
                    <label className="service">Choose post service</label>
                    <DropDown
                        defaultValue={service}
                        change={setService}
                        optionsLabels={["Новая почта", "Укр почта"]}
                        options={["nova", "ukr"]}
                        searchable={false}
                    />
                </div>
                <div>
                    <label className="service">Choose delivery type</label>
                    <DropDown
                        defaultValue={deliveryType}
                        change={setDeliveryType}
                        optionsLabels={["Отделение почты", "Курьер"]}
                        options={["department", "courier"]}
                        searchable={false}
                    />
                </div>
                {deliveryType === "department" && service === "nova" ? (
                    <div>
                        <Input
                            name="address"
                            value={address}
                            label="Enter your post office address"
                            change={setAddress}
                            required={true}
                        />
                    </div>
                ) : deliveryType === "department" &&
                  service === "ukr" ? null : (
                    <div>
                        <Input
                            name="address"
                            value={address}
                            label="Enter your home address"
                            change={setAddress}
                            required={true}
                        />
                    </div>
                )}
                {deliveryType === "department" &&
                    (service === "ukr" ? (
                        <div>
                            <Input
                                type="number"
                                name="postal_code"
                                value={code}
                                label="Enter your postal code"
                                change={setCode}
                                required={true}
                            />
                        </div>
                    ) : (
                        <Input
                            type="number"
                            name="department"
                            value={department}
                            label="Enter your department"
                            change={setDepartment}
                            required={true}
                        />
                    ))}
                <div>
                    <label className="service">Choose payment type</label>
                    <DropDown
                        defaultValue={payment}
                        change={setPayment}
                        optionsLabels={["Карта", "Наличные"]}
                        options={["Card", "Cash"]}
                        searchable={false}
                    />
                </div>
                <div>
                    <label>Message</label>
                    <textarea
                        type="text"
                        name="message"
                        rows={5}
                        value={message}
                        placeholder="Enter your wishes (optional)"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="memorize-wrap">
                    <label htmlFor="memorize">Remember my creadentials</label>
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
