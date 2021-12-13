import React, { useEffect, useState, useContext } from "react"
import { app } from "../../base"
import { authContext } from "../../context/Auth/auth-context"
import { v4 as uuidv4 } from "uuid"
import ItemCreator from "./ItemCreator/ItemCreator"
import "./Create.scss"
import { DropDown } from "../../components/DropDown/DropDown"
import { catalogContext } from "../../context/catalog/catalog-context"

const db = app.firestore()

const Create = () => {
    const { deleteItemById, getFilters, uploadItem } =
        useContext(catalogContext)
    const { admin } = useContext(authContext)
    const [filters, setFilters] = useState([])
    const [categoryToRemove, setCategoryToRemove] = useState("")
    const [categoryToAdd, setCategoryToAdd] = useState("")
    const [whitelistIps, setWhitelistIps] = useState([])
    const [whitelistIp, setWhitelistIp] = useState("")
    const [unblockIp, setUnblockIp] = useState("")

    useEffect(() => {
        if (admin) {
            getFilters().then((resp) => setFilters(resp))
            getWhitelist()
        }
        //eslint-disable-next-line
    }, [admin])

    if (!admin) return null

    const getWhitelist = async () => {
        try {
            let gotWhitelist = await db.collection("whitelist").get()
            gotWhitelist
                ? (gotWhitelist = gotWhitelist.docs.map((doc) => doc.data()))
                : (gotWhitelist = [])
            if (gotWhitelist.length) {
                gotWhitelist = Object.values(gotWhitelist[0].ips)
            }
            setWhitelistIps(gotWhitelist)
        } catch (err) {
            console.error(err)
        }
    }

    const getUncategorized = async () => {
        let items = []
        const response = await db
            .collection("All")
            .where("category", "==", "")
            .get()
        response.docs.forEach((item) => {
            items.push(item.data().id)
        })
        deleteItemById(items)
    }

    const newFilter = (e) => {
        e.preventDefault()
        const value = e.target[0].value
        if (!value) return false
        if (filters && filters.includes(value)) {
            alert("This category already exists")
            return false
        }
        const data = filters.concat(value)
        db.collection("categories")
            .doc("categories")
            .set({ categories: data })
            .then(() => {
                setCategoryToAdd("")
                return getFilters()
            })
    }

    const deleteFilter = (e) => {
        e.preventDefault()
        const value = e.target[0].innerText
        if (value !== "Выберите категорию") {
            const data = filters.filter((el) => el !== value)
            db.collection("categories")
                .doc("categories")
                .set({ categories: data })

            db.collection("categories")
                .doc("categories")
                .onSnapshot(() => {
                    setCategoryToRemove("")
                    return getFilters()
                })
        }
    }

    const createRandom = (e) => {
        const data = {
            category: "",
            id: uuidv4(),
            imagesArray: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBfHrizUe6bngDar6zG_DUcPblwxBczo-_Q&usqp=CAU",
            ],
            price: Math.ceil(Math.random() * 1000),
            discountPrice: 0,
            description: "Lorem ipsum dolor",
            text: "Placeholder Item",
            boughtCount: "",
            archived: true,
        }
        uploadItem(e, data)
    }

    const blockByIp = (e) => {
        e.preventDefault()
        const value = e.target[0].value
        if (!value) return false
        if (whitelistIps && whitelistIps.includes(value)) {
            alert("Этот айпи адресс уже заблокирован")
            return false
        }
        const data = whitelistIps.concat(value)
        db.collection("whitelist")
            .doc("whitelist")
            .set({ ips: data })
            .then(() => {
                setWhitelistIp("")
                return getWhitelist()
            })
    }

    const unblockByIp = (e) => {
        e.preventDefault()
        const value = e.target[0].innerText
        if (value !== "Выберите IP адрес") {
            const data = whitelistIps.filter((el) => el !== value)
            db.collection("whitelist").doc("whitelist").set({ ips: data })

            db.collection("whitelist")
                .doc("whitelist")
                .onSnapshot(() => {
                    setUnblockIp("")
                    return getWhitelist()
                })
        }
    }
    const handleWhitelistIp = (value) => {
        value = value.replace(/[^\d;^.;]/g, "")
        setWhitelistIp(value)
    }
    return (
        <div className="create">
            <div className="container">
                <div className="row">
                    <div className="btns-wrapper">
                        {process.env.NODE_ENV === "development" && (
                            <>
                                <label className="btn" onClick={createRandom}>
                                    Добавить пустой товар
                                </label>
                                <label
                                    className="btn"
                                    onClick={(e) =>
                                        [1, 2, 3, 4, 5].forEach((counter) =>
                                            createRandom(e)
                                        )
                                    }
                                >
                                    Добавить пустые товары
                                </label>
                            </>
                        )}
                        <label
                            className="btn btn-danger"
                            onClick={getUncategorized}
                        >
                            Удалить товары без категории
                        </label>
                    </div>
                    <div className="form-wrapper">
                        <form onSubmit={(e) => newFilter(e)} action="/">
                            <p className=" title">Создать категорию</p>
                            <div>
                                <input
                                    type="text"
                                    value={categoryToAdd}
                                    onChange={(e) =>
                                        setCategoryToAdd(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className={
                                    categoryToAdd ? "btn-success" : "disabled"
                                }
                                type="submit"
                            >
                                Добавить
                            </button>
                        </form>
                        <form onSubmit={(e) => deleteFilter(e)} action="/">
                            <p className=" title">Удалить категорию</p>
                            <DropDown
                                key={filters}
                                defaultValue={categoryToRemove}
                                change={setCategoryToRemove}
                                options={filters}
                                placeholder="Выберите категорию"
                            />
                            <button
                                className={
                                    categoryToRemove ? "btn-danger" : "disabled"
                                }
                                type="submit"
                            >
                                Удалить
                            </button>
                        </form>
                    </div>
                    {filters.length ? <ItemCreator filters={filters} /> : null}
                    <div className="divider"></div>

                    <div className="form-wrapper">
                        <form onSubmit={(e) => blockByIp(e)} action="/">
                            <p className="title">Заблокировать IP</p>
                            <div>
                                <input
                                    type="text"
                                    value={whitelistIp}
                                    onChange={(e) =>
                                        handleWhitelistIp(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                className={
                                    whitelistIp ? "btn-success" : "disabled"
                                }
                                type="submit"
                            >
                                Заблокировать
                            </button>
                        </form>
                        <form onSubmit={(e) => unblockByIp(e)} action="/">
                            <p className="title">Разбанить IP</p>
                            <DropDown
                                key={whitelistIps}
                                defaultValue={unblockIp}
                                change={setUnblockIp}
                                options={whitelistIps}
                                placeholder="Выберите IP адрес"
                            />
                            <button
                                className={
                                    unblockIp ? "btn-danger" : "disabled"
                                }
                                type="submit"
                            >
                                Разбанить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create
