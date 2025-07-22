import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  userInfo: User | null;
  token: string | null;
  setCredentials: (
    state: AuthState,
    action: { payload: { User: User; token: string } }
  ) => void;
  logout: (state: AuthState) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "")
    : null,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,

  setCredentials: (payload) => {
    set(() => ({
      userInfo: payload.userInfo,
      token: payload.token,
    }));

    if (payload && payload.userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(payload.userInfo));
    }

    if (payload && payload.token) {
      localStorage.setItem("token", payload.token);
    }

    const expirationTime = new Date().getTime() + 15 * 24 * 60 * 60 * 1000; // set expiration date (15 days)
    localStorage.setItem("expirationTime", expirationTime.toString());
  },

  logout: () => {
    set(() => ({
      userInfo: null,
      token: null,
    }));
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;
