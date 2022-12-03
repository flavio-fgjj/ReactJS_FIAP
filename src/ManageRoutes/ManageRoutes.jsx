import React from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "../Screens/Detail/Detail";
import Home from "../Screens/Home/Home";

export default function ManageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="detail">
        <Route path=":infoID" element={<Detail />} />
        <Route path="add" element={<Detail />} />
      </Route>
    </Routes>
  );
}
