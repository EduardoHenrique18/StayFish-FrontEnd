import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Header from '../../components/Header';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: this.props.location.state ? this.props.location.state.message : '',
            email: this.email,
            password: this.password,
            name: this.name,
            bornDate: this.bornDate,
            modalIsOpen: false
        };
    }

    toggleModal = () => {
        this.setState({ modalIsOpen: !this.state.modalIsOpen });
    };

    createUser = () => {
        const data = { email: this.email, password: this.password, bornDate: this.bornDate, name: this.name };
        console.log(data)
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };

        fetch('http://localhost:8080/add', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .catch(e => {
                this.setState({ message: e.message });
            });
    }

    signIn = () => {
        const data = { email: this.email, password: this.password };
        console.log(data)
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        };
        
        fetch('http://localhost:8080/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Login inválido...");
            })
            .then(result => {
                if (result.message === undefined) {
                localStorage.setItem('token', result);
                this.props.history.push("/admin");
                return;
                }else {
                    throw new Error(result.message);
                }
            })
            .catch(e => {
                this.setState({ message: e.message });
            });
    }

    render() {
        return (
            <div className="col-md-4">
                <Header title="Stay Fish" />
                <hr className="my-3" />
                {
                    this.state.message !== '' ? (
                        <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password"
                            id="password"
                            onChange={e => this.password = e.target.value}
                            onKeyDown={event => {
                                if (event.key === 'Enter') {
                                    this.signIn()
                                }
                            }}
                            placeholder="Informe a senha"
                        />
                    </FormGroup>
                    <Button color="primary" block onClick={this.signIn}> Entrar </Button>
                    <Button color="link" block onClick={this.toggleModal}>Cadastre-se!</Button>
                </Form>
                <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>
                        Criar sua conta
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input type="text" id="nomeCadastro" onChange={e => this.name = e.target.value} placeholder="Informe seu nome" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" id="emailCadastro" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="bornDate">Data de nascimento</Label>
                                <Input type="date" id="dtNascimentoCadastro" onChange={e => this.bornDate = e.target.value} placeholder="Informe sua data de nascimento" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Senha</Label>
                                <Input type="text" id="passwordCadastro" onChange={e => this.password = e.target.value} placeholder="Informe sua senha" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancelar</Button>
                        <Button color="primary" onClick={this.createUser}>Cadastrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}