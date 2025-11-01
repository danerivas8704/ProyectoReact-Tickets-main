import { useEffect, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import type { IPrioridad } from "../../Interfaces/IPrioridad"
import { Container, Row, Col, Table, Button } from "reactstrap"


export function ListaPrioridades() {
     const [prioridades, setPrioridades] = useState<IPrioridad[]>([]);

     const obtenerPrioridades = async () => {
          const response = await fetch(`${appsettings.apiUrl}Prioridades/Obtener`)
          if (response.ok) {
               const data = await response.json();
               setPrioridades(data)
          }
     }

     useEffect(() => {
          obtenerPrioridades()
     }, [])

     const Eliminar = (id: number) => {
          Swal.fire({
               title: "Estas seguro?",
               text: "Eliminar prioridad!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Si, eliminar!"
          }).then(async (result) => {
               if (result.isConfirmed) {
                    const response = await fetch(`${appsettings.apiUrl}Prioridades/Eliminar/${id}`, { method: "DELETE" })
                    if (response.ok) await obtenerPrioridades()
               }
          });
     }

     return (
          
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Lista de prioridades</h4>
                         <hr />
                         <Link className="btn btn-success mb-3" to="/prioridades/nuevaprioridad" >Nueva Prioridad</Link>

                         <Table bordered>
                              <thead>
                                   <tr>
                                        <th>Codigo Prioridad</th>
                                        <th>Nombre Prioridad</th>
                                        <th>Descripcion Prioridad</th>
                                        <th>Nivel Prioridad</th>                                        
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        prioridades.map((item) => (
                                             <tr key={item.codigoPrioridad}>
                                                  <td>{item.nombrePrioridad}</td>
                                                  <td>{item.descripcionPrioridad}</td>
                                                  <td>{item.nivelPrioridad}</td>                                                  
                                                  <td>
                                                       <Link className="btn btn-primary me-2" to={`../Prioridades/editarprioridades/${item.codigoPrioridad}`} >Editar</Link>
                                                       <Button color="danger" onClick={() => { Eliminar(item.codigoPrioridad!) }}>
                                                            Eliminar
                                                       </Button>
                                                  </td>
                                             </tr>
                                        ))
                                   }
                              </tbody>
                         </Table>
                    </Col>
               </Row>
          </Container>
     )
}