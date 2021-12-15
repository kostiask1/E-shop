import React, { useState } from "react"
import "./PurchaseForm.scss"
import { DropDown } from "../../../components/DropDown/DropDown"
import Input from "../../../components/Input/Input"
import {
    local_userName,
    local_userPhone,
    local_userAddress,
    local_userCity,
    local_userCode,
    local_userService,
    local_userPayment,
    local_userDepartment,
    local_userEmail,
} from "../../../localStorage"
const PurchaseForm = ({ buy }) => {
    const [name, setName] = useState(
        JSON.parse(localStorage.getItem(local_userName)) || ""
    )
    const [phone, setPhone] = useState(
        JSON.parse(localStorage.getItem(local_userPhone)) || ""
    )
    const [email, setEmail] = useState(
        JSON.parse(localStorage.getItem(local_userEmail)) || ""
    )
    const [address, setAddress] = useState(
        JSON.parse(localStorage.getItem(local_userAddress)) || ""
    )
    const [city, setCity] = useState(
        JSON.parse(localStorage.getItem(local_userCity)) || ""
    )
    const [code, setCode] = useState(
        JSON.parse(localStorage.getItem(local_userCode)) || ""
    )
    const [department, setDepartment] = useState(
        JSON.parse(localStorage.getItem(local_userDepartment)) || ""
    )
    const [service, setService] = useState(
        JSON.parse(localStorage.getItem(local_userService)) || "nova"
    )
    const [payment, setPayment] = useState(
        JSON.parse(localStorage.getItem(local_userPayment)) || "Card"
    )
    const [deliveryType, setDeliveryType] = useState("department")
    const [message, setMessage] = useState("")
    const [memorize, setMemorize] = useState(true)

    const handleModal = (event) => {
        event.preventDefault()
        if (memorize) rememberUser()
        let params = {
            name,
            phone,
            city,
            payment,
            message,
            deliveryType,
            email,
        }
        deliveryType === "courier"
            ? (params["address"] = address)
            : (params["service"] = service)
        service === "nova"
            ? deliveryType === "department" &&
              (params["department"] = department)
            : (params["code"] = code)
        buy(params)
    }
    const rememberUser = () => {
        localStorage.setItem(local_userName, JSON.stringify(name))
        localStorage.setItem(local_userPhone, JSON.stringify(phone))
        localStorage.setItem(local_userEmail, JSON.stringify(email))
        localStorage.setItem(local_userAddress, JSON.stringify(address))
        localStorage.setItem(local_userCity, JSON.stringify(city))
        localStorage.setItem(local_userCode, JSON.stringify(code))
        localStorage.setItem(local_userDepartment, JSON.stringify(department))
        localStorage.setItem(local_userService, JSON.stringify(service))
        localStorage.setItem(local_userPayment, JSON.stringify(payment))
    }
    return (
        <div className="purchase-form">
            <form onSubmit={handleModal}>
                <div>
                    <Input
                        name="name"
                        value={name}
                        label="Ваше имя и фамилия"
                        change={setName}
                        required={true}
                    />
                </div>
                <div>
                    <Input
                        name="tel"
                        type="tel"
                        value={phone}
                        label="Номер телефона"
                        change={setPhone}
                        required={true}
                    />
                </div>
                <div>
                    <Input
                        name="email"
                        type="email"
                        value={email}
                        label="E-mail"
                        change={setEmail}
                        required={true}
                    />
                </div>
                <div>
                    <label className="service">Почтовая служба</label>
                    <DropDown
                        defaultValue={service}
                        change={setService}
                        optionsLabels={["Новая почта", "Укр почта"]}
                        options={["nova", "ukr"]}
                        searchable={false}
                    />
                </div>
                <div>
                    <label className="service">Тип доставки</label>
                    <DropDown
                        defaultValue={deliveryType}
                        change={setDeliveryType}
                        optionsLabels={["Отделение почты", "Курьер"]}
                        options={["department", "courier"]}
                        searchable={false}
                    />
                </div>
                <div>
                    <Input
                        name="city"
                        value={city}
                        label="Город"
                        change={setCity}
                        required={true}
                    />
                </div>
                {deliveryType === "courier" && (
                    <div>
                        <Input
                            name="address"
                            value={address}
                            label="Адрес доставки"
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
                                label="Почтовый индекс"
                                change={setCode}
                                required={true}
                            />
                        </div>
                    ) : (
                        <div>
                            <Input
                                type="number"
                                name="department"
                                value={department}
                                label="Отделение почты"
                                change={setDepartment}
                                required={true}
                            />
                        </div>
                    ))}
                <div>
                    <label className="service">Выберите тип оплаты</label>
                    <DropDown
                        defaultValue={payment}
                        change={setPayment}
                        optionsLabels={["Карта", "Наложенный платёж"]}
                        options={["Card", "cod"]}
                        searchable={false}
                    />
                </div>
                <div>
                    <label>Ваши пожелания</label>
                    <textarea
                        type="text"
                        name="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="memorize-wrap">
                    <label htmlFor="memorize">Запомнить мои данные</label>
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
                <button type="submit" className="btn-submit">
                    Отправить
                </button>
            </form>
        </div>
    )
}

export default PurchaseForm
