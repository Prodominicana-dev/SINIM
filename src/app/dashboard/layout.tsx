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
    <div className="bg-white h-screen w-full">
      <div className="flex flex-row w-full h-full">
        <div className="flex items-end h-full w-32 hover:w-72 duration-700">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <NavbarDashboard />
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
