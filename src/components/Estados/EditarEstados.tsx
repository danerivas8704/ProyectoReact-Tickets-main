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
import type { IEstados } from "../../Interfaces/IEstados"

const initialIEstados: IEstados = {
  codigoEstado: 0,
  nombreEstado: "",
  descripcionEstado: ""
};

export function EditarEstados() {
  const { id } = useParams<{ id: string }>();
  const [estados, setEstados] = useState<IEstados>(initialIEstados);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  /** 🔹 Cargar prioridad al montar el componente */
  useEffect(() => {
    const obtenerEstados = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Estados/ObtenerCodigo/${id}`);
        if (!response.ok) throw new Error("Error al obtener el estado");
        const data: IEstados = await response.json();
        if (Array.isArray(data) && data.length > 0) {
        setEstados(data[0]);
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la información del cliente", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerEstados();
  }, []);

  /** 🔹 Actualizar el estado cuando cambian los inputs */
  const inputChangeValue=(event:ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;  
    setEstados({
      ...estados,
      [inputName]: inputValue
    }); 
  };

  /** 🔹 Guardar cambios */
  const guardar = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Estados/Editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(estados),
      });

      if (!response.ok) throw new Error("Error al guardar");

      Swal.fire({
        title: "Éxito",
        text: "Estado editado correctamente",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      });

      navigate("/estados/listaestados");
    } catch (error) {
      Swal.fire("Error", "No se pudo editar el estado", "error");
    }
  };

  /** 🔹 Regresar */
  const volver = () => navigate("/estados/listaestados");

  if (cargando) {
    return (
      <Container className="mt-5 text-center">
        <h5>Cargando estado...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Editar estados</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="nombreEstado">Nombre Estado</Label>
              <Input type="text" name="nombreEstado" onChange={inputChangeValue} value={estados.nombreEstado} />
            </FormGroup>

            <FormGroup>
              <Label for="descripcionEstado">Descripción Prioridad</Label>
              <Input type="text" name="descripcionEstado" onChange={inputChangeValue} value={estados.descripcionEstado} />
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