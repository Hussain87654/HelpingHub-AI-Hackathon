import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If there's a token, set it in axios headers and fetch user profile
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      
      const fetchUser = async () => {
        try {
          const { data } = await axios.get('/api/users/me');
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user context", error);
          logout();
        } finally {
          setLoading(false);
        }
      };
      
      fetchUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setToken(data.token);
      setUser({ _id: data._id, name: data.name, email: data.email });
      return { success: true };
    } catch (error) {
      console.error("Login Error", error.response?.data || error);
      return { success: false, message: error.response?.data?.msg || 'Login failed' };
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const { data } = await axios.post('/api/auth/signup', { name, email, password, role });
      setToken(data.token);
      setUser({ _id: data._id, name: data.name, email: data.email });
      return { success: true };
    } catch (error) {
      console.error("Signup Error", error.response?.data || error);
      return { success: false, message: error.response?.data?.msg || 'Signup failed' };
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
