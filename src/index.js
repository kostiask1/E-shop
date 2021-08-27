import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import AppWrapper from "./App-wrapper";


ReactDOM.render(
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>,
  document.getElementById("root")
);
