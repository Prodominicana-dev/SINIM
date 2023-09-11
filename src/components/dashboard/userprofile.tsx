import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  Avatar,
  Typography,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import {
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function UserProfile() {
  const { user, error, isLoading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const profileMenuItems = [
    {
      label: "Perfil",
      icon: UserCircleIcon,
      link: "/profile",
    },
    {
      label: "Cerrar sesion",
      icon: PowerIcon,
      link: "api/auth/logout",
    },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  if (!user)
    return (
      <Button className="bg-navy">
        <Link href={"/api/auth/login"}>Inicia sesion</Link>
      </Button>
    );

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar variant="circular" size="sm" src={user.picture as string} />
          <Typography className="capitalize">{user.name}</Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link href={link} key={key}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}

                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}
