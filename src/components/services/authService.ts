export const loginUser = async (email: string, password: string) => {
  // Aquí puedes conectar a tu API real
  // Ejemplo: const response = await fetch(`${appsettings.apiUrl}/login`, {...});

  await new Promise((r) => setTimeout(r, 1000)); // Simula un retraso de red

  if (email === "admin@demo.com" && password === "123456") {
    return { success: true, message: "Login correcto" };
  }
  return { success: false, message: "Correo o contraseña incorrectos" };
};
