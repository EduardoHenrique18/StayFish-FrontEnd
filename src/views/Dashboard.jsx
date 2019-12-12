/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Swal from 'sweetalert2';
import moment from 'moment';
// react plugin used to create charts
import { Line } from "react-chartjs-2";

import "./style.css"
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

// core components
import {
  dateJson
} from "variables/charts.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableIndex: 0,
      bigChartData: "data1",
      user: {},
      setCollapsed: false,
      collapsed: false,
      numberMonth: 0,
      month: "",
      year: 0,
      payment: [],
      money: [],
      paymentByYear: [],
      moneyByYear: [],
      isOpen: false,
      tableAttributes: [],
      balance: 0,
      dropdownOpen: false,
      modalMoneyIsOpen: false,
      modalPaymentIsOpen: false,
      modalEditMoneyIsOpen: false,
      modalEditPaymentIsOpen: false,
      createPayment: {
        value: 0,
        description: "",
        date: "",
        status: 0,
        observation: "",
        category: "",
      },
      createPaymentErrors: {},
      createMoneyErrors: {},
      alterPaymentErrors: {},
      alterMoneyErrors: {},
      createMoney: {
        value: 0,
        description: "",
        date: "",
        observation: "",
        category: ""
      },

    };
  }

  data = (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: [
        `JAN`,
        `FEB`,
        `MAR`,
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        `NOV`,
        `DEC`
      ],
      datasets: [
        {
          label: "Payments",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#f70b0b",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#f70b0b",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#f70b0b",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.state.paymentByYear
        },
        {
          label: "Money",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#0eeb10",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#0eeb10",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#0eeb10",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.state.moneyByYear
        },
      ]
    };
  }

  options = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ]
    }
  };

  findPaymentYear = async () => {
    const data = { idUser: this.state.user._id, year: this.state.year };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/searchPaymentByYear', requestInfo)
      .then(async response => {
        if (response.ok) {
          let payment = await response.json();
          await this.setState({ paymentByYear: payment })
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  findMoneyYear = async () => {
    const data = { idUser: this.state.user._id, year: this.state.year };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('https://stay-fish-backend.herokuapp.com/searchMoneyByYear', requestInfo)
      .then(async response => {
        if (response.ok) {
          let money = await response.json();
          await this.setState({ moneyByYear: money })
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

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
          await this.findPaymentYear();
          await this.findMoneyYear();
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  updatePayment = (tableIndex) => {

    const alterPaymentErrors = this.state.alterPaymentErrors;

    for (const [key, value] of Object.entries(this.state.alterPaymentErrors)) {
      if (value == '') {
        Object.assign(alterPaymentErrors, { [key]: true })
      }
      
      if (key === 'value' && value == 0) {
        Object.assign(alterPaymentErrors, { [key]: true })
      }
    }

    this.setState({ ...this.state, alterPaymentErrors });

    if (Object.keys(alterPaymentErrors).length === 0) {
      this.setState({ ...this.state, modalEditPaymentIsOpen: false });

      // console.log('enviando para o backend', this.state.tableAttributes[tableIndex]);

      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({ 
          ...this.state.tableAttributes[tableIndex]
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      };
      
      fetch('http://localhost:8080/updatePayment', requestInfo)
        .then(async response => {
          if (response.ok) {
            await this.initialLoader();
          }
        }).catch(e => this.setState({ ...this.state, message: e.message }))
      }
    
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
          await this.findPaymentYear();
          await this.findMoneyYear();
        }
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  findTotalMoney = async() => {
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
      dateJson.months.map(async result => {
        if (result.number.toString() === this.state.numberMonth.toString()) {
          await this.setState({ month: result.month })
        }
      })
    })
    
    await this.initialLoader();
  };

  initialLoader = async() => {
    await this.findPayment();
    await this.findMoney();
    this.addTableAttributes();
    await this.findTotalMoney();
    await this.findPaymentYear();
    await this.findMoneyYear();
  }

  findBalance = () => {
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
  }

  nextMonth = async () => {
    let numberMonth = this.state.numberMonth;
    if (numberMonth == 12) {
      await this.setState({ numberMonth: 1 });
      dateJson.months.map(async result => {
        if (result.number == 1) {
          await this.setState({ month: result.month })
        }
      })
      await this.setState({ year: this.state.year + 1 })
      await this.findPaymentYear();
      await this.findMoneyYear();
    } else {
      let nextMonth = numberMonth + 1;
      await this.setState({ numberMonth: nextMonth });
      dateJson.months.map(async result => {
        if (result.number == nextMonth) {
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
    if (numberMonth == 1) {
      await this.setState({ numberMonth: 12 })
      dateJson.months.map(async result => {
        if (result.number == 12) {
          await this.setState({ month: result.month })
        }
      })
      await this.setState({ year: this.state.year - 1 })
      await this.findPaymentYear();
      await this.findMoneyYear();
    } else {
      let previousMonth = numberMonth - 1;
      await this.setState({ numberMonth: previousMonth })
      dateJson.months.map(async result => {
        if (result.number == previousMonth) {
          await this.setState({ month: result.month })
        }
      })
    }
    await this.findPayment();
    await this.findMoney();
    await this.addTableAttributes();
  };

  findPayment = async() => {
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
          this.setState({ payment: payment })
        }
        this.addTableAttributes();
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  findMoney = async() => {
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
          this.setState({ money: money })
        }
        this.addTableAttributes();
      })
      .catch(e => {
        this.setState({ message: e.message });
      });
  }

  deletDebt = (_id) => {
    const data = { _id: _id }
    const requestInfo = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('http://localhost:8080/deletDebt', requestInfo)
    .then(async response => {

      if (response.ok) {
        this.findPayment();
        this.addTableAttributes();
        this.findBalance();
        this.findPaymentYear();
        this.findMoneyYear();
        this.findTotalMoney();
        Swal.fire({
          icon: 'success',
          title: 'Excluido Com Sucesso!!',
          timer: '1500'
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'success',
        title: 'Erro ao Excluir',
        timer: '1500'
      })
    })
  }

  deletInvoice = (_id) => {
    const data = { _id: _id }
    const requestInfo = {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('http://localhost:8080/deletInvoice', requestInfo)
    .then(async response => {
      if(response.ok) {
        this.findMoney();
        this.addTableAttributes();
        this.findBalance();
        this.findPaymentYear();
        this.findMoneyYear();
        this.findTotalMoney();
        Swal.fire({
          icon: 'success',
          title: 'Excluido Com Sucesso!!',
          timer: '1500'
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao Excluir',
        timer: '1500'
      })
    })
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
    this.setState({ 
      modalPaymentIsOpen: !this.state.modalPaymentIsOpen,
      createPayment: {
        value: 0,
        description: "",
        date: "",
        status: 0,
        observation: "",
        category: "",
      },
    });
  };

  toggleMoneyModal = () => {
    this.setState({ modalMoneyIsOpen: !this.state.modalMoneyIsOpen,
      createMoney: {
      value: 0,
        description: "",
        date: "",
        observation: "",
        category: "",
      },
    });
  };

  createAndBindPayment = async () => {
    const createPaymentErrors = this.state.createPaymentErrors;

    for (const [key, value] of Object.entries(this.state.createPayment)) {
      if (value == '') {
        Object.assign(createPaymentErrors, { [key]: true })
      }
      
      if (key === 'value' && value == 0) {
        Object.assign(createPaymentErrors, { [key]: true })
      }
    }

    this.setState({ ...this.state, createPaymentErrors });

    if (Object.keys(createPaymentErrors).length === 0) {
      await this.createPayment();
      this.togglePaymentModal();
    }
  }

  createAndBindMoney = async () => {
    const createMoneyErrors = this.state.createMoneyErrors;

    for (const [key, value] of Object.entries(this.state.createMoney)) {
      if (value == '') {
        Object.assign(createMoneyErrors, { [key]: true })
      }
      
      if (key === 'value' && value == 0) {
        Object.assign(createMoneyErrors, { [key]: true })
      }
    }

    this.setState({ ...this.state, createMoneyErrors });

    if (Object.keys(createMoneyErrors).length === 0) {
      await this.createMoney();
      this.toggleMoneyModal();
    }
  }

  alterMoney = async (tableIndex) => {

    const alterMoneyErrors = this.state.alterMoneyErrors;

    for (const [key, value] of Object.entries(this.state.alterMoneyErrors)) {
      if (value == '') {
        Object.assign(alterMoneyErrors, { [key]: true })
      }
      
      if (key === 'value' && value == 0) {
        Object.assign(alterMoneyErrors, { [key]: true })
      }
    }

    this.setState({ ...this.state, alterMoneyErrors });

    if (Object.keys(alterMoneyErrors).length === 0) {
      this.setState({ ...this.state, modalEditMoneyIsOpen: false });

      console.log('enviando para o backend', this.state.tableAttributes[tableIndex]);

      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({ 
          ...this.state.tableAttributes[tableIndex]
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      };
      
      fetch('http://localhost:8080/updateMoney', requestInfo)
        .then(async response => {
          if (response.ok) {
            await this.initialLoader();
          }
        }).catch(e => this.setState({ ...this.state, message: e.message }))
      }
    }

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };

  editTableMoney = (e) => {
    console.log('aqui', e);
    this.setState({tableIndex: e});
    this.toggleEditTableMoney();
  }

  toggleEditTableMoney = () => {
    this.setState({ modalEditMoneyIsOpen: !this.state.modalEditMoneyIsOpen });
    this.initialLoader();
  }

  editTablePayment = (e) => {
    this.setState({tableIndex: e});
    this.toggleEditTablePayment();
  }

  toggleEditTablePayment= () => {
    this.setState({ modalEditPaymentIsOpen: !this.state.modalEditPaymentIsOpen });
    this.initialLoader();
  }

  change = (e, tableIndex) => {
    const tableAttributes = this.state.tableAttributes;
    const { name, value } = e.target;

    if (value == 'date') {
      tableAttributes[tableIndex][name] = moment(value).format('DD/MM/YYYY');
    } else {
      tableAttributes[tableIndex][name] = value;
    }
    
    this.setState({
      ...this.state,
      tableAttributes
    });
  }

  changeDespesa = (e, tableIndex) => {
    const alterPaymentErrors = this.state.alterPaymentErrors;

    const tableAttributes = this.state.tableAttributes;
    const { name, value } = e.target;
    tableAttributes[tableIndex][name] = value;

    if (value.trim() === '') {
      alterPaymentErrors[name] = true;
    } else {
      delete alterPaymentErrors[name];
    }

    this.setState({
      ...this.state, 
        tableAttributes
    });
  }

  changeReceita = (e, tableIndex) => {
    const alterMoneyErrors = this.state.alterMoneyErrors;

    const tableAttributes = this.state.tableAttributes;
    const { name, value } = e.target;
    tableAttributes[tableIndex][name] = value;

    if (value.trim() === '') {
      alterMoneyErrors[name] = true;
    } else {
      delete alterMoneyErrors[name];
    }

    this.setState({
      ...this.state, 
        tableAttributes
    });
  }

  changeCreatePayment = e => {
    const { name, value } = e.target;
    const createPaymentErrors = this.state.createPaymentErrors;

    if (value.trim() === '') {
      createPaymentErrors[name] = true;
    } else {
      delete createPaymentErrors[name];
    }

    this.setState({
      ...this.state, 
      createPayment: {
        ...this.state.createPayment,
        [name]: value,
      },
      createPaymentErrors,
    });
  }

  changeCreateMoney = e => {
    const { name, value } = e.target;
    const createMoneyErrors = this.state.createMoneyErrors;

    if (value.trim() === '') {
      createMoneyErrors[name] = true;
    } else {
      delete createMoneyErrors[name];
    }

    this.setState({
      ...this.state, 
      createMoney: {
        ...this.state.createMoney,
        [name]: value,
      },
      createMoneyErrors,
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="12" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Tabela</CardTitle>
                  <h1 style = {this.state.balance >= 0 ?{color: "#1fe10e"} : {color: "#fe0031"}}>R${this.state.balance}</h1>
                  <Button onClick={this.toggleMoneyModal}>Adicionar Receita</Button>
                  <Button onClick={this.togglePaymentModal}>Adicionar Despesa</Button>
                  <div className="float-right">
                    <p className="text-center">{this.state.year}</p>
                    <Button className="btn btn-link float-right" type="button" color="link" onClick={this.nextMonth}><i className="material-icons md-60 local">
                      keyboard_arrow_right
                    </i></Button>
                    <p className = "float-right  h1">{this.state.month}</p>
                    <Button className="btn btn-link float-right" type="button" color="link" onClick={this.previousMonth}><i className="material-icons md-60 local">
                    keyboard_arrow_left
                     </i></Button>
                     </div>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Categoria</th>
                        <th>Observação</th>
                        <th className="text-center">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.payment.length || this.state.money.length?
                        this.state.tableAttributes.map((result, i) => (
                          <tr key={i}>
                            <td>{result.description}</td>
                            <td>{new Date(result.date).toLocaleDateString("pt-BR")}</td>
                            <td>{result.status === undefined ? "" : (result.status.toString() === "1" ? "pago" : "pendente")}</td>
                            <td>{result.observation}</td>
                            <td>{result.category}</td>
                            <td className="text-center">{result.value}</td>
                            <td className="text-center"><Button onClick ={() => result.status >= 0 ? this.editTablePayment(i) : this.editTableMoney(i)}>Editar</Button></td>
                            <td><Button onClick={() => result.hasOwnProperty('status') ? this.deletDebt(result._id) : this.deletInvoice(result._id)}>Excluir</Button></td>
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
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Receitas x Despesas</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={this.data}
                      options={this.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={this.state.modalPaymentIsOpen} toggle={this.togglePaymentModal}>
            <ModalHeader toggle={this.togglePaymentModal.bind(this)}>
              Adicionar Despesa
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="descrição">Descrição</Label>
                  <Input 
                    style={{color: "#000"}}
                    type="text" 
                    id="descricaoPagamento"
                    name="description"
                    value={this.state.createPayment.description}
                    onChange={e => this.changeCreatePayment(e)}
                    placeholder="Informe a descrição"
                  />
                { this.state.createPaymentErrors.description && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="valor">Valor</Label>
                  <Input
                  style = {{color: "#000"}}
                  type="number" id="valorPagamento"
                  name="value"
                  value={this.state.createPayment.value}
                  onChange={e => this.changeCreatePayment(e)}
                  placeholder="Informe o valor"
                  />
                  { this.state.createPaymentErrors.value && <span className="alertInput">O campo é obrigatório </span>}
                </FormGroup>
                <FormGroup>
                  <Label for="dataPagamento">Data do Pagamento</Label>
                  <Input
                  style={{color: "#000"}}
                  type="date" id="dtPagamento"
                  name="date"
                  value={this.state.createPayment.date}
                  onChange={e => this.changeCreatePayment(e)}
                  placeholder="Informe a data do pagamento"
                  />
                  { this.state.createPaymentErrors.date && <span className="alertInput">O campo é obrigatório </span>}
                </FormGroup>
                <FormGroup>
                  <Label for="Status">Status</Label>
                  <Input type="select" name="status"
                  style={{color: "black"}}
                  onChange={e => this.changeCreatePayment(e)}>
                  <option value="">Selecione</option>
                  <option value={0}>Pendente</option>
                  <option value={1}>Pago</option>
                  </Input>
                  {this.state.createPaymentErrors.status && <span className="alertInput">O campo é obrigatório </span>}
                </FormGroup>
                <FormGroup>
                  <Label for="Observação">Observação</Label>
                  <Input 
                  style={{color: "#000"}}
                  type="text" id="observaçãoPagamento"
                  name="observation"
                  value={this.state.createPayment.observation}
                  onChange={e => this.changeCreatePayment(e)}
                  placeholder="Informe uma observação"
                  />
                  {this.state.createPaymentErrors.observation && <span className="alertInput">O campo é obrigatório </span>}
                </FormGroup>
                <FormGroup>
                  <Label for="categoria">categoria</Label>
                  <Input
                  style={{color: "#000"}}
                  type="text" id="categoriaPagamento"
                  name="category"
                  value={this.state.createPayment.category}
                  onChange={e => this.changeCreatePayment(e)}
                  placeholder="Informe uma categoria"
                  />
                  { this.state.createPaymentErrors.category && <span className="alertInput">O campo é obrigatório </span>}
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.togglePaymentModal.bind(this)}>Cancelar</Button>
              <Button color="primary" onClick={this.createAndBindPayment}>Adicionar</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modalMoneyIsOpen} toggle={this.toggleMoneyModal}>
            <ModalHeader toggle={this.toggleMoneyModal.bind(this)}>
              Adicionar Receita
            </ModalHeader>
            <ModalBody>
              <Form>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label for="descrição">Descrição</Label>
                      <Input
                      style={{color: "#000"}}
                      type="text"
                      id="descricaoMoney"
                      name="description"
                      value={this.state.createMoney.description}
                      onChange={e => this.changeCreateMoney(e)}
                      placeholder="Informe a descrição"
                      />
                      { this.state.createMoneyErrors.description && <span className="alertInput">O campo é obrigatório </span>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="valor">Valor</Label>
                      <Input
                      style={{color: "#000"}}
                      type="number"
                      id="valorMoney"
                      name="value"
                      onChange={e => this.changeCreateMoney(e)}
                      placeholder="Informe o valor"
                      />
                      { this.state.createMoneyErrors.value && <span className="alertInput">O campo é obrigatório </span>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="dataMoney">Data da fatura</Label>
                      <Input
                      style={{color: "#000"}}
                      type="date"
                      id="dtMoney"
                      name="date"
                      onChange={e => this.changeCreateMoney(e)}
                      placeholder="Informe a data da fatura"
                      />
                      { this.state.createMoneyErrors.date && <span className="alertInput">O campo é obrigatório </span>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="Observação">Observação</Label>
                      <Input
                      style={{color: "#000"}}
                      type="text"
                      name="observation"
                      id="observaçãoMoney"
                      onChange={e => this.changeCreateMoney(e)}
                      placeholder="Informe uma observação"
                      />
                      { this.state.createMoneyErrors.observation && <span className="alertInput">O campo é obrigatório </span>}
                    </FormGroup>
                    <FormGroup>
                      <Label for="categoria">categoria</Label>
                      <Input
                      style={{color: "#000"}}
                      type="text"
                      id="categoriaMoney"
                      name="category"
                      onChange={e => this.changeCreateMoney(e)}
                      placeholder="Informe uma categoria"
                      />
                      { this.state.createMoneyErrors.category && <span className="alertInput">O campo é obrigatório </span>}
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
          <Modal isOpen={this.state.modalEditPaymentIsOpen} toggle={this.togleEditTablePayment}>
            <ModalHeader toggle={this.togleEditTablePayment}>
              Alterar Despesa
            </ModalHeader>
            <ModalBody>
              {
                this.state.tableAttributes[this.state.tableIndex] &&
                <Form>
                <FormGroup>
                  <Label for="descrição">Descrição</Label>
                  <Input 
                    style={{color: "#000"}}
                    value={this.state.tableAttributes[this.state.tableIndex].description} 
                    type="text"
                    id="descricaoPagamento" 
                    name="description"
                    onChange={e => this.changeDespesa(e, this.state.tableIndex)} 
                    placeholder="Informe a descrição"
                  />
                  { this.state.alterPaymentErrors.description && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="valor">Valor</Label>
                  <Input
                    style={{color: "#000"}}
                    value={this.state.tableAttributes[this.state.tableIndex].value}
                    name="value"
                    type="number" 
                    id="valorPagamento" 
                    onChange={e => this.change(e, this.state.tableIndex)} 
                    placeholder="Informe o valor" 
                  />
                  { this.state.alterPaymentErrors.value && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="dataPagamento">Data do Pagamento</Label>
                  <Input
                  style = {{color: "#000"}}
                  value={ moment(this.state.tableAttributes[this.state.tableIndex].date).format('YYYY-MM-DD') }
                  name="date"
                  type="date" 
                  id="dtPagamento"
                  onChange={e => this.change(e, this.state.tableIndex)}
                  placeholder="Informe a data do pagamento"
                  />
                  { this.state.alterPaymentErrors.date && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="Status">Status</Label>
                  <Input
                  type="select"
                  name="status"
                  id="status"
                  style={{color: "#000"}}
                  value={this.state.tableAttributes[this.state.tableIndex].status}
                  onChange={e => this.change(e, this.state.tableIndex)}>
                  <option value={0}>Pendente</option>
                  <option value={1}>Pago</option>
                  </Input>
                  { this.state.alterPaymentErrors.status && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="Observação">Observação</Label>
                  <Input
                  style = {{color: "#000"}}
                  value={this.state.tableAttributes[this.state.tableIndex].observation}
                  name="observation"
                  type="text" 
                  id="observaçãoPagamento"
                  onChange={e => this.change(e, this.state.tableIndex)}
                  placeholder="Informe uma observação"
                  />
                  { this.state.alterPaymentErrors.observation && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                  <Label for="categoria">categoria</Label>
                  <Input
                    style = {{color: "#000"}}
                    value={this.state.tableAttributes[this.state.tableIndex].category}
                    name="category"
                    type="text" 
                    id="categoriaPagamento"
                    onChange={e => this.change(e, this.state.tableIndex)}
                    placeholder="Informe uma categoria"
                  />
                  { this.state.alterPaymentErrors.category && <span className="alertInput">O campo é obrigatório</span>}
                </FormGroup>
              </Form>
              }
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.toggleEditTablePayment.bind(this)}>Cancelar</Button>
              <Button color="primary" onClick={() => this.updatePayment(this.state.tableIndex)}>Alterar</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.modalEditMoneyIsOpen} toggle={this.toggleEditTableMoney}>
            <ModalHeader toggle={this.toggleEditTableMoney.bind(this)}>
              Alterar Receita
                    </ModalHeader>
            <ModalBody>
              { 
                this.state.tableAttributes[this.state.tableIndex] && 
              
                <Form>
                  <FormGroup>
                    <Label for="descrição">Descrição</Label>
                    <Input
                      style={{color: "#000"}}
                      value={this.state.tableAttributes[this.state.tableIndex].description}
                      name="description"
                      type="text"
                      id="description"
                      onChange={e => this.changeReceita(e, this.state.tableIndex)}
                      placeholder="Informe a descrição"
                    />
                    { this.state.alterMoneyErrors.description && <span className="alertInput">O campo é obrigatório</span>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="valor">Valor</Label>
                    <Input
                      style={{color: "#000"}}
                      type="number"
                      name="value"
                      value={this.state.tableAttributes[this.state.tableIndex].value}
                      id="valorPagamento"
                      onChange={e => this.changeReceita(e, this.state.tableIndex)}
                      placeholder="Informe o valor"
                    />
                     { this.state.alterMoneyErrors.value && <span className="alertInput">O campo é obrigatório</span>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="dataPagamento">Data do Pagamento</Label>
                    <Input
                      style={{color: "#000"}}
                      type="date"
                      name="date"
                      value={moment(this.state.tableAttributes[this.state.tableIndex].date).format('YYYY-MM-DD')}
                      id="dtPagamento"
                      onChange={e => this.changeReceita(e, this.state.tableIndex)}
                      placeholder="Informe a data do pagamento"
                    />
                     { this.state.alterMoneyErrors.date && <span className="alertInput">O campo é obrigatório</span>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="Observação">Observação</Label>
                    <Input
                      style={{color: "#000"}}
                      type="text"
                      name="observation"
                      value={this.state.tableAttributes[this.state.tableIndex].observation}
                      id="observaçãoPagamento"
                      onChange={e => this.changeReceita(e, this.state.tableIndex)}
                      placeholder="Informe uma observação"
                    />
                     { this.state.alterMoneyErrors.observation && <span className="alertInput">O campo é obrigatório</span>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="categoria">categoria</Label>
                    <Input
                      style={{color: "#000"}}
                      type="text"
                      name="category"
                      value={this.state.tableAttributes[this.state.tableIndex].category}
                      id="categoriaPagamento"
                      onChange={e => this.changeReceita(e, this.state.tableIndex)}
                      placeholder="Informe uma categoria"
                    />
                     { this.state.alterMoneyErrors.category && <span className="alertInput">O campo é obrigatório</span>}
                  </FormGroup>
                </Form>
              }
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.toggleEditTableMoney.bind(this)}>Cancelar</Button>
              <Button color="primary" onClick={() => this.alterMoney(this.state.tableIndex)}>Alterar</Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

export default Dashboard;