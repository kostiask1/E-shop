import React, { useEffect, useState, useContext } from "react";
import { app } from "../../base";
import { authContext } from "../../context/Auth/auth-context";
import { v4 as uuidv4 } from "uuid";
import ItemCreator from "../../components/ItemCreator/ItemCreator";
import "./Create.scss";
import { DropDown } from "../../components/DropDown/DropDown";
import { catalogContext } from "../../context/catalog/catalog-context";

const db = app.firestore();

const Create = () => {
    const { deleteFromStorage } = useContext(catalogContext);
    const { admin } = useContext(authContext);
    const [filters, setFilters] = useState([]);
    const [categoryToRemove, setCategoryToRemove] = useState("");
    const [categoryToAdd, setCategoryToAdd] = useState("");

    useEffect(() => {
        if (admin) {
            getFilters();
        }
        //eslint-disable-next-line
    }, [admin]);

    if (!admin) return null;

    const getFilters = async () => {
        try {
            let filt = await db.collection("categories").get();
            filt ? (filt = filt.docs.map((doc) => doc.data())) : (filt = []);
            if (filt.length) {
                filt = Object.values(filt[0].categories);
            }

            setFilters(filt);
            return filters;
        } catch (err) {
            console.error(err);
        }
    };

    const getUncategorized = async () => {
        let items = [];
        const response = await db
            .collection("All")
            .where("category", "==", "")
            .get();
        response.docs.forEach((item) => {
            items.push(item.data().id);
        });
        deleteFromStorage(items);
        items.forEach((id) => {
            let item = db.collection("All").where("id", "==", id);
            item.get().then((querySnapshot) => {
                querySnapshot.docs[0].ref.delete();
            });
        });
    };

    const newFilter = (e) => {
        e.preventDefault();
        const value = e.target[0].value;
        if (!value) return false;
        if (filters && filters.includes(value)) {
            alert("This category already exists");
            return false;
        }
        const data = filters.concat(value);
        db.collection("categories")
            .doc("categories")
            .set({ categories: data })
            .then(() => {
                setCategoryToAdd("");
                return getFilters();
            });
    };

    const deleteFilter = (e) => {
        e.preventDefault();
        const value = e.target[0].innerText;
        if (value !== "Choose category") {
            const data = filters.filter((el) => el !== value);
            db.collection("categories")
                .doc("categories")
                .set({ categories: data });

            db.collection("categories")
                .doc("categories")
                .onSnapshot(() => {
                    setCategoryToRemove("");
                    return getFilters();
                });
        }
    };

    const createRandom = (e) => {
        e.preventDefault();
        const data = {
            category: "",
            id: uuidv4(),
            imagesArray: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbBfHrizUe6bngDar6zG_DUcPblwxBczo-_Q&usqp=CAU",
            ],
            price: Math.ceil(Math.random() * 1000),
            description: "Lorem ipsum dolor",
            timestamp: new Date().getTime(),
            text: "Placeholder Item",
            boughtCount: null,
        };
        db.collection("All").doc(data.id).set(data);
    };
    return (
        <div className="create">
            <div className="container">
                <div className="row">
                    <div className="btns-wrapper">
                        <label className="btn" onClick={createRandom}>
                            Create filler item
                        </label>
                        <label
                            className="btn"
                            onClick={(e) =>
                                [1, 2, 3, 4, 5].forEach((counter) =>
                                    createRandom(e)
                                )
                            }
                        >
                            Create filler items
                        </label>
                        <label
                            className="btn btn-danger"
                            onClick={getUncategorized}
                        >
                            Delete items without category (fillers)
                        </label>
                    </div>
                    <div className="form-wrapper">
                        <form onSubmit={(e) => newFilter(e)} action="/">
                            <p className=" title">Create category</p>
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
                                Add category
                            </button>
                        </form>
                        <form onSubmit={(e) => deleteFilter(e)} action="/">
                            <p className=" title">Delete category</p>
                            <DropDown
                                key={filters}
                                defaultValue={categoryToRemove}
                                change={setCategoryToRemove}
                                options={filters}
                                placeholder="Choose category"
                            />
                            <button
                                className={
                                    categoryToRemove ? "btn-danger" : "disabled"
                                }
                                type="submit"
                            >
                                Delete category
                            </button>
                        </form>
                    </div>
                    {filters.length ? <ItemCreator filters={filters} /> : null}
                </div>
            </div>
        </div>
    );
};

export default Create;
