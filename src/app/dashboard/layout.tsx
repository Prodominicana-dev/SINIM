"use client";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Loading from "./loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <Loading />;
  return (
    <div className="bg-white h-screen w-full flex">
      <div className="hidden lg:flex items-end h-full">
        <Sidebar />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <NavbarDashboard />
        {children}
      </div>
    </div>
  );
}
