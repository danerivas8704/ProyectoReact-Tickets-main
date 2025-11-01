import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { appsettings } from "../../settings/appsetings";

interface IMetricas {
  abierto: number;
  enProgreso: number;
  resuelto: number;
  cerrado: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [metricas, setMetricas] = useState<IMetricas>({
    abierto: 0,
    enProgreso: 0,
    resuelto: 0,
    cerrado: 0,
  });

  // Cargar métricas al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Tickets/ObtenerDashboard`);
        if (response.ok) {
          const data = await response.json();
          setMetricas(data[0]);
        } else {
          Swal.fire("Error", "No se pudieron cargar las métricas del dashboard", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Error al conectar con el servidor", "error");
      }
    };

    cargarDatos();
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Dashboard Tickets</h3>
      <Row>
        {/* Tarjetas de métricas */}
        <Col md="3" sm="6" className="mb-4">
          <Card body color="primary" inverse>
            <CardBody>
              <CardTitle tag="h5">Abiertos</CardTitle>
              <CardText>{metricas.abierto}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/clientes/listaclientes")} style={{ visibility: "hidden" }}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="3" sm="6" className="mb-4">
          <Card body color="success" inverse>
            <CardBody>
              <CardTitle tag="h5">En Progreso</CardTitle>
              <CardText>{metricas.enProgreso}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/pedidos/listapedidos")} style={{ visibility: "hidden" }}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="3" sm="6" className="mb-4">
          <Card body color="warning" inverse>
            <CardBody>
              <CardTitle tag="h5">Resueltos</CardTitle>
              <CardText>{metricas.resuelto}</CardText>
              <Button color="light" size="sm" onClick={() => navigate("/ventas/listaventas")} style={{ visibility: "hidden" }}>
                Ver más
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="3" sm="6" className="mb-4">
          <Card body color="info" inverse>
            <CardBody>
              <CardTitle tag="h5">Cerrados</CardTitle>
              <CardText>{metricas.cerrado}</CardText>
               <Button color="light" size="sm" onClick={() => navigate("/ventas/listaventas")} style={{ visibility: "hidden" }}>
                Ver más
              </Button>             
            </CardBody>
          </Card>
        </Col>
      </Row>

      
    </Container>
  );
}
