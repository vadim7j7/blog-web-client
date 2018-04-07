import React from "react";
import ReactDOM from "react-dom";
import BrowserRouter from "react-router-dom/BrowserRouter";
import { Provider } from "mobx-react";

import bootInit from "./config/api";
import App from "./App";
import stores from "./stores";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";


bootInit();


ReactDOM.render((
    <Provider { ...stores }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById("root"));

registerServiceWorker();
