import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"
import { appsettings } from "../../settings/appsetings"
import type { ITicket } from "../../Interfaces/ITicket"

// --- Interfaz de catálogos simples ---
interface ICatalogo {
  id: number
  nombre: string
}

// --- Estado inicial del ticket ---
const initialTicket: ITicket = {
  descripcionTicket: "",
  codigoCliente: 0,
  tituloTicket: "",
  codigoCategoria: 0,
  codigoPrioridad: 0,
  codigoDepto: 0,
  codigoUsuario: 0,
  codigoEstado: 0,
  usuarioCreacion: localStorage.getItem("usuario") ?? "",
  fechaCreacion: new Date(),
  fechaModificacion: new Date(),
  fechaCierre: new Date()
}

export function EditarTicket() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [ticket, setTicket] = useState<ITicket>(initialTicket)

  // --- Catálogos ---
  const [clientes, setClientes] = useState<ICatalogo[]>([])
  const [categorias, setCategorias] = useState<ICatalogo[]>([])
  const [prioridades, setPrioridades] = useState<ICatalogo[]>([])
  const [departamentos, setDepartamentos] = useState<ICatalogo[]>([])
  const [usuarios, setUsuarios] = useState<ICatalogo[]>([])
  const [estados, setEstados] = useState<ICatalogo[]>([])

  // --- Manejo de inputs ---
  const inputChangeValue = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setTicket({
      ...ticket,
      [name]: value,
    })
  }

  // --- Cargar catálogos ---
  const cargarCatalogos = async () => {
    try {
      const [clientesRes, categoriasRes, prioridadesRes, deptosRes, usuariosRes, estadosRes] = await Promise.all([
        fetch(`${appsettings.apiUrl}Clientes/ObtenerC`),
        fetch(`${appsettings.apiUrl}Categorias/ObtenerC`),
        fetch(`${appsettings.apiUrl}Prioridades/ObtenerC`),
        fetch(`${appsettings.apiUrl}Departamentos/ObtenerC`),
        fetch(`${appsettings.apiUrl}Usuarios/ObtenerC`),
        fetch(`${appsettings.apiUrl}Estados/ObtenerC`)
      ])

      if (clientesRes.ok && categoriasRes.ok && prioridadesRes.ok && deptosRes.ok && usuariosRes.ok && estadosRes.ok) {
        setClientes(await clientesRes.json())
        setCategorias(await categoriasRes.json())
        setPrioridades(await prioridadesRes.json())
        setDepartamentos(await deptosRes.json())
        setUsuarios(await usuariosRes.json())
        setEstados(await estadosRes.json())
      } else {
        throw new Error("Error al cargar catálogos")
      }
    } catch (error) {
      console.error("Error cargando catálogos:", error)
      Swal.fire("Error", "No se pudieron cargar los catálogos", "error")
    }
  }

  // --- Cargar ticket existente ---
  const cargarTicket = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Tickets/ObtenerCodigo/${id}`)
      if (!response.ok) throw new Error("Error al obtener el ticket");
              const data: ITicket = await response.json();
              if (Array.isArray(data) && data.length > 0) {
              setTicket(data[0]);
              }
           else {
        Swal.fire("Error", "No se pudo cargar el ticket", "error")
      }
    } catch (error) {
      console.error("Error cargando ticket:", error)
      Swal.fire("Error", "Ocurrió un problema al cargar el ticket", "error")
    }
  }

  useEffect(() => {
    cargarCatalogos()
    if (id) cargarTicket()
  }, [id])

  // --- Guardar cambios ---
  const guardarCambios = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Tickets/Actualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      })

      if (response.ok) {
        Swal.fire("Éxito", "El ticket fue actualizado correctamente", "success")
        navigate("/tickets/listatickets")
      } else {
        Swal.fire("Error", "No se pudo actualizar el ticket", "error")
      }
    } catch (error) {
      console.error("Error al guardar:", error)
      Swal.fire("Error", "Ocurrió un problema al guardar los cambios", "error")
    }
  }

  // --- Volver ---
  const volver = () => navigate("/tickets/listatickets")

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Editar Ticket</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label>Título del Ticket</Label>
              <Input
                type="text"
                name="tituloTicket"
                onChange={inputChangeValue}
                value={ticket.tituloTicket || ""}
              />
            </FormGroup>

            <FormGroup>
              <Label>Descripción</Label>
              <Input
                type="textarea"
                name="descripcionTicket"
                onChange={inputChangeValue}
                value={ticket.descripcionTicket || ""}
              />
            </FormGroup>

            <FormGroup>
              <Label>Cliente</Label>
              <Input
                type="select"
                name="codigoCliente"
                onChange={inputChangeValue}
                value={ticket.codigoCliente || ""}
              >
                <option value="">Seleccione cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Categoría</Label>
              <Input
                type="select"
                name="codigoCategoria"
                onChange={inputChangeValue}
                value={ticket.codigoCategoria || ""}
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Prioridad</Label>
              <Input
                type="select"
                name="codigoPrioridad"
                onChange={inputChangeValue}
                value={ticket.codigoPrioridad || ""}
              >
                <option value="">Seleccione prioridad</option>
                {prioridades.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Departamento</Label>
              <Input
                type="select"
                name="codigoDepto"
                onChange={inputChangeValue}
                value={ticket.codigoDepto || ""}
              >
                <option value="">Seleccione departamento</option>
                {departamentos.map((d) => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Usuario Asignado</Label>
              <Input
                type="select"
                name="codigoUsuario"
                onChange={inputChangeValue}
                value={ticket.codigoUsuario || ""}
              >
                <option value="">Seleccione usuario</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>{u.nombre}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Estado</Label>
              <Input
                type="select"
                name="codigoEstado"
                onChange={inputChangeValue}
                value={ticket.codigoEstado || ""}
              >
                <option value="">Seleccione estado</option>
                {estados.map((e) => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Usuario Creación</Label>
              <Input
                type="text"
                name="usuarioCreacion"
                readOnly
                value={ticket.usuarioCreacion || ""}
              />
            </FormGroup>

            <FormGroup>
              <Label>Fecha de Creación</Label>
              <Input
                type="date"
                name="fechaCreacion"
                onChange={inputChangeValue}
                value={ticket.fechaCreacion ? new Date(ticket.fechaCreacion).toISOString().split("T")[0] : ""}
              />
            </FormGroup>

            <FormGroup>
              <Label>Fecha de Cierre</Label>
              <Input
                type="date"
                name="fechaCierre"
                onChange={inputChangeValue}
                value={ticket.fechaCierre ? new Date(ticket.fechaCierre).toISOString().split("T")[0] : ""}
              />
            </FormGroup>
          </Form>

          <Button color="primary" className="me-4" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
          <Button color="secondary" onClick={volver}>
            Volver
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
