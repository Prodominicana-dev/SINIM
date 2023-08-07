import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./context/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SINIM",
  description: "Sistema Nacional de Inteligencia de Mercados",
  icons: {
    icon: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children} </AuthProvider>
      </body>
    </html>
  );
}
