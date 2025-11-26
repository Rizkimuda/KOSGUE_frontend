import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("kosgue_auth");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (e) {
        localStorage.removeItem("kosgue_auth");
      }
    }
  }, []);

  const getRegisteredUsers = () => {
    const stored = localStorage.getItem("kosgue_registered_users");
    return stored ? JSON.parse(stored) : [];
  };

  const saveRegisteredUser = (userData) => {
    const users = getRegisteredUsers();
    // Check if email already exists
    const existingUser = users.find((u) => u.email === userData.email);
    if (!existingUser) {
      users.push(userData);
      localStorage.setItem("kosgue_registered_users", JSON.stringify(users));
    }
  };

  const login = (email, password) => {
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find((u) => u.email === email);
    
    if (!foundUser) {
      return { success: false, message: "Email belum terdaftar. Silakan daftar terlebih dahulu." };
    }

    // In a real app, you would verify the password here
    // For now, we just check if email exists
    setIsAuthenticated(true);
    setUser(foundUser);
    localStorage.setItem("kosgue_auth", JSON.stringify({ user: foundUser }));
    return { success: true };
  };

  const register = (userData) => {
    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find((u) => u.email === userData.email);
    
    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar. Silakan gunakan email lain atau login." };
    }

    saveRegisteredUser(userData);
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("kosgue_auth", JSON.stringify({ user: userData }));
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("kosgue_auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

