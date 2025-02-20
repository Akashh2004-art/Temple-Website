import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface User {
  id: string;
  name: string;
  phone: string;
  role: "admin";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (phone: string, otp: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  phone: string;
  otp: string;
  name: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/api/auth/me")
        .then(response => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const sendOTP = async (phone: string) => {
    try {
      await api.post("/api/auth/send-otp", { phone });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOTP = async (phone: string, otp: string) => {
    try {
      await api.post("/api/auth/verify-otp", { phone, otp });
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Invalid OTP");
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const response = await api.post("/api/auth/signup", data);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/");
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  const login = async (phone: string, password: string) => {
    try {
      const response = await api.post("/api/auth/login", { phone, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      navigate("/");
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error, 
        sendOTP, 
        verifyOTP, 
        signup, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};