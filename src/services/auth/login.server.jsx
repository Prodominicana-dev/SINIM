import axios from "axios";

export default function loginHandler(e) {
  e.preventDefault();
  const token = authToken;
  // Verificar si ya existe la cookie 'token'
  if (document.cookie.includes("token")) {
    // La cookie 'token' ya existe, no se hace otra solicitud
    
    return;
  }

  const route = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  const data = {
    email: e.target.email.value,
    password: e.target.pwd.value,
  };
  axios.post(route, data).then((res) => {
    // Crear la cookie directamente en el lado del cliente
    document.cookie = `${token}=${res.data.access_token}; path=/; max-age=3600; Secure; SameSite=none`;

    // Limpiar los campos del formulario después de hacer la solicitud
    e.target.email.value = "";
    e.target.pwd.value = "";
  });
}
