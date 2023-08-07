"use client";
import loginHandler from "@/src/services/auth/signin.server";
import React, { useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  // useEffect(() => {
  //   // Cargar el script de AppleID.auth después de que el componente se haya montado
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   script.onload = () => {
  //     AppleID.auth.init({
  //       clientId: "do.gob.prodominicana.sinim",
  //       scope: "name email",
  //       redirectURI: "https://sinim.prodominicana.gob.do",
  //       usePopup: true,
  //     });
  //     AppleID.auth.signIn().then((res) => {
  //       const authCode = res.authorization.code;
  //       axios
  //         .post("http://localhost:3001/auth/apple", { authCode })
  //         .then((res) => {
  //           console.log(res);
  //         });
  //     });
  //   };
  // }, []);

  return (
    <>
      <form onSubmit={loginHandler}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" id="email" className="text-black" />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input type="password" name="pwd" id="pwd" className="text-black" />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <button onClick={() => signIn("apple")}>Iniciar sesión con Apple</button>
      <button onClick={() => signIn("azure-ad")}>
        Iniciar sesión con Microsoft
      </button>
      {/* <div
        id="appleid-signin"
        data-color="black"
        data-border="true"
        data-type="sign in"
      ></div> */}
    </>
  );
}
