import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Navigation } from "./compontents/navigation/navigation";
import Catalog from "./compontents/pages/Catalog/Catalog";
import Contacts from "./compontents/pages/Contacts/Contacts";
import Delivery from "./compontents/pages/Delivery/Delivery";
import About from "./compontents/pages/About/About";
import Card from "./compontents/Card/Card";
import { Footer } from "./layout/footer/footer";
//const API = "AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/catalog" exact component={Catalog} />
        <Route path="/catalog/:name" component={Card} />
        <Route path="/about" component={About} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/" component={Catalog} />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(App);
