import { ChangeEvent, useState } from "react"
import { appsettings } from "../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { ICliente } from "../Interfaces/ICliente"


const initialICliente = {  
  nombreCliente: "",
  correoCliente: "",  
  apellidoCliente: "",
  direccionCliente: "",  
  codigoEstado: 1
}


export function NuevoCliente(){
     const navigate=useNavigate();
     const [cliente,setCliente]=useState<ICliente>(initialICliente);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setCliente({
            ...cliente,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Clientes/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
           })
           if(response.ok){
                navigate("/")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar el empleado",
                     icon: "warning"
                   });
         }
     }

     const volver = () =>{
          navigate("/")
     }

    return(
         <Container className="mt-5">
               <Row>
                    <Col sm={{size:8, offset:2}}>
                         <h4>Nuevo Cliente</h4>
                         <hr/>
                         <Form>
                              <FormGroup>
                                   <Label>Nombre</Label>
                                   <Input type="text" name="nombreCliente" onChange={inputChangeValue} value={cliente.nombreCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Apellidos</Label>
                                   <Input type="text" name="apellidoCliente" onChange={inputChangeValue} value={cliente.apellidoCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Correo</Label>
                                   <Input type="text" name="correoCliente" onChange={inputChangeValue} value={cliente.correoCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>direccion</Label>
                                   <Input type="text" name="direccionCliente" onChange={inputChangeValue} value={cliente.direccionCliente} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Estado</Label>
                                   <Input type="number" name="codigoEstado" onChange={inputChangeValue} value={cliente.codigoEstado} />
                              </FormGroup>
                         </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
}