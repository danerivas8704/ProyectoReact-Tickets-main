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
import type { IDepartamento } from "../../Interfaces/IDepartamento"

const initialIDepartamento: IDepartamento = {
  codigoDepto: 0,
  nombreDepto: "",
  descripcionDepto: "",
  codigoEstado: 1,
  
};

export function EditarDepartamentos() {
  const { id } = useParams<{ id: string }>();
  const [departamentos, setDepartamentos] = useState<IDepartamento>(initialIDepartamento);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  /** 🔹 Cargar departamento al montar el componente */
  useEffect(() => {
    const obtenerDepartamentos = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Departamentos/ObtenerCodigo/${id}`);
        if (!response.ok) throw new Error("Error al obtener el cliente");
        const data: IDepartamento = await response.json();
        if (Array.isArray(data) && data.length > 0) {
        setDepartamentos(data[0]);
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la información del cliente", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerDepartamentos();
  }, []);

  /** 🔹 Actualizar el estado cuando cambian los inputs */
  const inputChangeValue=(event:ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;  
    setDepartamentos({
      ...departamentos,
      [inputName]: inputValue
    }); 
  };

  /** 🔹 Guardar cambios */
  const guardar = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Departamentos/Editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(departamentos),
      });

      if (!response.ok) throw new Error("Error al guardar");

      Swal.fire({
        title: "Éxito",
        text: "Departamento editado correctamente",
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
  const volver = () => navigate("/departamentos/listadepartamentos");

  if (cargando) {
    return (
      <Container className="mt-5 text-center">
        <h5>Cargando departamento...</h5>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Editar Departamento</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="codigoDepto">Codigo Departamento</Label>
              <Input type="text" name="codigoDepto" onChange={inputChangeValue} value={departamentos.codigoDepto} />
            </FormGroup>

            <FormGroup>
              <Label for="nombreDepto">Nombre Departamento</Label>
              <Input type="text" name="nombreDepto" onChange={inputChangeValue} value={departamentos.nombreDepto} />
            </FormGroup>
            <FormGroup>
              <Label for="descripcionDepto">Descripcion Departamento</Label>
              <Input type="text" name="descripcionDepto" onChange={inputChangeValue} value={departamentos.descripcionDepto} />
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