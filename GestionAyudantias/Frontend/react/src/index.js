import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Vistas/App";
import { NotificationProvider } from '../src/Vistas/Admin/NotificationContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NotificationProvider>
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
  </NotificationProvider>
);