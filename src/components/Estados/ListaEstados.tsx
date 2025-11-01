import { useEffect, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import type { IEstados } from "../../Interfaces/IEstados"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function ListaEstados() {
     const [estados, setEstados] = useState<IEstados[]>([]);

     const obtenerEstados = async () => {
          const response = await fetch(`${appsettings.apiUrl}Estados/Obtener`)
          if (response.ok) {
               const data = await response.json();
               setEstados(data)
          }
     }

     useEffect(() => {
          obtenerEstados()
     }, [])

     const Eliminar = (id: number) => {
          Swal.fire({
               title: "Estas seguro?",
               text: "Eliminar estado!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Si, eliminar!"
          }).then(async (result) => {
               if (result.isConfirmed) {

                    const response = await fetch(`${appsettings.apiUrl}Estados/Eliminar/${id}`, { method: "DELETE" })
                    if (response.ok) await obtenerEstados()
               }
          });
     }

     return (
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Lista de estados</h4>
                         <hr />
                         <Link className="btn btn-success mb-3" to="/estados/nuevoestado" >Nuevo estado</Link>

                         <Table bordered>
                              <thead>
                                   <tr>
                                        <th>Codigo Estado</th>
                                        <th>Nombre Estado</th>
                                        <th>Descripcion Estado</th>
                                        <th>Acciones</th>                                                    
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        estados.map((item) => (
                                             <tr key={item.codigoEstado}>
                                                  <td>{item.codigoEstado}</td>                                                 
                                                  <td>{item.nombreEstado}</td>
                                                  <td>{item.descripcionEstado}</td>                                                                                                    
                                                  <td>
                                                       <Link className="btn btn-primary me-2" to={`../estados/editarestados/${item.codigoEstado}`} >Editar</Link>
                                                       <Button color="danger" onClick={() => { Eliminar(item.codigoEstado!) }}>
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