'use client';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { AuthContextProvider } from './context';
import './globals.scss';
import { lightTheme } from './theme/theme';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider theme={lightTheme}>
        <body className="relative min-h-screen bg-gray-50">
          <AuthContextProvider>{children}</AuthContextProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
