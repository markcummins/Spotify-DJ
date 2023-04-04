import { createContext, useState, useEffect, useContext } from "react";

const Context = createContext();

const Provider = ({ children }) => {

  const [theme, setTheme] = useState({ 'darkMode': false });

  useEffect(() => {
    if (localStorage.getItem("appState") !== null) {
      if (localStorage.getItem("appState")) {
        const { theme } = JSON.parse(localStorage.getItem("appState"));
        setTheme(theme);
      }
    }
  }, []);

  useEffect(() => {
    setLocalStorage();
  }, [theme]);

  const setLocalStorage = () => {
    localStorage.setItem("appState", JSON.stringify({
      theme: theme,
    }));
  }

  const exposed = {
    theme,
    setTheme,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useApp = () => useContext(Context);

export default Provider;
