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
import type { IUsuario } from "../../Interfaces/IUsuario"

const initialIUsuario: IUsuario = {
  codigoUsuario: 0,
  nombreUsuario: "",
  correo: "",
  codigoDepto: 1
};

export function EditarUsuarios() {
  const { id } = useParams<{ id: string }>();
  const [usuarios, setUsuarios] = useState<IUsuario>(initialIUsuario);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  /** 🔹 Cargar prioridad al montar el componente */
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Usuarios/ObtenerCodigo/${id}`);
        if (!response.ok) throw new Error("Error al obtener el usuario");
        const data: IUsuario = await response.json();
        if (Array.isArray(data) && data.length > 0) {
        setUsuarios(data[0]);
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la información del usuario", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  /** 🔹 Actualizar el estado cuando cambian los inputs */
  const inputChangeValue=(event:ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;  
    setUsuarios({
      ...usuarios,
      [inputName]: inputValue
    }); 
  };

  /** 🔹 Guardar cambios */
  const guardar = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Usuarios/Editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarios),
      });

      if (!response.ok) throw new Error("Error al guardar");

      Swal.fire({
        title: "Éxito",
        text: "Usuario editado correctamente",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      });

      navigate("/usuarios/listausuarios");
    } catch (error) {
      Swal.fire("Error", "No se pudo editar el usuario", "error");
    }
  };

  /** 🔹 Regresar */
  const volver = () => navigate("/");

  if (cargando) {
    return (
      <Container className="mt-5 text-center">
        <h5>Cargando usuarios...</h5>
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
              <Label for="nombreUsuario">Nombre usuario</Label>
              <Input type="text" name="nombreUsuario" onChange={inputChangeValue} value={usuarios.nombreUsuario} />
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo</Label>
              <Input type="text" name="correo" onChange={inputChangeValue} value={usuarios.correo} />
            </FormGroup>

            <FormGroup>
              <Label for="codigoDepto">Nivel Prioridad</Label>
              <Input
                id="codigoDepto"
                type="text"
                name="codigoDepto"
                value={usuarios.codigoDepto}
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