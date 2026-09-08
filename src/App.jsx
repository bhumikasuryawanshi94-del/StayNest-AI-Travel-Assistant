import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "./Components/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import Stays from "./Pages/Stays";
<<<<<<< HEAD
import BudgetPlanner from "./Pages/BudgetPlanner";

=======
import AIBudgetPlanner from "./Pages/AIBudgetPlanner";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
>>>>>>> 5935877 (Added logn and signup authentication)

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>

          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Stays Page */}
          <Route path="/stays" element={<Stays />} />

          {/* AI Budget Planner Page */}
<<<<<<< HEAD
          <Route path="/ai-budget-planner" element={<BudgetPlanner />} />

          
=======
          <Route
            path="/ai-budget-planner"
            element={<ProtectedRoute><AIBudgetPlanner /></ProtectedRoute>}
          />
>>>>>>> 5935877 (Added logn and signup authentication)

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;