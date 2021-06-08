import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { Navigation } from "./compontents/navigation/navigation";
import Catalog from "./compontents/pages/Catalog/Catalog";
import Contacts from "./compontents/pages/Contacts/Contacts";
import Delivery from "./compontents/pages/Delivery/Delivery";
import About from "./compontents/pages/About/About";
import Card from "./compontents/Card/Card";
import { Footer } from "./layout/footer/footer";
import { CatalogState } from "./context/catalog/catalog-state";
import Cart from "./compontents/pages/Cart/Cart";
import Create from "./compontents/pages/Create/Create";

const mainRoutes = [
  { path: "/", Component: Catalog },
  { path: "/catalog", Component: Catalog },
];

const routes = [
  { path: "/cart", Component: Cart },
  { path: "/create", Component: Create },
  { path: "/catalog/:name", Component: Card },
];

function App() {
  return (
    <>
      <CatalogState>
        <Navigation />
      </CatalogState>
      {mainRoutes.map(({ path, Component }) => (
        <Route path={path} exact key={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={400}
              classNames="page"
              unmountOnExit
            >
              <CatalogState>
                <Redirect to="/catalog" />
                <div id="page" className="page">
                  <Component {...match} />
                  <About></About>
                  <Delivery></Delivery>
                  <Contacts></Contacts>
                  <Footer />
                </div>
              </CatalogState>
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
              <CatalogState>
                <div id="page" className="page">
                  <Component {...match} />
                </div>
              </CatalogState>
            </CSSTransition>
          )}
        </Route>
      ))}
    </>
  );
}

export default withRouter(App);
