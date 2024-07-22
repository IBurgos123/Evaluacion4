import React from "react";
import "./style1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Form,} from "reactstrap";


const data = [
    { id: 1, nombres: "Ignacio Burgos", correo: "i.burgos@gmail.com" , password: "asdf1234", cumpleaños: "30-05-2000" , mayoredad: "si" },
    { id: 2, nombres: "Jose Rodriguez", correo: "j.rodriguez@gmail.com", password: "zxcv4567", cumpleaños:  "22-09-2000", mayoredad: "si" },
    { id: 3, nombres: "Kevin Florez", correo: "k.florez@gmail.com", password: "qwer7894", cumpleaños: "11-04-2001", mayoredad: "no" },
]

class App extends React.Component {
    state = {
        data: data,
        Actualizar: false,
        Insrt: false,
        form: {
            id: "",
            nombres: "",
            correo: "",
            password: "",
            cumpleaños: "",
            mayoredad: "",
        },
    };

    abrirModal = (dato) => {
        this.setState({
            form: dato,
            Actualizar: true,
        });
    };

    cerrarModal = () => {
        this.setState({ Actualizar: false });
    };

    abrirInsrt = () => {
        this.setState({ Insrt: true});
    };

    cerrarInsrt = () => {
        this.setState({ Insrt: false });
    };

    edit = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
                arreglo[contador].nombres = dato.nombres;
                arreglo[contador].correo = dato.correo;
                arreglo[contador].password = dato.password;
                arreglo[contador].cumpleaños = dato.cumpleaños;
                arreglo[contador].mayoredad = dato.mayoredad;
            }
            contador ++; 
        });
        this.setState({ data: arreglo, Actualizar: false});
    };

    delete = (dato) => {
        var opcion = window.confirm("Seguro quieres eliminar a este usuario"+dato.id);
        if (opcion == true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id == registro.id){
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({data: arreglo, Actualizar: false});
        }
    };

    insert = () => {
        var usuarioNuevo = {...this.state.form};
        usuarioNuevo.id = this.state.data.length+1;
        var lista = this.state.data;
        lista.push(usuarioNuevo);
        this.setState({ Insrt: false, data: lista });
    }

    change = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    }

    render() {

        return (
            <>
            
            <Container>
                <br />
                <Button color="success" onClick={ () => this.abrirInsrt()}>Agregar usuario</Button>
                <br />
                <br />
                <Table>

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>nombres</th>
                            <th>correo</th>
                            <th>password</th>
                            <th>cumpleaños</th>
                            <th>mayor de edad</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key = {dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombres}</td>
                                <td>{dato.correo}</td>
                                <td>{dato.password}</td>
                                <td>{dato.cumpleaños}</td>
                                <td>{dato.mayoredad}</td>
                                <td>
                                    <Button color="warning" onClick={ () => this.abrirModal(dato)}>Editar</Button>{" "}
                                    <Button color="danger" onClick={ () => this.delete(dato)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            {/*Ventana modal para editar Usuario*/}             
            <Modal isOpen = {this.state.Actualizar}>
                <ModalHeader>
                    <div><h4>Editar Usuario</h4></div>
                </ModalHeader>

                <ModalBody>

                    <FormGroup>
                        <label>Id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.form.id}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="nombres">Nombres:</label>
                        <input type="text" id="nombres" name="nombres" onChange={this.change} value={this.state.form.nombres}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="correo">Correo:</label>
                        <input type="email" id="correo" name="correo" onChange={this.change} value={this.state.form.correo}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" name="password" onChange={this.change} value={this.state.form.password}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="cumpleaños">Cumpleaños:</label>
                        <input type="date" id="cumpleaños" name="cumpleaños" onChange={this.change} value={this.state.form.cumpleaños}></input>
                    </FormGroup>
                    
                    <FormGroup>
                        <input type="checkbox" id="mayoredad" name="mayoredad" onChange={this.change} value={this.state.form.mayoredad}></input>
                        <label for="mayoredad">Si</label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={() => this.edit(this.state.form)}>Editar</Button>
                    <Button color="danger" onClick={() => this.cerrarModal()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen = {this.state.Insrt}>
                <ModalHeader>
                    <div><h3>Agergar Usuario</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length+1}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="nombres">Nombres:</label>
                        <input type="text" id="nombres" name="nombres" onChange={this.change} value={this.state.form.nombres}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="correo">Correo:</label>
                        <input type="email" id="correo" name="correo" onChange={this.change} value={this.state.form.correo}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" name="password" onChange={this.change} value={this.state.form.password}></input>
                    </FormGroup>

                    <FormGroup>
                        <label for="cumpleaños">Cumpleaños:</label>
                        <input type="date" id="cumpleaños" name="cumpleaños" onChange={this.change} value={this.state.form.cumpleaños}></input>
                    </FormGroup>

                    <FormGroup>
                        <input type="checkbox" id="mayoredad" name="mayoredad" onChange={this.change} value={this.state.form.mayoredad}></input>
                        <label for="mayoredad">si</label>
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={() => this.insert()}>Agregar</Button>
                    <Button color="danger" onClick={() => this.cerrarInsrt()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </>
        );
    }
}

export default App;