/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
  Table,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';

import './style.css';

export default class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      setCollapsed: false,
      collapsed: false,
      numberMonth: 0,
      month: "",
      year: 0,
      payment: [],
      money: [],
      isOpen: false,
      tableAttributes: [],
      balance: 0,
      dropdownOpen: false,
      modalMoneyIsOpen: false,
      modalPaymentIsOpen: false,
      createPayment: {
        value: 0,
        description: "",
        date: "",
        status: 0,
        observation: "",
        category: ""
      },
      createMoney: {
        value: 0,
        description: "",
        date: "",
        observation: "",
        category: ""
      }
    }
  }

  date = {
    "months": [
      {
        "number": "01",
        "month": "jan"
      },
      {
        "number": "02",
        "month": "fev"
      },
      {
        "number": "03",
        "month": "mar"
      },
      {
        "number": "04",
        "month": "abr"
      },
      {
        "number": "05",
        "month": "mai"
      },
      {
        "number": "06",
        "month": "jun"
      },
      {
        "number": "07",
        "month": "jul"
      },
      {
        "number": "08",
        "month": "ago"
      },
      {
        "number": "09",
        "month": "set"
      },
      {
        "number": "10",
        "month": "out"
      },
      {
        "number": "11",
        "month": "nov"
      },
      {
        "number": "12",
        "month": "dez"
      }
    ]
  };

  createPayment = () => {
    const data = {
      value: this.state.createPayment.value, description: this.state.createPayment.description, date: this.state.createPayment.date,
      status: this.state.createPayment.status, observation: this.state.createPayment.observation, idUser: this.state.user._id, category: this.state.createPayment.category
    };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/addPayment', requestInfo)
      .then(async response => {
        if (response.ok) {
          await this.findPayment();
          await this.addTableAttributes();
          await this.findBalance();
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  createMoney = () => {
    const data = {
      value: this.state.createMoney.value, description: this.state.createMoney.description, date: this.state.createMoney.date,
      observation: this.state.createMoney.observation, idUser: this.state.user._id, category: this.state.createMoney.category
    };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/addMoney', requestInfo)
      .then(async response => {
        if (response.ok) {
          await this.findMoney();
          await this.addTableAttributes();
          await this.findBalance();
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  findTotalMoney = () => {
    const data = { idUser: this.state.user._id };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/balance', requestInfo)
      .then(async response => {
        if (response.ok) {
          let balance = await response.json();
          await this.setState({ balance: balance.sum })
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  };

  async componentDidMount() {
    await this.setState({ user: JSON.parse(localStorage.getItem('token')) });
    var data = new Date();
    const numberMonth = await data.getMonth() + 1;
    const numberYear = await data.getFullYear();
    await this.setState({ year: numberYear })
    await this.setState({ numberMonth: numberMonth }, () => {
      this.date.months.map(async result => {
        if (result.number.toString() === this.state.numberMonth.toString()) {
          await this.setState({ month: result.month })
        }
      })
    })
    await this.findPayment();
    await this.findMoney();
    this.addTableAttributes();
    await this.findTotalMoney();
  };

  findBalance = () => {
    const data = { idUser: this.state.user._id};
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/balance', requestInfo)
      .then(async response => {
        if (response.ok) {
          let balance = await response.json();
          await this.setState({ balance: balance.sum })
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  nextMonth = async () => {
    let numberMonth = this.state.numberMonth;
    if (numberMonth.toString() === "12") {
      await this.setState({ numberMonth: 1 });
      this.date.months.map(async result => {
        if (result.number.toString() === "1") {
          await this.setState({ month: result.month })
        }
      })
      await this.setState({ year: this.state.year + 1 })
    } else {
      let nextMonth = numberMonth + 1;
      await this.setState({ numberMonth: nextMonth });
      this.date.months.map(async result => {
        if (result.number.toString() === nextMonth.toString()) {
          await this.setState({ month: result.month })
        }
      })
    }
    await this.findPayment();
    await this.findMoney();
    await this.addTableAttributes();
  };

  previousMonth = async () => {
    let numberMonth = this.state.numberMonth;
    if (numberMonth.toString() === "1") {
      await this.setState({ numberMonth: 12 })
      this.date.months.map(async result => {
        if (result.number.toString() === "12") {
          await this.setState({ month: result.month })
        }
      })
      await this.setState({ year: this.state.year - 1 })
    } else {
      let previousMonth = numberMonth - 1;
      await this.setState({ numberMonth: previousMonth })
      this.date.months.map(async result => {
        if (result.number.toString() === previousMonth.toString()) {
          await this.setState({ month: result.month })
        }
      })
    }
    await this.findPayment();
    await this.findMoney();
    await this.addTableAttributes();
  };

  findPayment = () => {
    const date = this.state.year + "-" + this.state.numberMonth;
    const data = { idUser: this.state.user._id, date: date };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/searchPaymentByDate', requestInfo)
      .then(async response => {
        if (response.ok) {
          let payment = await response.json();
          await this.setState({ payment: payment })
        }
        this.addTableAttributes();
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  findMoney = () => {
    const date = this.state.year + "-" + this.state.numberMonth;
    const data = { idUser: this.state.user._id, date: date };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/searchMoneyByDate', requestInfo)
      .then(async response => {
        if (response.ok) {
          let money = await response.json();
          await this.setState({ money: money })
        }
        this.addTableAttributes();
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  addTableAttributes = async () => {
    let attributes = [];
    await this.state.payment.map(result => {
      return attributes.push(result);
    });
    await this.state.money.map(result => {
      return attributes.push(result);
    });
    this.setState({ tableAttributes: attributes })
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  togglePaymentModal = () => {
    this.setState({ modalPaymentIsOpen: !this.state.modalPaymentIsOpen });
  };

  toggleMoneyModal = () => {
    this.setState({ modalMoneyIsOpen: !this.state.modalMoneyIsOpen });
  };

  createAndBindPayment = async () => {
    await this.createPayment();
    this.togglePaymentModal();
  }

  createAndBindMoney = async () => {
    await this.createMoney();
    this.toggleMoneyModal();
  }

  toggleNavBar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="container">
        <div className="float-left fixed-top">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Stay Fish</NavbarBrand>
            <NavbarBrand>{this.state.balance}</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavBar} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/"></NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Logout
      </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem />
                    <DropdownItem>
                      Sair
        </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <div className="text-center">
          <button className="btn btn-link" type="button" color="link" onClick={this.previousMonth}><i className="material-icons md-48 local">
            keyboard_arrow_left
            </i></button>
          <Label>{this.state.month}</Label>
          <button className="btn btn-link" type="button" color="link" onClick={this.nextMonth}><i className="material-icons md-48 local">
            keyboard_arrow_right
            </i></button>
        </div>
        <form className="form">
          <Table bordered>
            <thead>
              <tr>
                <th>descrição</th>
                <th>valor</th>
                <th>data</th>
                <th>categoria</th>
                <th>observação</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.payment.length ?
                this.state.tableAttributes.map((result,i) => (
                  <tr key = {i}>
                    <td>{result.description}</td>
                    <td>{result.value}</td>
                    <td>{new Date(result.date).toLocaleDateString("pt-BR")}</td>
                    <td>{result.category}</td>
                    <td>{result.observation}</td>
                    <td>{result.status === undefined ? "" : (result.status.toString() === "1" ? "pago" : "pendente")}</td>
                  </tr>
                ))
                :
                (<tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>)
              }
            </tbody>
          </Table>
        </form>
        <div className="wrapper">
          <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="createButton">
            <DropdownToggle caret color="primary">
              +
                    </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.togglePaymentModal}>Pagamento</DropdownItem>
              <DropdownItem onClick={this.toggleMoneyModal}>Fatura</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <Modal isOpen={this.state.modalPaymentIsOpen}>
          <ModalHeader toggle={this.togglePaymentModal.bind(this)}>
            Adicionar pagamento
                    </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="descrição">Descrição</Label>
                <Input type="text" id="descricaoPagamento" onChange={e => this.state.createPayment.description = e.target.value} placeholder="Informe a descrição" />
              </FormGroup>
              <FormGroup>
                <Label for="valor">Valor</Label>
                <Input type="text" id="valorPagamento" onChange={e => this.state.createPayment.value = e.target.value} placeholder="Informe o valor" />
              </FormGroup>
              <FormGroup>
                <Label for="dataPagamento">Data do Pagamento</Label>
                <Input type="date" id="dtPagamento" onChange={e => this.state.createPayment.date = e.target.value} placeholder="Informe a data do pagamento" />
              </FormGroup>
              <FormGroup>
                <Label for="Status">Status</Label>
                <Input type="text" id="statusPagamento" onChange={e => this.state.createPayment.status = e.target.value} placeholder="Informe o status" />
              </FormGroup>
              <FormGroup>
                <Label for="Observação">Observação</Label>
                <Input type="text" id="observaçãoPagamento" onChange={e => this.state.createPayment.observation = e.target.value} placeholder="Informe uma observação" />
              </FormGroup>
              <FormGroup>
                <Label for="categoria">categoria</Label>
                <Input type="text" id="categoriaPagamento" onChange={e => this.state.createPayment.category = e.target.value} placeholder="Informe uma categoria" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.togglePaymentModal.bind(this)}>Cancelar</Button>
            <Button color="primary" onClick={this.createAndBindPayment}>Adicionar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalMoneyIsOpen}>
          <ModalHeader toggle={this.toggleMoneyModal.bind(this)}>
            Adicionar fatura
                    </ModalHeader>
          <ModalBody>
            <Form>
              <ModalBody>
                <Form>
                  <FormGroup>
                    <Label for="descrição">Descrição</Label>
                    <Input type="text" id="descricaoMoney" onChange={e => this.state.createMoney.description = e.target.value} placeholder="Informe a descrição" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="valor">Valor</Label>
                    <Input type="text" id="valorMoney" onChange={e => this.state.createMoney.value = e.target.value} placeholder="Informe o valor" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dataMoney">Data da fatura</Label>
                    <Input type="date" id="dtMoney" onChange={e => this.state.createMoney.date = e.target.value} placeholder="Informe a data da fatura" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Observação">Observação</Label>
                    <Input type="text" id="observaçãoMoney" onChange={e => this.state.createMoney.observation = e.target.value} placeholder="Informe uma observação" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="categoria">categoria</Label>
                    <Input type="text" id="categoriaMoney" onChange={e => this.state.createMoney.category = e.target.value} placeholder="Informe uma categoria" />
                  </FormGroup>
                </Form>
              </ModalBody>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggleMoneyModal.bind(this)}>Cancelar</Button>
            <Button color="primary" onClick={this.createAndBindMoney}>Adicionar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}