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
    } else {
      // Update existing user
      const index = users.findIndex((u) => u.email === userData.email);
      users[index] = userData;
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

  const registerAsOwner = (ownerData) => {
    const registeredUsers = getRegisteredUsers();
    const currentUser = user;
    
    if (!currentUser) {
      return { success: false, message: "Anda harus login terlebih dahulu." };
    }

    const updatedUser = {
      ...currentUser,
      isOwner: true,
      ownerInfo: {
        businessName: ownerData.businessName,
        businessAddress: ownerData.businessAddress,
        businessPhone: ownerData.businessPhone,
        ktpNumber: ownerData.ktpNumber,
      },
    };

    // Update user in registered users list
    const userIndex = registeredUsers.findIndex((u) => u.email === currentUser.email);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = updatedUser;
      localStorage.setItem("kosgue_registered_users", JSON.stringify(registeredUsers));
    }

    // Update current user state
    setUser(updatedUser);
    localStorage.setItem("kosgue_auth", JSON.stringify({ user: updatedUser }));

    return { success: true };
  };

  const addKos = (kosData) => {
    const kosList = getKosList();
    const newKos = {
      ...kosData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    kosList.push(newKos);
    localStorage.setItem("kosgue_kos_list", JSON.stringify(kosList));
    return { success: true, kos: newKos };
  };

  const getKosList = () => {
    const stored = localStorage.getItem("kosgue_kos_list");
    return stored ? JSON.parse(stored) : [];
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("kosgue_auth");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, registerAsOwner, addKos, getKosList, logout }}
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

