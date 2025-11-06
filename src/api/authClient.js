import axios from "axios";

// Update this to your backend base URL (must end with a slash)
// Example: "http://localhost/chatapp/server/" or "https://api.example.com/chatapp/server/"
const API_BASE = "http://YOUR_HOST/chatapp/server/";

export const authClient = {
  async login(username, password) {
    // DEMO MODE: if API_BASE isn't configured yet, simulate a login so the app works now
    const isDemoMode = /YOUR_HOST/i.test(API_BASE);
    if (isDemoMode) {
      // Accept the default demo credentials; otherwise return error
      const isValid = username === "admin" && password === "admin123";
      await new Promise((r) => setTimeout(r, 600)); // small delay for UX
      if (isValid) {
        return {
          status: "success",
          user: {
            id: 1,
            username: "admin",
            role: "admin",
          },
        };
      }
      return { status: "error", message: "Invalid demo credentials (admin/admin123)" };
    }

    // REAL MODE
    try {
      const { data } = await axios.post(`${API_BASE}login.php`, { username, password });
      return data;
    } catch (e) {
      return { status: "error", message: "Network error. Please try again." };
    }
  },
  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },
  isAuthenticated() {
    return localStorage.getItem("isAuthenticated") === "true";
  },
  getCurrentUser() {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  },
};