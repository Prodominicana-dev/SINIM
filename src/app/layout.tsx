import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ReactNode } from "react";
import { useUsers } from "../services/users/service";

const inter = Inter({ subsets: ["latin"] });

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
