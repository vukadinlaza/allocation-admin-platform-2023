'use client';
import { ThemeProvider } from '@mui/material';
import React from 'react';
import { AuthContextProvider } from './context';
import './globals.scss';
import { lightTheme } from './theme/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true // we can turn this off after we are done with development
    }
  }
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <body className="relative min-h-screen bg-gray-50">
            <AuthContextProvider>{children}</AuthContextProvider>
          </body>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  );
}
