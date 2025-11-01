// src/components/Sidebar.tsx
import { useState } from "react";
import { Nav, NavItem, NavLink, Collapse } from "reactstrap";
import { Link, useLocation } from "react-router";
// Simple inline chevron icons to avoid an external dependency
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

  // Controla qué menú está abierto
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Datos del menú
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
      category: "Gestión de Catalogos",
      items: [        
        {
          label: "Catalogos",
          subItems: [
            { label: "Cat. Prioridades", path: "/prioridades/listaprioridades" },
            { label: "Cat. Departamentos", path: "/departamentos/listadepartamentos" },
            { label: "Cat. Categorias ", path: "/categorias/listacategoria" },
            { label: "Cat. Estados Varios ", path: "/estados/listaestados" },
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
      items: [
        
      ],
    },
  ];

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
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
      }}
    >
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
                          ? "#f8f9fa"
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
  );
}
