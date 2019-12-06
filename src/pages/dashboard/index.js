import React, { Component } from 'react';
import './style.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem/*, Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter*/  } from 'reactstrap';


export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
            dropdownOpen: false
        }
    }


    toggle = () => this.setState({ dropdownOpen:!this.state.dropdownOpen });    
     


    render() {
        return (
            <div className= "wrapper">
                               
                    <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle} className= "clicar">
                    <DropdownToggle caret color="primary">
                        +
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem block onClick={this.toggleModal}>Pagamento</DropdownItem>
                        <DropdownItem block onClick={this.toggleModal2}>=Fatura</DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                    <Modal isOpen={this.state.modalIsOpen}>
                    <ModalHeader toggle={this.toggleModal.bind(this)}>
                        Insira o Pagamento
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="description">Descrição</Label>
                                <Input type="text" id="descricao" onChange={e => this.description = e.target.value} placeholder="Informe a descrição" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="value">Valor</Label>
                                <Input type="text" id="valor" onChange={e => this.value = e.target.value} placeholder="Informe o valor" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="paymentDate">Data de nascimento</Label>
                                <Input type="date" id="dtPagamento" onChange={e => this.paymentDate = e.target.value} placeholder="Informe a data do Pagamento" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input type="text" id="status" onChange={e => this.status = e.target.value} placeholder="Informe o  status" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="note">Observação</Label>
                                <Input type="text" id="observacao" onChange={e => this.note = e.target.value} placeholder="Informe sua Observação" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Observação</Label>
                                <Input type="text" id="categoria" onChange={e => this.category = e.target.value} placeholder="Informe a categoria" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancelar</Button>
                        <Button color="primary" onClick={this.createPayment}>Cadastrar Pagamento</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modal2IsOpen}>
                    <ModalHeader toggle={this.toggleModal2.bind(this)}>
                        Insira a Fatura
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="description">Descrição</Label>
                                <Input type="text" id="descricao" onChange={e => this.description = e.target.value} placeholder="Informe a descrição" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="value">Valor</Label>
                                <Input type="text" id="valor" onChange={e => this.value = e.target.value} placeholder="Informe o valor" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="invoiceDate">Data de nascimento</Label>
                                <Input type="date" id="dtPagamento" onChange={e => this.invoiceDate = e.target.value} placeholder="Informe a data do Pagamento" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="note">Observação</Label>
                                <Input type="text" id="observacao" onChange={e => this.note = e.target.value} placeholder="Informe sua Observação" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Observação</Label>
                                <Input type="text" id="categoria" onChange={e => this.category = e.target.value} placeholder="Informe a categoria" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal2.bind(this)}>Cancelar</Button>
                        <Button color="primary" onClick={this.createInvoice}>Cadastrar Fatura</Button>
                    </ModalFooter>
                </Modal>

            </div>
            
        );
    }
}