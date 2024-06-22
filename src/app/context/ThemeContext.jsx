"use client";
import { createTheme, ThemeProvider } from '@mui/material';

function ThemeContextProvider({children}) {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
}

module.exports = {
  ThemeContextProvider
}