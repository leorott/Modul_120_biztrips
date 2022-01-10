import React from "react";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./router/router";
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Router />
        </BrowserRouter>
        <Footer/>
    </>
  );
}
