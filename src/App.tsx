import { BrowserRouter, Route, Routes } from "react-router"
import {Lista} from "./components/Lista"
import {NuevoCliente} from "./components/NuevoCliente"
import { EditarCliente } from "./components/EditarCliente"
import {ListaCategoria} from "./components/Categorias/ListaCategoria"
import { NuevaCategoria } from "./components/Categorias/NuevaCategoria"
import { EditarCategoria } from "./components/Categorias/EditarCategoria"
import { ListaPrioridades } from "./components/Prioridades/ListaPrioridades"
import { NuevaPrioridad } from "./components/Prioridades/NuevaPrioridad"
import { EditarPrioridades } from "./components/Prioridades/EditarPrioridades"
import { ListaDepartamentos } from "./components/Departamentos/ListaDepartamentos"
import { NuevoDepartamento } from "./components/Departamentos/NuevoDepartamento"
import { EditarDepartamentos } from "./components/Departamentos/EditarDepartamentos"
import { ListaEstados } from "./components/Estados/ListaEstados"
import { NuevoEstado } from "./components/Estados/NuevoEstado"
import { EditarEstados } from "./components/Estados/EditarEstados"
import { Login} from "./components/Login/Ingreso"
import { RecuperarPassword} from "./components/Login/RecuperarPassword"
import { ListaUsuarios} from "./components/Usuarios/ListaUsuarios"
import { EditarUsuarios} from "./components/Usuarios/EditarUsuarios"
import { NuevoUsuario} from "./components/Usuarios/NuevoUsuario"
import { Sidebar } from "./components/Sidebar"
import { Layout } from "./components/Layout";
import { ListaTickets } from "./components/Tickets/ListaTickets"
import { ReporteTickets } from "./components/Reportes/ReporteTickets"
import { Dashboard } from "./components/Dashboard/Dashboard"
function App() {
  const hideSidebar = window.location.pathname === "/";
  return (
    <BrowserRouter>
      {hideSidebar ? (
        <Routes>       
          <Route path="/" element={<Login/>}/>
          <Route path="login/recuperarpassword" element={<RecuperarPassword/>}/>
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/nuevocliente" element={<NuevoCliente/>}/>
            <Route path="/lista" element={<Lista/>}/>
            <Route path="/editarcliente/:id" element={<EditarCliente/>}/>
            <Route path="/tickets/listatickets" element={<ListaTickets/>}/>
            <Route path="/sidebar" element={<Sidebar/>}/>
            
            <Route path="usuarios/listausuarios" element={<ListaUsuarios/>}/>
            <Route path="usuarios/editarusuarios/:id" element={<EditarUsuarios/>}/>
            <Route path="usuarios/nuevousuario" element={<NuevoUsuario/>}/>
            <Route path="categorias/listacategoria" element={<ListaCategoria/>}/>
            <Route path="categorias/nuevacategoria" element={<NuevaCategoria/>}/>
            <Route path="categorias/editarcategoria/:id" element={<EditarCategoria/>}/>
            <Route path="prioridades/listaprioridades" element={<ListaPrioridades/>}/>
            <Route path="prioridades/nuevaprioridad" element={<NuevaPrioridad/>}/>
            <Route path="prioridades/editarprioridades/:id" element={<EditarPrioridades/>}/>
            <Route path="estados/listaestados" element={<ListaEstados/>}/>
            <Route path="estados/nuevoestado" element={<NuevoEstado/>}/>
            <Route path="estados/editarestados/:id" element={<EditarEstados/>}/>
            <Route path="Departamentos/listadepartamentos" element={<ListaDepartamentos/>}/>
            <Route path="Departamentos/nuevodepartamento" element={<NuevoDepartamento/>}/>
            <Route path="Departamentos/editardepartamentos/:id" element={<EditarDepartamentos/>}/>
            <Route path="Reportes/ReporteTickets" element={<ReporteTickets/>}/>
            <Route path="Dashboard/Dashboard" element={<Dashboard/>}/>
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
}

export default App
