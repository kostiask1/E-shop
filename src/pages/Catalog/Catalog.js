import React, {
    lazy,
    Suspense,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react"
import { app } from "../../base"
import ShopItem from "../../components/ShopItem/ShopItem"
import { authContext } from "../../context/Auth/auth-context"
import { catalogContext } from "../../context/catalog/catalog-context"
import { DeleteIcon } from "../../icons"
import "./Catalog.scss"
import FilterSection from "./FilterSection/FilterSection"
const Modal = lazy(() => import("../../components/Modal/Modal"))
const ItemCreator = lazy(() => import("../Create/ItemCreator/ItemCreator"))
const db = app.firestore()

const Catalog = () => {
    const { data, getData, category, setCategory, deleteFromStorage } =
        useContext(catalogContext)
    const { admin } = useContext(authContext)
    const [deleteArray, setDeleteArray] = useState([])
    const modal = useRef(null)
    const modalFilters = useRef(null)
    const [dataSlice, setDataSlice] = useState([])
    const catalogRef = useRef(null)

    const callback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                concatSlices()
            }
        })
    }
    const options = { threshold: 0.5 }
    const observer = new IntersectionObserver(callback, options)

    useEffect(() => {
        getData() //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            genNewData()
        } //eslint-disable-next-line
    }, [data])

    useEffect(() => {
        observer.observe(catalogRef.current)
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (catalogRef.current) observer.unobserve(catalogRef.current)
        } //eslint-disable-next-line
    }, [dataSlice, catalogRef])

    const handleCheckbox = (e) => {
        setCategory(e)
    }

    const deleteMultipleItems = () => {
        let promises = []
        deleteArray.map((id) => {
            return promises.push(
                new Promise((resolve, reject) => {
                    deleteFromStorage([id])
                    let item = db.collection("All").where("id", "==", id)
                    item.get().then((querySnapshot) => {
                        resolve(querySnapshot.docs[0].ref.delete())
                    })
                })
            )
        })
        Promise.all(promises).then(() => {
            getData()
            setDeleteArray([])
        })
    }
    const handleDeleteArray = (id) => {
        if (deleteArray.includes(id)) {
            let clone = [...deleteArray]
            clone = clone.filter((item) => item !== id)
            setDeleteArray(clone)
        } else {
            setDeleteArray([...deleteArray, id])
        }
    }

    const genNewData = () => {
        const size = 12
        const clone = [...data]
        let chunks = function (array, size) {
            let results = []
            while (array.length) {
                results.push(array.splice(0, size))
            }
            return results
        }
        setDataSlice(chunks(clone, size))
    }

    const concatSlices = () => {
        let clone = [...dataSlice]
        if (clone.length > 1) {
            let newData = clone[0].concat(clone[1])
            clone.splice(0, 2)
            clone.unshift(newData)
            setDataSlice(clone)
        }
    }
    return (
        <>
            <div id="catalog">
                <div className="container">
                    <div className="row">
                        {window.innerWidth > 767 && (
                            <FilterSection handleCheckbox={handleCheckbox} />
                        )}

                        <div className="catalog__wrapper">
                            {window.innerWidth <= 767 && (
                                <button
                                    className="btn btn-filters"
                                    onClick={() => modalFilters.current.open()}
                                >
                                    Filters
                                </button>
                            )}
                            {admin && deleteArray.length ? (
                                <button
                                    className="btn-delete-multiple pop-in"
                                    onClick={deleteMultipleItems}
                                >
                                    <DeleteIcon width={42} height={42} />
                                </button>
                            ) : null}
                            <div className="catalog">
                                {admin && (
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                        onClick={() => modal.current.open()}
                                    >
                                        Create new item
                                    </button>
                                )}
                                {dataSlice.length > 0 ? (
                                    dataSlice[0].length &&
                                    dataSlice[0].map((item, index) => {
                                        return (
                                            <ShopItem
                                                key={item.id}
                                                index={0}
                                                id={item.id}
                                                text={item.text}
                                                imagesArray={item.imagesArray}
                                                image={item.image}
                                                category={item.category}
                                                description={item.description}
                                                handleDeleteArray={() =>
                                                    handleDeleteArray()
                                                }
                                                deleteArray={deleteArray}
                                                price={item.price}
                                                discountPrice={
                                                    item.discountPrice
                                                }
                                                boughtCount={item.boughtCount}
                                            />
                                        )
                                    })
                                ) : (
                                    <span className="fade-in">
                                        No matching results found
                                    </span>
                                )}
                            </div>
                            <div ref={catalogRef} className="end"></div>
                        </div>
                    </div>
                </div>
            </div>
            {admin && (
                <Suspense fallback={<p>Loading...</p>}>
                    <Modal ref={modal} size="lg">
                        {modal.current && (
                            <ItemCreator
                                new={true}
                                category={category}
                                close={() => modal.current.close()}
                                getData={() => getData()}
                            />
                        )}
                    </Modal>
                </Suspense>
            )}
            {admin && (
                <Suspense fallback={<p></p>}>
                    <Modal ref={modalFilters} size="lg">
                        <FilterSection handleCheckbox={handleCheckbox} />
                    </Modal>
                </Suspense>
            )}
        </>
    )
}

export default Catalog
