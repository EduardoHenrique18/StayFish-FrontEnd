import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
            email : this.email,
            password : this.password 
        };
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
            if(response.ok) {
                return response.json()
            }
            throw new Error("Login inválido...");
        })
        .then(result => {
            localStorage.setItem('token', result);
            this.props.history.push("/admin");
            return;
        })
        .catch(e => {
            this.setState({ message: e.message });
        }); 
    }

    render() {
        return (
            <div className="col-md-4">
                <Header title="Stay Fish" />
                <hr  className="my-3"/>
                {
                    this.state.message !== ''? (
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
                </Form>
            </div>
        );
    }
}