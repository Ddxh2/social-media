import React, { useReducer, createContext } from "react";
import jsonWebTokenDecode from "jwt-decode";

const initialState = { user: null };

if (!!localStorage.getItem("jsonWebToken")) {
  const decodedToken = jsonWebTokenDecode(localStorage.getItem("jsonWebToken"));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jsonWebToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const AUTH_ACTION_TYPES = { LOGOUT: "LOGOUT", LOGIN: "LOGIN" };

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return { ...state, user: action.payload };
    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jsonWebToken", userData.token);
    dispatch({ type: AUTH_ACTION_TYPES.LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("jsonWebToken");
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
