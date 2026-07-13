import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "lms_auth_user";
const USERS_KEY = "lms_users_db";

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) setUser(saved);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  function persist(u) {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }

  function signup({ name, email, password }) {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      // avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(email)}`,
      title: "Student",
      joinedAt: new Date().toISOString(),
    };
    writeUsers([...users, newUser]);
    const { password: _pw, ...safe } = newUser;
    persist(safe);
    return { ok: true };
  }

  function login({ email, password }) {
    const users = readUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    const { password: _pw, ...safe } = found;
    persist(safe);
    return { ok: true };
  }

  function logout() {
    persist(null);
  }

  function updateProfile(patch) {
    if (!user) return;
    const updated = { ...user, ...patch };
    persist(updated);
    const users = readUsers().map((u) =>
      u.id === user.id ? { ...u, ...patch } : u,
    );
    writeUsers(users);
  }

  return (
    <AuthContext.Provider
      value={{ user, ready, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
