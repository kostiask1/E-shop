import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
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

function App() {
  return (
    <>
      <CatalogState>
        <Navigation />
      </CatalogState>
      <Switch>
        <Route
          path="/catalog"
          exact
          render={(props) => (
            <CatalogState>
              <Catalog {...props} />
            </CatalogState>
          )}
        />
        <Route
          path="/catalog/:name"
          render={(props) => (
            <CatalogState>
              <Card {...props} />
            </CatalogState>
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <CatalogState>
              <Cart {...props} />
            </CatalogState>
          )}
        />
        <Route
          path="/create"
          render={(props) => (
            <CatalogState>
              <Create {...props} />
            </CatalogState>
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/">
          <CatalogState>
            <Catalog />
          </CatalogState>
        </Route>
      </Switch>
      <CatalogState>
        <Footer />
      </CatalogState>
    </>
  );
}

export default withRouter(App);
