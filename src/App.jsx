import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import { AppLayout } from "./Components/AppLayout";
import Stays from "./Pages/Stays";

function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route element={<AppLayout />}>

        {/* Home Page */}
        <Route path="/" element={<Home />}/>
        <Route path="/stays" element={<Stays />} />
        
      </Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;