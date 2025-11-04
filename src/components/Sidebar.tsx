// src/components/Sidebar.tsx
import { useState } from "react";
import { Nav, NavItem, NavLink, Collapse, Button } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

// Simple inline chevron icons
const ChevronDown = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronRight = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Menú existente
  const menuItems = [
    {
      category: "Gestión",
      items: [
        { label: "Usuarios", path: "/usuarios/listausuarios" },
        { label: "Clientes", path: "/lista" },
        { label: "Dashboard Principal", path: "/dashboard/dashboard" },
        {
          label: "Reportes",
          subItems: [
            { label: "Tickets Principal ", path: "/reportes/reportetickets" },
          ],
        },
      ],
    },
    {
      category: "Gestión de Catálogos",
      items: [
        {
          label: "Catálogos",
          subItems: [
            { label: "Cat. Prioridades", path: "/prioridades/listaprioridades" },
            { label: "Cat. Departamentos", path: "/departamentos/listadepartamentos" },
            { label: "Cat. Categorías", path: "/categorias/listacategoria" },
            { label: "Cat. Estados Varios", path: "/estados/listaestados" },
          ],
        },
      ],
    },
    {
      category: "Gestión de Tickets",
      items: [
        {
          label: "Tickets",
          subItems: [
            { label: "Lista de tickets", path: "/tickets/listatickets" },
          ],
        },
      ],
    },
    {
      category: "Configuración",
      items: [],
    },
  ];

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  // 🔐 Función de logout
  const handleLogout = () => {
    Swal.fire({
      title: "Cerrar sesión",
      text: "¿Seguro que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/");
        setTimeout(() => window.location.reload(), 300);
      }
    });
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#212529",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // 👈 Esto mantiene el logout abajo
      }}
    >
      <div>
        <h4 className="text-center mb-4">Panel Administrativo</h4>

        {menuItems.map((group) => (
          <div key={group.category} className="mb-3">
            <h6 style={{ color: "#adb5bd", textTransform: "uppercase" }}>
              {group.category}
            </h6>
            <Nav vertical>
              {group.items.map((item) =>
                item.subItems ? (
                  <div key={item.label}>
                    <NavItem
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        backgroundColor:
                          openMenu === item.label ? "#343a40" : "transparent",
                      }}
                      onClick={() => toggleMenu(item.label)}
                    >
                      <span>{item.label}</span>
                      {openMenu === item.label ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </NavItem>

                    <Collapse isOpen={openMenu === item.label}>
                      <Nav className="ms-3">
                        {item.subItems.map((sub) => (
                          <NavItem key={sub.path}>
                            <NavLink
                              tag={Link}
                              to={sub.path}
                              style={{
                                color:
                                  location.pathname === sub.path
                                    ? "#0d6efd"
                                    : "#adb5bd",
                                padding: "6px 0",
                                display: "block",
                              }}
                            >
                              {sub.label}
                            </NavLink>
                          </NavItem>
                        ))}
                      </Nav>
                    </Collapse>
                  </div>
                ) : (
                  <NavItem key={item.path}>
                    <NavLink
                      tag={Link}
                      to={item.path}
                      style={{
                        color:
                          location.pathname === item.path
                            ? "#0d6efd"
                            : "#adb5bd",
                        backgroundColor:
                          location.pathname === item.path
                            ? "#343a40"
                            : "transparent",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        display: "block",
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </NavItem>
                )
              )}
            </Nav>
          </div>
        ))}
      </div>

      {/* 🔘 Botón de Cerrar Sesión al final del sidebar */}
      <div className="mt-auto text-center">
        <Button color="danger" onClick={handleLogout} style={{ width: "100%" }}>
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}
