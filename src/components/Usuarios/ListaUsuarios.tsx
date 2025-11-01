import { useEffect, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import type { IUsuario } from "../../Interfaces/IUsuario"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function ListaUsuarios() {
     const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

     const obtenerUsuarios = async () => {
          const response = await fetch(`${appsettings.apiUrl}Usuarios/Obtener`)
          if (response.ok) {
               const data = await response.json();
               setUsuarios(data)
          }
     }

     useEffect(() => {
          obtenerUsuarios()
     }, [])

     const Eliminar = (id: number) => {
          Swal.fire({
               title: "Estas seguro?",
               text: "Eliminar usuario!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Si, eliminar!"
          }).then(async (result) => {
               if (result.isConfirmed) {
                    const response = await fetch(`${appsettings.apiUrl}Usuarios/Eliminar/${id}`, { method: "DELETE" })
                    if (response.ok) await obtenerUsuarios()
               }
          });
     }

     return (
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Lista de Usuarios</h4>
                         <hr />
                         <Link className="btn btn-success mb-3" to="/usuarios/nuevousuario" >Nuevo Usuario</Link>

                         <Table bordered>
                              <thead>
                                   <tr>
                                        <th>Nombre</th>
                                        
                                        <th>Correo</th>
                                        <th>Departamento</th>  
                                        <th>Acciones</th>                                      
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        usuarios.map((item) => (
                                             <tr key={item.codigoUsuario}>
                                                  <td>{item.nombreUsuario}</td> 
                                                  
                                                  <td>{item.correo}</td>
                                                  <td>{item.codigoDepto}</td>                                                  
                                                  <td>
                                                       <Link className="btn btn-primary me-2" to={`../Usuarios/editarusuarios/${item.codigoUsuario}`} >Editar</Link>
                                                       <Button color="danger" onClick={() => { Eliminar(item.codigoUsuario!) }}>
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