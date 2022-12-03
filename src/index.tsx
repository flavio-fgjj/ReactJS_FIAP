import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Screens/Home/Home";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import MuiThemes from "./Utils/Common/MuiThemes";
import { BrowserRouter } from "react-router-dom";
import ManageRoutes from "./ManageRoutes/ManageRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemes>
        <ManageRoutes />
      </MuiThemes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
