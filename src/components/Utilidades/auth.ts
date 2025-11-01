// src/utils/auth.ts

import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Cerrar sesión",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar datos de sesión
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        // Redirigir al login
        navigate("/login/ingreso");

        // Refrescar la página (opcional)
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    });
  };

  return logout;
}
