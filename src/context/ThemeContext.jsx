import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Load initial theme from localStorage or default to 'dark'
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem('resqdrive-theme');
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  });

  // Load initial accent color from localStorage or default to 'indigo'
  const [accentColor, setAccentColorState] = useState(() => {
    const savedAccent = localStorage.getItem('resqdrive-accent');
    const validAccents = ['blue', 'green', 'indigo', 'rose'];
    return validAccents.includes(savedAccent) ? savedAccent : 'indigo';
  });

  // Apply theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('resqdrive-theme', theme);
  }, [theme]);

  // Apply accent color to document element
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-accent', accentColor);
    localStorage.setItem('resqdrive-accent', accentColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setAccentColor = (color) => {
    const validAccents = ['blue', 'green', 'indigo', 'rose'];
    if (validAccents.includes(color)) {
      setAccentColorState(color);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        toggleTheme,
        setTheme: setThemeState,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
