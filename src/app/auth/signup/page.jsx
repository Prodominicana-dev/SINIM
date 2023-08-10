"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Background from "@/src/components/home/background";

export default function Page() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const route = "http://localhost:3001/auth/register";
    const data = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.pwd.value,
    };
    axios.post(route, data);

    e.target.name.value = "";
    e.target.lastname.value = "";
    e.target.email.value = "";
    e.target.pwd.value = "";
  };
  return (
    <>
      <section className="w-full h-screen">
        <Background
          video={"/videos/rami.mp4"}
          color={"bg-gradient-to-l from-[50%] from-blue-700 to-sky-500/60"}
        />
        <div className="w-6/12 h-full ml-auto bg-white/10 flex justify-center items-center">
          <div
            id="formulario"
            className="w-11/12 h-full flex flex-col bg-red-300 p-10 space-y-8"
          >
            <h1 className="font-bold text-5xl text-white">Regístrate</h1>
            <form className="flex flex-col space-y-8">
              <div className="w-full h-12 flex space-x-8 justify-between">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-5/12 border-2 bg-transparent rounded-xl p-5 text-white placeholder-white"
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="w-5/12 border-2 bg-transparent rounded-xl p-5 text-white placeholder-white"
                  placeholder="Apellido"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-12 border-2 bg-transparent rounded-xl p-5 text-white placeholder-white"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="w-full h-12 flex space-x-8 justify-between">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-3/12 border-2 bg-transparent rounded-xl p-5 text-white placeholder-white"
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="w-9/12 border-2 bg-transparent rounded-xl p-5 text-white placeholder-white"
                  placeholder="Apellido"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-12 border-2 bg-transparent rounded-xl p-5 text-white placeholder-white"
                  placeholder="Correo electrónico"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
