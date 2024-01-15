import type { Metadata } from 'next';
import 'styles/global.css';
import React from 'react';
import TanstackProvider from '@/providers/TanstackProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { ThemeProvider } from '@/components/theme-provider';
import { GlobalProvider } from '@/context/TriggerContext';

export const metadata: Metadata = {
  title: 'Stratos',
  description: 'A service linker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <link rel="icon" href="/favicon.png" />
        <GlobalProvider>
          <TanstackProvider>
            <StyledComponentsRegistry>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </StyledComponentsRegistry>
          </TanstackProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
