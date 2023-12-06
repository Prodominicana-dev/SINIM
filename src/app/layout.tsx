import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { MantineProvider } from "@mantine/core";
import { ReactNode } from "react";
import React from "react";

export const metadata = {
  title: "SINIM",
  description: "Sistema Nacional de Inteligencia de Mercados",
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </UserProvider>
  );
}
