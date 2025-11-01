import { ChangeEvent, useEffect, useState } from "react";
import { appsettings } from "../../settings/appsetings";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import type { IUsuario } from "../../Interfaces/IUsuario";
import type { IEstados } from "../../Interfaces/IEstados";

const initialIUsuario: IUsuario = {
  nombreUsuario: "",
  apellidoUsuario: "",
  correo: "",
  direccion: "",
  codigoEstado: 0,
  codigoDepto: 0,
  password: "",
  fechaCreacion: new Date(),
  fechaModificacion: new Date()
};

export function NuevoUsuario() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<IUsuario>(initialIUsuario);
  const [estados, setEstados] = useState<IEstados[]>([]);

  // 🔹 Cargar las prioridades desde la API
  useEffect(() => {
    const obtenerEstados = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Usuarios/ObtenerC`);
        if (response.ok) {
          const data = await response.json();
          setEstados(data);
        } else {
          Swal.fire({
            title: "Error!",
            text: "No se pudieron cargar las prioridades",
            icon: "error",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Error al obtener las prioridades",
          icon: "error",
        });
      }
    };
    obtenerEstados();
  }, []);

  const inputChangeValue = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setUsuarios({
      ...usuarios,
      [inputName]: inputValue,
    });
  };

  const guardar = async () => {
    const response = await fetch(`${appsettings.apiUrl}Usuarios/Crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarios),
    });
    if (response.ok) {
      navigate("/Usuarios/listausuarios");
    } else {
      Swal.fire({
        title: "Error!",
        text: "No se pudo guardar el usuario",
        icon: "warning",
      });
    }
  };

  const volver = () => {
    navigate("/usuarios/listausuarios");
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={{ size: 8, offset: 2 }}>
          <h4>Nuevo Usuario</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="nombreUsuario">Nombre Usuario</Label>
              <Input
                type="text"
                name="nombreUsuario"
                onChange={inputChangeValue}
                value={usuarios.nombreUsuario}
              />
            </FormGroup>

            <FormGroup>
              <Label for="apellidoUsuario">Apellidos Usuario</Label>
              <Input
                type="text"
                name="apellidoUsuario"
                onChange={inputChangeValue}
                value={usuarios.apellidoUsuario}
              />
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo</Label>
              <Input
                id="correo"
                type="text"
                name="correo"
                value={usuarios.correo}
                onChange={inputChangeValue}
              />
            </FormGroup>

            <FormGroup>
              <Label for="direccion">Dirección</Label>
              <Input
                type="text"
                name="direccion"
                onChange={inputChangeValue}
                value={usuarios.direccion}
              />
            </FormGroup>

            <FormGroup>
              <Label for="codigoDepto">Departamento</Label>
              <Input
                type="text"
                name="codigoDepto"
                onChange={inputChangeValue}
                value={usuarios.codigoDepto}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                onChange={inputChangeValue}
                value={usuarios.password}
              />
            </FormGroup>

            {/* 🔹 Nuevo campo SELECT de prioridad */}
            <FormGroup>
              <Label for="codigoEstado">Estado</Label>
              <Input
                type="select"
                name="codigoEstado"
                value={usuarios.codigoEstado}
                onChange={inputChangeValue}
              >
                <option value="">-- Seleccione un estado --</option>
                {estados.map((p) => (
                  <option key={p.codigoEstado} value={p.codigoEstado}>
                    {p.nombreEstado}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>

          <Button color="primary" className="me-4" onClick={guardar}>
            Guardar
          </Button>
          <Button color="secondary" onClick={volver}>
            Volver
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
