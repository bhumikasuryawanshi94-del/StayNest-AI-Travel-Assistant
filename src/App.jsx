import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Pages/Hero";
import Footer from "./Components/Footer";
import AIBudgetPlanner from "./Pages/AIBudgetPlanner";

import "./App.css";

function Home() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/ai-budget-planner"
          element={
            <>
              <Navbar />
              <AIBudgetPlanner />
              <Footer />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;