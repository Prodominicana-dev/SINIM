import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";
import React from "react";
import GoogleAnalytics from "../components/googleAnalytics";

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
        <body>
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : (
            <></>
          )}
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
