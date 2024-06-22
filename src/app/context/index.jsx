"use client";
import React from 'react';
import { ThemeContextProvider } from './ThemeContext';

export default function ContextProviders({children}) {
  return (
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  );
}