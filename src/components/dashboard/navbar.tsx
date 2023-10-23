"use client";
import { Fragment, useEffect, useState } from "react";
import { Navbar, Typography, IconButton } from "@material-tailwind/react";

import UserProfile from "./userprofile";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Suscribe from "../saim/Suscribe/suscribe";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "date-fns";
import { useEffectOnce } from "usehooks-ts";



export function NavbarDashboard({ toggleSidebar, openDrawer, openNav }: any) {
  const routes = [
    { path: "rami", title: "REQUISITO DE ACCESO A MERCADOS INTERNACIONALES" },
    { path: "saim", title: "ALERTAS COMERCIALES" },
    { path: "sied", title: "ALERTAS DE IED" },
    { path: "datamarket", title: "Data Market" },
    // Puedes agregar más rutas aquí cuando necesites
  ];
  const pathname = usePathname();
  const currentPath = pathname.toLowerCase();
  const currentRoute = routes.find((route) => currentPath.includes(route.path));
  const title = currentRoute ? currentRoute.title : "SINIM";
  const [suscribeOpen, setSuscribeOpen] = useState(false);
  const [permissions, setPermissions] = useState<any[]>([]);
  const { user, error, isLoading } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const callbackUrl = `${baseUrl}/dashboard/saim#suscribe`;
  const handleSuscribeOpen = () => {
    if (!user) return router.push(`/api/auth/login?returnTo=${callbackUrl}`);
    setSuscribeOpen(!suscribeOpen);
  };
  const router = useRouter();
  const path = usePathname();
  
  useEffect(() => {
    let permis : any = []
    if(user){
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}/permissions`;
      const getPermissions = async () => {
       await axios.get(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ii1iUVVmVnlqTFpTOXNKT3RVVGZQTCJ9.eyJpc3MiOiJodHRwczovL3Byb2RvbWluaWNhbmEudXMuYXV0aDAuY29tLyIsInN1YiI6IkVjMGUzdEZraTE0b3JGa3pzNUo0anY4SG9mcjBtMkFUQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Byb2RvbWluaWNhbmEudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2OTgwODQxMTQsImV4cCI6MTY5ODE3MDUxNCwiYXpwIjoiRWMwZTN0RmtpMTRvckZrenM1SjRqdjhIb2ZyMG0yQVQiLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSBjcmVhdGU6YWN0aW9uc19sb2dfc2Vzc2lvbnMgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6Y2xpZW50X2NyZWRlbnRpYWxzIGNyZWF0ZTpjbGllbnRfY3JlZGVudGlhbHMgdXBkYXRlOmNsaWVudF9jcmVkZW50aWFscyBkZWxldGU6Y2xpZW50X2NyZWRlbnRpYWxzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.WLeyjj2hMWn5LDKWD5rnoScL2xSfbWGX0Yc9nY-sz6dlvC3EdhUXIeMwFATcfk0lkK0hTecCpSgE2VKRXg9OA1gMzdS30dRONezmUF2VxMlWjvt4sQCoLIENYEsX-G-XikdMeLhVHTXBR4U6bplPnTpZDgQwlY4anAtJ1Wtms1gane7qXustW7a4F1FPcZ1mp7IEOHp2xKi66g5notFVMov_OXq9rhP-rda-o9OH7-uNFEjuvYfsp0ck7K6zcxFw-mt77uh2Xsh1lOxEEsWUR3fovhX-xLAlxBUFJW4Ccy10OD3oyBDMKuJV51JZETtufaC07YRZdKxwfYxJLqmNQA`,
          },
        }).then((res) => {
          res.data.forEach((permission: any) => {
           permis.push(permission.permission_name)
          })
        });
        setPermissions(permis)
      }
      getPermissions();
    }
    
  }, [user]);

  useEffect(() => {
    if(!isLoading){
      if((path.includes('/dashboard/settings/saim') || path.includes('/dashboard/settings/rami') || 
      path.includes('/dashboard/settings/datamarket') || path.includes('/dashboard/settings/sied')) && !user){
        return router.push(`/login?returnTo=${pathname}`)
      }
    }
  }, [user, isLoading])

  useEffect(() => {
      if(!isLoading){
        // Comprobar permisos para saim
        if(path.includes('/dashboard/settings/saim') && (!hasAllPermissions(permissions, ["create:saim", "update:saim", "delete:saim"]) || !user)){
          router.push('/dashboard/saim')
        }
        // Comprobar permisos para sied
        if(path.includes('/dashboard/settings/sied') && (!hasAllPermissions(permissions, ["create:sied", "update:sied", "delete:sied"]) || !user)){
          router.push('/dashboard/sied')
        }
        // Comprobar permisos para datamarket
        if(path.includes('/dashboard/settings/datamarket') && (!hasAllPermissions(permissions, ["create:datamarket", "update:datamarket", "delete:datamarket"]) || !user)){
          router.push('/dashboard/datamarket')
        }
        // Comprobar permisos para rami
        if(path.includes('/dashboard/settings/rami') && (!hasAllPermissions(permissions, ["create:ramis", "update:ramis", "delete:ramis"]) || !user)){
          router.push('/dashboard/rami')
        } 
      }
  }, [permissions]);
    
  return (
    <Navbar
      color="white"
      className="w-full max-w-none rounded-none shadow-none h-[10vh]"
    >
      <div className="container flex items-center justify-between h-full mx-2 text-blue-gray-900 max-w-none">
        <div className="hidden w-4/12 lg:flex lg:justify-start ">
          <button className="" onClick={toggleSidebar}>
            <Bars3Icon className="w-10" />
          </button>
        </div>
        <Typography className="w-6/12 pt-3 text-3xl font-medium text-left lg:text-center font-custom">
          {title}
        </Typography>

        <div className="hidden w-4/12 lg:flex lg:flex-row lg:space-x-4 lg:justify-end">
          {pathname === "/dashboard/saim" ? (
            <>
              <button
                onClick={handleSuscribeOpen}
                className="h-12 font-semibold duration-300 rounded-md w-36 ring-2 ring-navy hover:bg-navy hover:text-white text-navy "
              >
                Suscríbete
              </button>
            </>
          ) : null}
          <UserProfile />
        </div>
        <Fragment>
          <IconButton
            variant="text"
            className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={openDrawer}
          >
            {openNav ? (
              <XMarkIcon className="text-black w-7" />
            ) : (
              <Bars3Icon className="text-black w-7" />
            )}
          </IconButton>
        </Fragment>
      </div>
      {suscribeOpen && user ? (
        <Suscribe
          open={suscribeOpen}
          handleOpen={handleSuscribeOpen}
          email={user.email ?? ""}
        />
      ) : null}
    </Navbar>
  );
}

function hasAllPermissions(permissions: string[], permissionsToCheck: string[]): boolean {
  // Verifica que cada permiso requerido esté presente en los permisos del usuario
  for (const requiredPermission of permissionsToCheck) {
    if (!permissions.includes(requiredPermission)) {
      return false; // Si falta uno de los permisos requeridos, retorna false
    }
  }
  return true; // Todos los permisos requeridos están presentes
}


