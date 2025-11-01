import { useEffect, useState } from "react"
import { appsettings } from "../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import { ICliente } from "../Interfaces/ICliente"
import { Container, Row, Col, Table, Button, Input } from "reactstrap"

export function Lista() {
    const [clientes, setClientes] = useState<ICliente[]>([])
    const [filtro, setFiltro] = useState<string>("")
    const [paginaActual, setPaginaActual] = useState<number>(1)
    const [clientesPorPagina] = useState<number>(5)

    // --- Cargar clientes ---
    const obtenerClientes = async () => {
        const response = await fetch(`${appsettings.apiUrl}Clientes/Obtener`)
        if (response.ok) {
            const data = await response.json()
            setClientes(data)
        }
    }

    useEffect(() => {
        obtenerClientes()
    }, [])

    // --- Eliminar cliente ---
    const Eliminar = (id: number) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminará el cliente seleccionado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`${appsettings.apiUrl}Clientes/Eliminar/${id}`, { method: "DELETE" })
                if (response.ok) {
                    Swal.fire("Eliminado!", "El cliente fue eliminado correctamente.", "success")
                    await obtenerClientes()
                }
            }
        })
    }

    // --- Filtrar por nombre o código ---
    const clientesFiltrados = clientes.filter((c) =>
        c.nombreCliente.toLowerCase().includes(filtro.toLowerCase()) ||
        c.codigoCliente.toString().includes(filtro)
    )

    // --- Paginación ---
    const indiceUltimo = paginaActual * clientesPorPagina
    const indicePrimero = indiceUltimo - clientesPorPagina
    const clientesPaginados = clientesFiltrados.slice(indicePrimero, indiceUltimo)
    const totalPaginas = Math.ceil(clientesFiltrados.length / clientesPorPagina)

    const cambiarPagina = (nuevaPagina: number) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina)
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{ size: 10, offset: 1 }}>
                    <h4>Lista de Clientes</h4>
                    <hr />
                    <Link className="btn btn-success mb-3" to="/nuevocliente">Nuevo Cliente</Link>

                    {/* --- Filtro de búsqueda --- */}
                    <Input
                        type="text"
                        placeholder="Buscar por código o nombre..."
                        value={filtro}
                        onChange={(e) => {
                            setFiltro(e.target.value)
                            setPaginaActual(1) // resetear paginación al buscar
                        }}
                        className="mb-3"
                    />

                    {/* --- Tabla --- */}
                    <Table bordered responsive>
                        <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesPaginados.length > 0 ? (
                                clientesPaginados.map((item) => (
                                    <tr key={item.codigoCliente}>
                                        <td>{item.codigoCliente}</td>
                                        <td>{item.nombreCliente}</td>
                                        <td>{item.apellidoCliente}</td>
                                        <td>{item.correoCliente}</td>
                                        <td>
                                            <Link
                                                className="btn btn-primary me-2"
                                                to={`/editarcliente/${item.codigoCliente}`}
                                            >
                                                Editar
                                            </Link>
                                            <Button
                                                color="danger"
                                                onClick={() => Eliminar(item.codigoCliente!)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
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
