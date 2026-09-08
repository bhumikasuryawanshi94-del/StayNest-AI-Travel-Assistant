import { useState } from "react";
import { AuthContext } from "./authContextValue";
const USER_KEY = "staynestUser";
const SESSION_KEY = "staynestSession";

function readJson(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(SESSION_KEY));

  const register = (newUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const registeredUser = readJson(USER_KEY);
    if (!registeredUser || registeredUser.email.toLowerCase() !== email.trim().toLowerCase() || registeredUser.password !== password) {
      return false;
    }

    const sessionUser = { name: registeredUser.name, email: registeredUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>;
}
