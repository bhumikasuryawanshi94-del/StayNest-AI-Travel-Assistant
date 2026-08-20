import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Pages/Hero";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
      </main>

      <Footer />
    </>
  );
}

export default App;