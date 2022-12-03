import React from "react";
import { Routes, Route } from "react-router-dom";
import Detail from "../Screens/Detail/Detail";
import Home from "../Screens/Home/Home";
import AddController from "../Screens/Add/Add";

export default function ManageRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="detail">
        <Route path=":infoID" element={<Detail />} />
      </Route>
      <Route path="add" element={<AddController />} />
    </Routes>
  );
}
