import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

//Route Dictionary
import RouteManager from "./routes";

//Parent Styles
import "antd/dist/antd.css";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <RouteManager />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();

