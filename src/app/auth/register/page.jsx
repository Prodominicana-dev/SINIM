"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="lastname">Apellido</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            required
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="pwd">Pwd</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            required
            className="text-black"
          />
        </div>

        <button type="submit" className={` w-32 h-16 bg-red-200 text-black`}>
          Enviar
        </button>
      </form>
    </>
  );
}
