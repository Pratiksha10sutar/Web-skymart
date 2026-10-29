import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("LoggedInUser")) || null,
  );
  const [registeredUsers, setRegisteredUsers] = useState(
    JSON.parse(localStorage.getItem("RegisteredUsers")) || [],
  );

  console.log("login" ,loggedInUser);
  console.log("register",registeredUsers);

  return (
    <Auth.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        registeredUsers,
        setRegisteredUsers,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
