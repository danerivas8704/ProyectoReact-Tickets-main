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
import { appsettings } from "../../settings/appsetings"
import type { IPrioridad } from "../../Interfaces/IPrioridad"

const initialIPrioridad: IPrioridad = {
  codigoPrioridad: 0,
  nombrePrioridad: "",
  descripcionPrioridad: "",
  nivelPrioridad: 1
};

export function EditarPrioridades() {
  const { id } = useParams<{ id: string }>();
  const [prioridades, setPrioridades] = useState<IPrioridad>(initialIPrioridad);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  /** 🔹 Cargar prioridad al montar el componente */
  useEffect(() => {
    const obtenerPrioridades = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Prioridades/ObtenerCodigo/${id}`);
        if (!response.ok) throw new Error("Error al obtener la categoria");
        const data: IPrioridad = await response.json();
        if (Array.isArray(data) && data.length > 0) {
        setPrioridades(data[0]);
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la información del cliente", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerPrioridades();
  }, []);

  /** 🔹 Actualizar el estado cuando cambian los inputs */
  const inputChangeValue=(event:ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;  
    setPrioridades({
      ...prioridades,
      [inputName]: inputValue
    }); 
  };

  /** 🔹 Guardar cambios */
  const guardar = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Prioridades/Editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prioridades),
      });

      if (!response.ok) throw new Error("Error al guardar");

      Swal.fire({
        title: "Éxito",
        text: "Prioridad editada correctamente",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      });

      navigate("/prioridades/listaprioridades");
    } catch (error) {
      Swal.fire("Error", "No se pudo editar la prioridad", "error");
    }
  };

  /** 🔹 Regresar */
  const volver = () => navigate("/");

  if (cargando) {
    return (
      <Container className="mt-5 text-center">
        <h5>Cargando categoria...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Editar Prioridades</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="nombrePrioridad">Nombre Prioridad</Label>
              <Input type="text" name="nombrePrioridad" onChange={inputChangeValue} value={prioridades.nombrePrioridad} />
            </FormGroup>

            <FormGroup>
              <Label for="descripcionPrioridad">Descripción Prioridad</Label>
              <Input type="text" name="descripcionPrioridad" onChange={inputChangeValue} value={prioridades.descripcionPrioridad} />
            </FormGroup>

            <FormGroup>
              <Label for="nivelPrioridad">Nivel Prioridad</Label>
              <Input
                id="nivelPrioridad"
                type="text"
                name="nivelPrioridad"
                value={prioridades.nivelPrioridad}
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