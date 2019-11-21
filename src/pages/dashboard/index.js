/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import Header from '../../components/Header';
import './style.css';

export default class Dashboard extends Component {
    
    constructor() {
        super();
        this.state = {
            user: {}, 
            setCollapsed: false,
            collapsed: false,
            isOpen: false
            
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    
    render() {
        return (
            <form className = "form">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table> 
            </form>
            
          );
          

    <div className="float-left fixed-top">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Stay Fish</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
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
        );
    }
 
}