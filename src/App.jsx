import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./Components/AppLayout";

import Home from "./Pages/Home";
import Stays from "./Pages/Stays";
import AIBudgetPlanner from "./Pages/AIBudgetPlanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>

          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Stays Page */}
          <Route path="/stays" element={<Stays />} />

          {/* AI Budget Planner Page */}
          <Route
            path="/ai-budget-planner"
            element={<AIBudgetPlanner />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;