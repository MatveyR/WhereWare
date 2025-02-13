import App from "./App";
import {createRoot} from "react-dom/client";
import React from "react";
import {Provider} from "react-redux";
import store from "./data/store/store.tsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)