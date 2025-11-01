import { useEffect, useState } from "react"
import { appsettings } from "../../settings/appsetings"
import { Link } from "react-router"
import Swal from "sweetalert2"
import { ICategoria } from "../../Interfaces/ICategoria"
import { Container, Row, Col, Table, Button } from "reactstrap"

export function ListaCategoria() {
     const [categorias, setCategorias] = useState<ICategoria[]>([]);

     const obtenerCategorias = async () => {
          const response = await fetch(`${appsettings.apiUrl}Categorias/Obtener`)
          if (response.ok) {
               const data = await response.json();
               setCategorias(data)
          }
     }

     useEffect(() => {
          obtenerCategorias()
     }, [])

     const Eliminar = (id: number) => {
          Swal.fire({
               title: "Estas seguro?",
               text: "Eliminar categoria!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Si, eliminar!"
          }).then(async (result) => {
               if (result.isConfirmed) {

                    const response = await fetch(`${appsettings.apiUrl}Categorias/Eliminar/${id}`, { method: "DELETE" })
                    if (response.ok) await obtenerCategorias()
               }
          });
     }

     return (
          <Container className="mt-5">
               <Row>
                    <Col sm={{ size: 8, offset: 2 }}>
                         <h4>Lista de categorias</h4>
                         <hr />
                         <Link className="btn btn-success mb-3" to="/categorias/nuevacategoria" >Nueva categoria</Link>

                         <Table bordered>
                              <thead>
                                   <tr>
                                        <th>Codigo</th>
                                        <th>Nombre Categoria</th>
                                        <th>Descripcion Categoria</th>
                                        <th>Acciones</th>                                        
                                   </tr>
                              </thead>
                              <tbody>
                                   {
                                        categorias.map((item) => (
                                             <tr key={item.codigoCategoria}>
                                                  <td>{item.codigoCategoria}</td>
                                                  <td>{item.nombreCategoria}</td>
                                                  <td>{item.descripcionCategoria}</td>                                                                                                
                                                  <td>
                                                       <Link className="btn btn-primary me-2" to={`../Categorias/editarcategoria/${item.codigoCategoria}`} >Editar</Link>
                                                       <Button color="danger" onClick={() => { Eliminar(item.codigoCategoria!) }}>
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