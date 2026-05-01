import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../src/service/auth.service"; // tumhari API

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getCurrentUser(); // 🔥 backend call
        setUser(res.user);
      } catch (error) {
        setUser(null); // token invalid / cookie missing
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
