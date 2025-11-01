import { ChangeEvent, useState } from "react";
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
import { appsettings } from "../../settings/appsetings";

export function RecuperarPassword() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviarSolicitud = async () => {
    if (!usuario) {
      Swal.fire({
        title: "Campo requerido",
        text: "Por favor ingrese el usuario",
        icon: "warning",
      });
      return;
    }
    setEnviando(true);
    try {
      const response = await fetch(`${appsettings.apiUrl}Usuarios/Cambio`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:`usuario=${usuario}&password=${password}`,
      });      

      if (response.ok) {
        Swal.fire({
          title: "Solicitud actualizada",
          text: "Se ha realizado el cambio correctamente.",
          icon: "success",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró una cuenta con ese usuario.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo enviar la solicitud. Intenta nuevamente.",
        icon: "error",
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm="6" md="5" lg="4">
          <div className="text-center mb-4">
            <h4>Recuperar contraseña</h4>
            <hr />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <Form>
            <FormGroup>
              <Label for="nombreUsuario">Usuario</Label>
              <Input
                type="text"
                id="nombreUsuario"
                placeholder="usuario"
                value={usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsuario(e.target.value)
                }
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="******"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </FormGroup>


            <div className="text-center mt-4">
              <Button
                color="primary"
                className="me-4"
                onClick={enviarSolicitud}
                disabled={enviando}>
                {enviando ? "Actualizando..." : "Actualizar"}
              </Button>
              <Button color="secondary" onClick={() => navigate("/login/ingreso")}>
                Volver al login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
