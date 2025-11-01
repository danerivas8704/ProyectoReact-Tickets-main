import { ChangeEvent, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { IEstados } from "../../Interfaces/IEstados"


const initialIEstados = {  
  nombreEstado: "",
  descripcionEstado: ""
}


export function NuevoEstado(){
     const navigate=useNavigate();
     const [estados,setEstados]=useState<IEstados>(initialIEstados);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setEstados({
            ...estados,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Estados/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(estados)
           })
           if(response.ok){
                navigate("/Estados/listaestados")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar el estado",
                     icon: "warning"
                   });
         }
     }

     const volver = () =>{
          navigate("estados/listaestados")
     }

    return(
         <Container className="mt-5">
               <Row>
                    <Col sm={{size:8, offset:2}}>
                         <h4>Nuevo estado</h4>
                         <hr/>
                         <Form>
                              <FormGroup>
                                   <Label>Nombre Estado</Label>
                                   <Input type="text" name="nombreEstado" onChange={inputChangeValue} value={estados.nombreEstado} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Descripcion Estado</Label>
                                   <Input type="text" name="descripcionEstado" onChange={inputChangeValue} value={estados.descripcionEstado} />
                              </FormGroup>                                                         
                         </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
} 