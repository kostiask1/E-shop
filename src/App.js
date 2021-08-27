import React, { useContext, useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Footer } from "./layout/footer/footer";
import { CatalogState } from "./context/catalog/catalog-state";
import { authContext } from "./context/Auth/auth-context";
import Navigation from "./layout/navigation/navigation";
import Catalog from "./pages/Catalog/Catalog";
import Contacts from "./pages/Contacts/Contacts";
import Delivery from "./pages/Delivery/Delivery";
import About from "./pages/About/About";
import Card from "./components/Card/Card";
import Cart from "./pages/Cart/Cart";
import Create from "./pages/Create/Create";
import Auth from './pages/Auth/Auth';

const mainRoutes = [
    { path: "/", Component: Catalog },
    { path: "/catalog", Component: Catalog },
];

const routes = [
    { path: "/auth", Component: Auth },
    { path: "/cart", Component: Cart },
    { path: "/create", Component: Create },
    { path: "/catalog/:name", Component: Card },
];

function App() {
    const { auth } = useContext(authContext);

    useEffect(() => {
        auth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <CatalogState>
            <Navigation />
            {mainRoutes.map(({ path, Component }) => (
                <Route path={path} exact key={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={400}
                            classNames="page"
                            unmountOnExit
                        >
                            <>
                                <Redirect to="/catalog" />
                                <div id="page" className="page">
                                    <Component {...match} />
                                    <About></About>
                                    <Delivery></Delivery>
                                    <Contacts></Contacts>
                                    <Footer />
                                </div>
                            </>
                        </CSSTransition>
                    )}
                </Route>
            ))}
            {routes.map(({ path, Component }) => (
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
    );
}

export default withRouter(App);
