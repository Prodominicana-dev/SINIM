"use client";
import IsLogged from "@/src/components/validate/logged";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Avatar,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "@/src/state/states";
import axios from "axios";
import { headers } from "@/next.config";
import { notifications } from "@mantine/notifications";
const countryCodes = require("country-codes-list");

export default function page() {
  const { user } = useUser();
  const [typeDocumentation, setTypeDocumentation] = useState("");

  const [createdAt, setCreatedAt] = useState<Date | null>(new Date());
  const [country, setCountry] = useState({
    countryCode: "DO",
    countryCallingCode: "+1",
  });
  const [myCountryCodesArray, setMyCountryCodesArray] = useState(() => {
    const myCountryCodesObject = countryCodes.customList(
      "countryCode",
      "+{countryCallingCode}"
    );
    const list = Object.keys(myCountryCodesObject).map((countryCode) => ({
      countryCode,
      countryCallingCode: myCountryCodesObject[countryCode],
    }));
    return list.sort((a, b) =>
      a.countryCallingCode.localeCompare(b.countryCallingCode)
    );
  });
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [documentation, setDocumentation] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [token] = useAtom(tokenAtom);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setGlobalName] = useAtom(userAtom);

  useEffect(() => {
    if (user && token) {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}`;
      const getUserData = async () => {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.user_metadata) {
          setAddress(
            res.data.user_metadata.address ? res.data.user_metadata.address : ""
          );
          setDocumentation(
            res.data.user_metadata.documentation.documentation
              ? res.data.user_metadata.documentation.documentation
              : ""
          );
          setTypeDocumentation(
            res.data.user_metadata.documentation.typeDocumentation
              ? res.data.user_metadata.documentation.typeDocumentation
              : ""
          );
          setName(
            res.data.user_metadata.given_name
              ? res.data.user_metadata.given_name
              : ""
          );
          setFullName(
            res.data.user_metadata.given_name &&
              res.data.user_metadata.family_name
              ? `${res.data.user_metadata.given_name} ${res.data.user_metadata.family_name}`
              : user?.name
              ? user?.name
              : ""
          );
          setLastName(
            res.data.user_metadata.family_name
              ? res.data.user_metadata.family_name
              : ""
          );
          setCountry(
            res.data.user_metadata.phone_number
              ? res.data.user_metadata.phone_number.country
              : { countryCode: "DO", countryCallingCode: "+1" }
          );
          setPhone(
            res.data.user_metadata.phone_number
              ? res.data.user_metadata.phone_number.number
              : ""
          );
        } else {
          setName(res.data.given_name ? res.data.given_name : "");
          setFullName(
            res.data.given_name && res.data.family_name
              ? `${res.data.given_name} ${res.data.family_name}`
              : user?.name
              ? user?.name
              : ""
          );
          setLastName(res.data.family_name ? res.data.family_name : "");
        }
        setEmail(res.data.email);
        setCreatedAt(new Date(res.data.updated_at));
        setDataLoaded(true);
      };
      getUserData();
    }
  }, [user, token]);

  useEffect(() => {
    setFullName(user?.name ? user?.name : `${name} ${lastName}`);
    setCreatedAt(user?.updated_at ? new Date(user?.updated_at) : new Date());
  }, [user]);

  const handleSubmit = async (e: any) => {
    setIsSubmitted(true);
    const data = {
      user_metadata: {
        address,
        documentation: {
          documentation,
          typeDocumentation,
        },
        phone_number: {
          country,
          number: phone,
        },
        given_name: name,
        family_name: lastName,
        name: `${name} ${lastName}`,
      },
    };
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://prodominicana.us.auth0.com/api/v2/users/${user?.sub}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      data: data,
    };
    const response = await axios.request(config);
    console.log(response.status);
    if (response.status === 200) {
      console.log(response.data);
      notifications.show({
        title: "Perfíl actualizado",
        message: "Tu perfíl ha sido actualizado exitosamente",
        color: "green",
        autoClose: 5000,
      });
    }
    setIsSubmitted(false);
    setGlobalName(`${name} ${lastName}`);
  };

  if (!dataLoaded)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  return (
    <IsLogged>
      <div className="flex justify-center">
        <div className="flex flex-col w-10/12 py-8 sm:w-8/12 xl:w-5/12 space-y-14">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-black lg:text-4xl">
              Perfíl
            </h1>
            <p className="text-base font-thin text-gray-400 lg:text-lg">
              Completa tu perfil para disfrutar de una experiencia más completa
              en nuestra plataforma.
            </p>
          </div>
          <div className="flex flex-col w-full space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex justify-center w-full sm:w-6/12">
              <Avatar
                variant="circular"
                size="lg"
                className="w-32 h-32 sm:w-48 sm:h-48"
                src={user?.picture as string}
              />
            </div>
            <div className="flex items-center justify-center w-full sm:justify-start sm:w-6/12">
              <div className="w-full">
                <Typography className="w-full text-2xl font-bold text-center truncate sm:text-left sm:text-3xl text-navy ">
                  {fullName}
                </Typography>
                <Typography className="text-xs font-thin text-center text-gray-400 sm:text-left sm:text-base">
                  Miembro desde{" "}
                  {createdAt
                    ? format(new Date(createdAt), "MMMM yyyy", { locale: es })
                    : "Fecha no disponible"}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full space-y-4 sm:space-y-10">
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Input
                  label="Nombre"
                  crossOrigin={""}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFullName(`${e.target.value} ${lastName}`);
                  }}
                  value={name}
                />
              </div>
              <div className="w-full sm:w-6/12">
                <Input
                  label="Apellido"
                  crossOrigin={""}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setFullName(`${name} ${e.target.value}`);
                  }}
                  value={lastName}
                />
              </div>
            </div>
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Input
                  label="Correo electrónico"
                  type="email"
                  crossOrigin={""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled
                  value={email}
                />
              </div>
              <div className="flex flex-row w-full sm:w-6/12">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <button className="flex flex-row items-center justify-between h-10 gap-2 text-xs font-thin text-black border border-r-0 rounded-l-lg w-36 border-blue-gray-200 bg-blue-gray-500/10">
                      <div className="flex justify-end w-5/12">
                        <Image
                          src={`https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`}
                          alt={country.countryCode}
                          className="object-cover w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex justify-start w-7/12">
                        {country.countryCallingCode}
                      </div>
                    </button>
                  </MenuHandler>
                  <MenuList className="max-h-[20rem] max-w-[12rem]">
                    {myCountryCodesArray.map((country, index) => {
                      return (
                        <MenuItem
                          key={country.countryCode}
                          value={country.countryCode}
                          className="flex items-center gap-2"
                          onClick={() => setCountry(country)}
                        >
                          <img
                            src={`https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`}
                            alt={country.countryCode}
                            className="object-cover w-5 h-5 rounded-full"
                          />
                          {country.countryCode}{" "}
                          <span className="ml-auto">
                            {country.countryCallingCode}
                          </span>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Input
                  type="tel"
                  placeholder="Teléfono"
                  className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  crossOrigin={""}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Select
                  label="Documento"
                  onChange={(e) => {
                    setTypeDocumentation(e ? e : "");
                    console.log(e);
                  }}
                  value={typeDocumentation}
                >
                  <Option value="cedula">Cédula</Option>
                  <Option value="pasaporte">Pasaporte</Option>
                </Select>
              </div>
              <div className="w-full sm:w-6/12">
                <Input
                  label={
                    typeDocumentation === "cedula"
                      ? "Cédula"
                      : typeDocumentation === "pasaporte"
                      ? "Pasaporte"
                      : ""
                  }
                  crossOrigin={""}
                  disabled={typeDocumentation === ""}
                  value={documentation}
                  minLength={typeDocumentation === "cedula" ? 11 : 9}
                  maxLength={typeDocumentation === "cedula" ? 11 : 9}
                  onChange={(e) => setDocumentation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full space-x-4 sm:flex-row">
              <div className="w-full">
                <Input
                  label="Dirección"
                  type="text"
                  crossOrigin={""}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <button
              className="flex items-center justify-center w-full text-lg font-semibold text-center text-white duration-200 rounded-lg h-14 bg-navy hover:text-white/80 hover:bg-navy/80"
              onClick={handleSubmit}
              disabled={
                name === "" ||
                lastName === "" ||
                email === "" ||
                phone === "" ||
                address === "" ||
                documentation === "" ||
                typeDocumentation === ""
              }
            >
              {!isSubmitted ? "Guardar" : <Spinner />}
            </button>
          </div>
        </div>
      </div>
    </IsLogged>
  );
}
