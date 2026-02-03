import { createContext, useState, useContext, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Prefer sessionStorage for admin sessions (cleared on tab close), fall back to localStorage
  const getStoredToken = () => sessionStorage.getItem('token') || localStorage.getItem('token');
  const [token, setToken] = useState(getStoredToken());
  const inactivityTimer = useRef(null);

  useEffect(() => {
    if (token) {
      // Verify token and get user info
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Auto-logout on inactivity (5 minutes)
  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    const clearInactivityTimer = () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
        inactivityTimer.current = null;
      }
    };

    const startInactivityTimer = () => {
      clearInactivityTimer();
      // 5 minutes = 300000 ms
      inactivityTimer.current = setTimeout(() => {
        logout();
      }, 5 * 60 * 1000);
    };

    const resetTimer = () => {
      if (token) startInactivityTimer();
    };

    if (token) {
      // start timer and attach listeners
      startInactivityTimer();
      events.forEach((ev) => window.addEventListener(ev, resetTimer));
      document.addEventListener('visibilitychange', resetTimer);
    }

    return () => {
      clearInactivityTimer();
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
      document.removeEventListener('visibilitychange', resetTimer);
    };
  }, [token]);

  const fetchUser = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      // Use admin me route (admins collection)
      const response = await fetch(`${API_BASE_URL}/admin/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({ ...userData, role: 'admin' });
      } else {
        // Token invalid, clear it
        logout();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      // Use admin login route (admins collection)
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data);
        // For admin accounts, make session tied to the browser tab (cleared on close)
        // Other users remain in localStorage
        try {
          if (data?.role === 'admin') {
            localStorage.removeItem('token');
            sessionStorage.setItem('token', data.token);
          } else {
            sessionStorage.removeItem('token');
            localStorage.setItem('token', data.token);
          }
        } catch (e) {
          // storage might be restricted; fallback to localStorage
          localStorage.setItem('token', data.token);
        }
        return { success: true, user: data };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    } catch (e) {
      // ignore storage errors
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
