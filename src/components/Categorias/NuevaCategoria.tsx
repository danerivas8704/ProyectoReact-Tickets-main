import { ChangeEvent, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { useNavigate } from "react-router"
import  Swal  from "sweetalert2"
import { Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Button, Label,Input} from "reactstrap"    
import type { ICategoria } from "../../Interfaces/ICategoria"


const initialICategoria = {  
  nombreCategoria: "",
  descripcionCategoria: "",    
  codigoEstado: 1
}


export function NuevaCategoria(){
     const navigate=useNavigate();
     const [categorias,setCategorias]=useState<ICategoria>(initialICategoria);
    const inputChangeValue=(event:ChangeEvent<HTMLInputElement>)=>{
        const inputName = event.target.name;
        const inputValue = event.target.value;
        setCategorias({
            ...categorias,
            [inputName]:inputValue})
    }

    const guardar = async () =>{
           const response = await fetch(`${appsettings.apiUrl}Categorias/Crear`,{
                method: 'POST',
                headers:{
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify(categorias)
           })
           if(response.ok){
                navigate("/categorias/listacategoria")
           }else{
                Swal.fire({
                     title: "Error!",
                     text: "No se pudo guardar la categoria",
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
                         <h4>Nueva Categoria</h4>
                         <hr/>
                         <Form>
                              <FormGroup>
                                   <Label>Nombre</Label>
                                   <Input type="text" name="nombreCategoria" onChange={inputChangeValue} value={categorias.nombreCategoria} />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Descripcion Catgoria</Label>
                                   <Input type="text" name="descripcionCategoria" onChange={inputChangeValue} value={categorias.descripcionCategoria} />
                              </FormGroup>                        
                         </Form>
                         <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                         <Button color="secondary"  onClick={volver}>Volver</Button>
                    </Col>
               </Row>
         </Container>
     )
}