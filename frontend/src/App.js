import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Weather from "./components/Weather/Weather";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}
