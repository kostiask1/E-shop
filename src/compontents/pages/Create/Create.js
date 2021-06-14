import React, { useEffect, useState, useContext } from "react";
import { app } from "../../../base";
import { authContext } from "../../../context/Auth/auth-context";
import ItemCreator from "../../ItemCreator/ItemCreator";

const db = app.firestore();

const Create = () => {
  const { admin } = useContext(authContext);
  const [filters, setFilters] = useState([]);
  const [categoryToRemove, setCategoryToRemove] = useState("");
  const [categoryToAdd, setCategoryToAdd] = useState("");

  useEffect(() => {
    if (admin) getFilters();
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
    const value = e.target[0].value;
    const data = filters.filter((el) => el !== value);

    db.collection("categories").doc("categories").set({ categories: data });

    db.collection("categories")
      .doc("categories")
      .onSnapshot((doc) => {
        setCategoryToAdd("");
        return getFilters();
      });
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-12">
          <div className="row">
            <div className="col-12 col-sm-6 mt-5">
              <form
                onSubmit={(e) => newFilter(e)}
                className="text-center"
                action="/"
              >
                <p className="mb-4 title">Create category</p>
                <div>
                  <input
                    type="text"
                    value={categoryToAdd}
                    onChange={(e) => setCategoryToAdd(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary mt-3" type="submit">
                  Add category
                </button>
              </form>
            </div>
            <div className="col-12 col-sm-6 mt-5">
              <form
                onSubmit={(e) => deleteFilter(e)}
                className="text-center"
                action="/"
              >
                <p className="mb-4 title">Delete category</p>
                <select
                  className="form-select d-block form-select-lg m-auto"
                  name="category"
                  id="category"
                  value={categoryToRemove}
                  onChange={(e) => setCategoryToRemove(e.target.value)}
                >
                  <option value="0">Choose category:</option>
                  {filters
                    ? filters.map((el, idx) => (
                        <option value={el} key={idx}>
                          {el}
                        </option>
                      ))
                    : ""}
                </select>
                <button className="btn btn-primary mt-3" type="submit">
                  Delete category
                </button>
              </form>
            </div>
          </div>
        </div>
        {filters.length ? (
          <div className="col-12 mt-5">
            <ItemCreator filters={filters} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Create;
