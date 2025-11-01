import { useEffect, useState } from "react";
import { appsettings } from "../../settings/appsetings";
import { Table, Container, Row, Col } from "reactstrap";
import Swal from "sweetalert2";
import type { ITicketR } from "../../Interfaces/ITicketR";

export const ReporteTickets = () => {
  const [tickets, setTickets] = useState<ITicketR[]>([]);

  useEffect(() => {
    obtenerReporte();
  }, []);

  const obtenerReporte = async () => {
  try {
    const response = await fetch(`${appsettings.apiUrl}Tickets/Reporte`);
    if (!response.ok) throw new Error("Error al obtener reporte de tickets");
    const data = await response.json();

    // ✅ Asegurar que sea un arreglo
    if (Array.isArray(data)) {
      setTickets(data);
    } else if (data?.data && Array.isArray(data.data)) {
      setTickets(data.data); // si la API devuelve dentro de 'data'
    } else {
      setTickets([]); // en caso de error o vacío
    }

  } catch (error: any) {
    Swal.fire("Error", error.message, "error");
  }
};

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3 className="text-center mb-4">📋 Reporte General de Tickets</h3>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Código</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Cliente</th>
                <th>Categoría</th>
                <th>Prioridad</th>
                <th>Depto</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Creación</th>
                
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.codigoTicket}>
                  <td>{t.codigoTicket}</td>
                  <td>{t.tituloTicket}</td>
                  <td>{t.descripcionTicket}</td>
                  <td>{t.nombreCliente}</td>
                  <td>{t.nombreCategoria}</td>
                  <td>{t.nombrePrioridad}</td>
                  <td>{t.nombreDepto}</td>
                  <td>{t.nombreUsuario}</td>
                  <td>{t.nombreEstado}</td>
                  <td>{new Date(t.fechaCreacion).toLocaleDateString()}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
