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

interface ILogin {
  usuario: string;
  clave: string;
}

const initialLogin: ILogin = {
  usuario: "",
  clave: "",
};

export function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<ILogin>(initialLogin);

  const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const iniciarSesion = async () => {
    if (!login.usuario || !login.clave) {
      Swal.fire({
        title: "Campos requeridos",
        text: "Por favor ingresa tu usuario y contraseña.",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await fetch(`${appsettings.apiAcceso}Acceso/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (response.ok) {
        const data = await response.json();

        // Guardar token o usuario en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", data.data.usuario);
        

        navigate("/dashboard/dashboard");
        setTimeout(() => {
          window.location.reload();
        }, 300);
        alert(localStorage.getItem("token"));
        alert(localStorage.getItem("usuario"));

      } else {
        Swal.fire({
          title: "Error",
          text: "Correo o contraseña incorrectos.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error de conexión",
        text: "No se pudo conectar al servidor.",
        icon: "error",
      });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm="6" md="5" lg="4">
          <div className="text-center mb-4">
            <h4>Iniciar Sesión</h4>
            <hr />
          </div>

          <Form>
            <FormGroup>
              <Label for="usuario">Usuario</Label>
              <Input
                type="text"
                name="usuario"
                id="usuario"
                
                onChange={inputChangeValue}
                value={login.usuario}
              />
            </FormGroup>

            <FormGroup>
              <Label for="clave">Password</Label>
              <Input
                type="password"
                name="clave"
                id="clave"
                placeholder="********"
                onChange={inputChangeValue}
                value={login.clave}
              />
            </FormGroup>

            <div className="text-end mb-3">
              <Button color="link" onClick={() => navigate("/login/recuperarpassword")}>
                ¿Olvidaste tu contraseña?
              </Button>
            </div>

            <div className="text-center mt-4">
              <Button color="primary" className="me-3" onClick={iniciarSesion}>
                Ingresar
              </Button>
              <Button color="secondary" onClick={() => navigate("/")}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
