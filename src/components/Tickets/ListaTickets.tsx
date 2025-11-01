import { useEffect, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import type { ITicket } from "../../Interfaces/ITicket"
import { Container, Row, Col, Table, Button, Input } from "reactstrap"

export function ListaTickets() {
    const [tickets, setTickets] = useState<ITicket[]>([])
    const [filtro, setFiltro] = useState<string>("")
    const [paginaActual, setPaginaActual] = useState<number>(1)
    const [ticketsPorPagina] = useState<number>(5)

    // --- Cargar tickets ---
    const obtenerTickets = async () => {
        const response = await fetch(`${appsettings.apiUrl}Tickets/Obtener`)
        if (response.ok) {
            const data = await response.json()
            setTickets(data)
        }
    }

    useEffect(() => {
        obtenerTickets()
    }, [])

    // --- Eliminar ticket ---
    const Eliminar = (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminará el ticket seleccionado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Tickets/Eliminar/${id}`, { method: "DELETE" })
                if (response.ok) {
                    Swal.fire("Eliminado!", "El ticket fue eliminado correctamente.", "success")
                    await obtenerTickets()
                }
            }
        })
    }

    // --- Filtrar por título o descripción ---
    const ticketsFiltrados = tickets.filter((t) =>
        t.tituloTicket.toLowerCase().includes(filtro.toLowerCase()) ||
        t.descripcionTicket.toLowerCase().includes(filtro.toLowerCase()) ||
        t.codigoTicket?.toString().includes(filtro)
    )

    // --- Paginación ---
    const indiceUltimo = paginaActual * ticketsPorPagina
    const indicePrimero = indiceUltimo - ticketsPorPagina
    const ticketsPaginados = ticketsFiltrados.slice(indicePrimero, indiceUltimo)
    const totalPaginas = Math.ceil(ticketsFiltrados.length / ticketsPorPagina)

    const cambiarPagina = (nuevaPagina: number) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina)
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 10, offset: 1 }}>
                    <h4>Lista de Tickets</h4>
                    <hr />
                    <Link className="btn btn-success mb-3" to="/nuevoticket">Nuevo Ticket</Link>

                    {/* --- Filtro de búsqueda --- */}
                    <Input
                        type="text"
                        placeholder="Buscar por código, título o descripción..."
                        value={filtro}
                        onChange={(e) => {
                            setFiltro(e.target.value)
                            setPaginaActual(1)
                        }}
                        className="mb-3"
                    />

                    {/* --- Tabla --- */}
                    <Table bordered responsive>
                        <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Cliente</th>
                                <th>Prioridad</th>
                                <th>Estado</th>
                                <th>Fecha Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketsPaginados.length > 0 ? (
                                ticketsPaginados.map((item) => (
                                    <tr key={item.codigoTicket}>
                                        <td>{item.codigoTicket}</td>
                                        <td>{item.tituloTicket}</td>
                                        <td>{item.descripcionTicket}</td>
                                        <td>{item.codigoCliente}</td>
                                        <td>{item.codigoPrioridad}</td>
                                        <td>{item.codigoEstado}</td>
                                        <td>{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary me-2"
                                                to={`/editarticket/${item.codigoTicket}`}
                                            >
                                                Editar
                                            </Link>
                                            <Button
                                                color="danger"
                                                onClick={() => Eliminar(item.codigoTicket!)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center">
                                        No se encontraron resultados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* --- Controles de paginación --- */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <Button
                            color="secondary"
                            disabled={paginaActual === 1}
                            onClick={() => cambiarPagina(paginaActual - 1)}
                        >
                            Anterior
                        </Button>

                        <span>Página {paginaActual} de {totalPaginas}</span>

                        <Button
                            color="secondary"
                            disabled={paginaActual === totalPaginas || totalPaginas === 0}
                            onClick={() => cambiarPagina(paginaActual + 1)}
                        >
                            Siguiente
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
