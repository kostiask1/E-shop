import React, { useContext, useEffect } from "react"
import { useLocation } from "react-router"
import { Route, withRouter, Redirect } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import { CatalogState } from "./context/catalog/catalog-state"
import { authContext } from "./context/Auth/auth-context"
import Navigation from "./layout/navigation/navigation"
import Catalog from "./pages/Catalog/Catalog"
import Card from "./pages/Card/Card"
import Create from "./pages/Create/Create"
import Auth from "./pages/Auth/Auth"
import Main from "./pages/Main/Main"
const SHOP_NAME = process.env.REACT_APP_SHOP_NAME
const mainRoutes = [
    { path: "/", Component: Catalog },
    { path: "/main", Component: Main },
]

const routesSub = [
    { path: "/catalog", Component: Catalog },
    { path: "/auth", Component: Auth },
    { path: "/create", Component: Create },
    { path: "/catalog/:name", Component: Card },
]

function App() {
    const { auth } = useContext(authContext)
    const location = useLocation()

    useEffect(() => {
        document.title = SHOP_NAME.charAt(0).toUpperCase() + SHOP_NAME.slice(1)
        auth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const root = document.getElementById("root")
        root.scrollTop = 0
    }, [location.pathname])
    return (
        <CatalogState>
            <Navigation />
            {mainRoutes.map(({ path, Component }) => (
                <Route path={path} exact key={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames="page"
                            unmountOnExit
                        >
                            <>
                                <Redirect to="/main" />
                                <div id="page" className="page">
                                    <Main />
                                </div>
                            </>
                        </CSSTransition>
                    )}
                </Route>
            ))}
            {routesSub.map(({ path, Component }) => (
                <Route path={path} exact key={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={400}
                            classNames="page"
                            unmountOnExit
                        >
                            <div id="page" className="page">
                                <Component {...match} />
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </CatalogState>
    )
}

export default withRouter(App)
