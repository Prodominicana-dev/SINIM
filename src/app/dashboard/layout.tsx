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
    <div className="bg-indigo-500 h-screen w-full">
      <div className="flex justify-end ">
        <NavbarDashboard />
      </div>
      <div className="flex items-end h-full">
        <Sidebar />
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
