import React, { Component } from 'react';

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
  DropdownItem
} from 'reactstrap';

class Topbar extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
    <div className="float-left fixed-top">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Stay Fish</NavbarBrand>
        <NavbarBrand>{this.props.balance}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.props.isOpen} navbar>
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
    )
  }
};

export default Topbar;