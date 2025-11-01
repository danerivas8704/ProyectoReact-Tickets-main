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
import type { ICliente } from "../../Interfaces/ICliente"
import type { ICategoria } from "../../Interfaces/ICategoria"

const initialICategoria: ICategoria = {
  codigoCategoria: 0,
  nombreCategoria: "",
  descripcionCategoria: ""
};

export function EditarCategoria() {
  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<ICategoria>(initialICategoria);
  const [cargando, setCargando] = useState<boolean>(true);
  const navigate = useNavigate();

  /** 🔹 Cargar cliente al montar el componente */
  useEffect(() => {
    const obtenerCategoria = async () => {
      try {
        const response = await fetch(`${appsettings.apiUrl}Categorias/ObtenerCodigo/${id}`);
        if (!response.ok) throw new Error("Error al obtener la categoria");
        const data: ICategoria = await response.json();
        if (Array.isArray(data) && data.length > 0) {
        setCategorias(data[0]);
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar la categoria", "error");
      } finally {
        setCargando(false);
      }
    };

    obtenerCategoria();
  }, []);

  /** 🔹 Actualizar el estado cuando cambian los inputs */
  const inputChangeValue=(event:ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;  
    setCategorias({
      ...categorias,
      [inputName]: inputValue
    }); 
  };

  /** 🔹 Guardar cambios */
  const guardar = async () => {
    try {
      const response = await fetch(`${appsettings.apiUrl}Categorias/Editar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categorias),
      });

      if (!response.ok) throw new Error("Error al guardar");

      Swal.fire({
        title: "Éxito",
        text: "Categoria editada correctamente",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      });

      navigate("/categorias/listacategoria");
    } catch (error) {
      Swal.fire("Error", "No se pudo editar la categoria", "error");
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
          <h4>Editar Categoria</h4>
          <hr />
          <Form>
            <FormGroup>
              <Label for="nombreCategoria">Nombre</Label>
              <Input type="text" name="nombreCategoria" onChange={inputChangeValue} value={categorias.nombreCategoria} />
            </FormGroup>

            <FormGroup>
              <Label for="descripcionCategoria">Apellidos</Label>
              <Input type="text" name="descripcionCategoria" onChange={inputChangeValue} value={categorias.descripcionCategoria} />
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