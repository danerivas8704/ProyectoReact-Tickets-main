import { useEffect, useState, ChangeEvent } from "react"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormLabel,
  FormControl
} from "reactstrap"
import { appsettings } from "../settings/appsetings"
import type { ICliente } from "../Interfaces/ICliente"

const initialCliente: ICliente = {
  codigoCliente: 0,
  nombreCliente: "",
  correoCliente: "",
  apellidoCliente: "",
  direccionCliente: "",
  codigoEstado: 1,
};

export function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<ICliente>(initialCliente);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  /** 🔹 Cargar cliente al montar el componente */
  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Clientes/ObtenerCodigo/${id}`);
        if (!response.ok) throw new Error("Error al obtener el cliente");
        const data: ICliente = await response.json();
        if (Array.isArray(data) && data.length > 0) {
        setCliente(data[0]);
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la información del cliente", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, []);

  /** 🔹 Actualizar el estado cuando cambian los inputs */
  const inputChangeValue=(event:ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;  
    setCliente({
      ...cliente,
      [inputName]: inputValue
    }); 
  };

  /** 🔹 Guardar cambios */
  const guardar = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Clientes/Editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) throw new Error("Error al guardar");

      Swal.fire({
        title: "Éxito",
        text: "Cliente editado correctamente",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire("Error", "No se pudo editar el cliente", "error");
    }
  };

  /** 🔹 Regresar */
  const volver = () => navigate("/");

  if (cargando) {
    return (
      <Container className="mt-5 text-center">
        <h5>Cargando cliente...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Editar Cliente</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="nombreCliente">Nombre</Label>
              <Input type="text" name="nombreCliente" onChange={inputChangeValue} value={cliente.nombreCliente} />
            </FormGroup>

            <FormGroup>
              <Label for="apellidoCliente">Apellidos</Label>
              <Input type="text" name="apellidoCliente" onChange={inputChangeValue} value={cliente.apellidoCliente} />
            </FormGroup>

            <FormGroup>
              <Label for="correoCliente">Correo</Label>
              <Input
                id="correoCliente"
                type="email"
                name="correoCliente"
                value={cliente.correoCliente}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label for="direccionCliente">Dirección</Label>
              <Input
                id="direccionCliente"
                type="text"
                name="direccionCliente"
                value={cliente.direccionCliente}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label for="codigoEstado">Estado</Label>
              <Input
                id="codigoEstado"
                type="number"
                name="codigoEstado"
                value={cliente.codigoEstado}
                onChange={inputChangeValue}
              />
            </FormGroup>
          </Form>

          <div className="d-flex justify-content-end mt-3">
            <Button color="primary" className="me-3" onClick={guardar}>
              Guardar
            </Button>
            <Button color="secondary" onClick={volver}>
              Volver
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}