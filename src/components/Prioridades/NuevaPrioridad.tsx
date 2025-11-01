import { ChangeEvent, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { IPrioridad } from "../../Interfaces/IPrioridad"


const initialIPrioridad = {  
  nombrePrioridad: "",
  descripcionPrioridad: "",  
  nivelPrioridad : 0,
  codigoEstado: 1,
  fechaCreacion: new Date(),
  fechaModificacion: new Date()
}


export function NuevaPrioridad(){
     const navigate=useNavigate();
     const [prioridad,setPrioridad]=useState<IPrioridad>(initialIPrioridad);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setPrioridad({
            ...prioridad,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Prioridades/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(prioridad)
           })
           if(response.ok){
                navigate("/prioridades/listaprioridades")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar la prioridad",
                     icon: "warning"
                   });
         }
     }

     const volver = () =>{
          navigate("/prioridades/listaprioridades")
     }

    return(
         <Container className="mt-5">
               <Row>
                    <Col sm={{size:8, offset:2}}>
                         <h4>Nueva prioridad</h4>
                         <hr/>
                         <Form>
                              <FormGroup>
                                   <Label>Nombre Prioridad</Label>
                                   <Input type="text" name="nombrePrioridad" onChange={inputChangeValue} value={prioridad.nombrePrioridad} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Descripcion Prioridad</Label>
                                   <Input type="text" name="descripcionPrioridad" onChange={inputChangeValue} value={prioridad.descripcionPrioridad} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Nivel Prioridad</Label>
                                   <Input type="text" name="nivelPrioridad" onChange={inputChangeValue} value={prioridad.nivelPrioridad} />
                              </FormGroup>                              
                         </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
} 