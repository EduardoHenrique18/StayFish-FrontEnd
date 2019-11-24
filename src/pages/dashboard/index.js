/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
  Table,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Topbar from "../../components/navbar/index";

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
      tableAttributes: [],
      balance: 0,
      dropdownOpen: false
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

  findTotalMoney = () => {
    const data = { idUser: this.state.user._id };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('http://localhost:8080/balance', requestInfo)
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
        if (result.number == this.state.numberMonth) {
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
    const date = this.state.year + "-" + this.state.numberMonth;
    const data = { idUser: this.state.user._id, date: date };
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    };
    fetch('http://localhost:8080/searchPaymentByDate', requestInfo)
      .then(async response => {
        if (response.ok) {
          let payment = await response.json();
          await this.setState({ payment: payment })
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
      this.date.months.map(async result => {
        if (result.number == 1) {
          await this.setState({ month: result.month })
        }
      })
      await this.setState({ year: this.state.year + 1 })
    } else {
      let nextMonth = numberMonth + 1;
      await this.setState({ numberMonth: nextMonth });
      this.date.months.map(async result => {
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
      this.date.months.map(async result => {
        if (result.number == 12) {
          await this.setState({ month: result.month })
        }
      })
      await this.setState({ year: this.state.year - 1 })
    } else {
      let previousMonth = numberMonth - 1;
      await this.setState({ numberMonth: previousMonth })
      this.date.months.map(async result => {
        if (result.number == previousMonth) {
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
    fetch('http://localhost:8080/searchPaymentByDate', requestInfo)
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
    fetch('http://localhost:8080/searchMoneyByDate', requestInfo)
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
      attributes.push(result);
    });
    await this.state.money.map(result => {
      attributes.push(result);
    });
    this.setState({ tableAttributes: attributes })
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  render() {
    return (
      <div className="container">
        <Topbar balance={this.state.balance}></Topbar>
        <div className="text-center">
          <button className="btn btn-link" type="button" color="link" block onClick={this.previousMonth}><i className="material-icons md-48 local">
            keyboard_arrow_left
            </i></button>
          <text>{this.state.month}</text>
          <button className="btn btn-link" type="button" color="link" block onClick={this.nextMonth}><i className="material-icons md-48 local">
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
                this.state.tableAttributes.map(result => (
                  <tr>
                    <td>{result.description}</td>
                    <td>{result.value}</td>
                    <td>{new Date(result.date).toLocaleDateString("pt-BR")}</td>
                    <td>{result.category}</td>
                    <td>{result.observation}</td>
                    <td>{result.status == 1 ? "pago" : (result.status == 0 ? "pendente" : "")}</td>
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
          <ButtonDropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="clicar">
            <DropdownToggle caret color="primary">
              +
                    </DropdownToggle>
            <DropdownMenu>
              <DropdownItem block onClick={this.toggleModal}>Pagamento</DropdownItem>
              <DropdownItem>Fatura</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}