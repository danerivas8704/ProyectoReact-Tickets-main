import { useEffect, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import { IDepartamento } from "../../Interfaces/IDepartamento"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function ListaDepartamentos() {
     const [departamentos, setDepartamentos] = useState<IDepartamento[]>([]);

     const obtenerDepartamentos = async () => {
          const response = await fetch(`${appsettings.apiUrl}Departamentos/Obtener`)
          if (response.ok) {
               const data = await response.json();
               setDepartamentos(data)
          }
     }

     useEffect(() => {
          obtenerDepartamentos()
     }, [])

     const Eliminar = (id: number) => {
          Swal.fire({
               title: "Estas seguro?",
               text: "Eliminar departamento!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Si, eliminar!"
          }).then(async (result) => {
               if (result.isConfirmed) {

                    const response = await fetch(`${appsettings.apiUrl}Departamentos/Eliminar/${id}`, { method: "DELETE" })
                    if (response.ok) await obtenerDepartamentos()
               }
          });
     }

     return (
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Lista de Departamentos</h4>
                         <hr />
                         <Link className="btn btn-success mb-3" to="/departamentos/nuevodepartamento" >Nuevo Departamento</Link>

                         <Table bordered>
                              <thead>
                                   <tr>
                                        <th>Codigo Depto</th>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                                                                                                   
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        departamentos.map((item) => (
                                             <tr key={item.codigoDepto}>
                                                  <td>{item.codigoDepto}</td>
                                                  <td>{item.nombreDepto}</td>
                                                  <td>{item.descripcionDepto}</td>
                                                                                                 
                                                  <td>
                                                       <Link className="btn btn-primary me-2" to={`../Departamentos/editardepartamentos/${item.codigoDepto}`} >Editar</Link>
                                                       <Button color="danger" onClick={() => { Eliminar(item.codigoDepto!) }}>
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