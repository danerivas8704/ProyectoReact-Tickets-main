import { ChangeEvent, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { IDepartamento } from "../../Interfaces/IDepartamento"


const initialIDepartamento = {  
  nombreDepto: "",
  descripcionDepto: ""
}


export function NuevoDepartamento(){
     const navigate=useNavigate();
     const [departamentos,setDepartamentos]=useState<IDepartamento>(initialIDepartamento);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setDepartamentos({
            ...departamentos,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Departamentos/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(departamentos)
           })
           if(response.ok){
                navigate("/departamentos/listadepartamentos")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar el departamento",
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
                         <h4>Nuevo Departamento</h4>
                         <hr/>
                         <Form>
                              <FormGroup>
                                   <Label>Nombre Departamento</Label>
                                   <Input type="text" name="nombreDepto" onChange={inputChangeValue} value={departamentos.nombreDepto} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Descripcion Departamento</Label>
                                   <Input type="text" name="descripcionDepto" onChange={inputChangeValue} value={departamentos.descripcionDepto} />
                              </FormGroup>
                                                           
                         </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
}