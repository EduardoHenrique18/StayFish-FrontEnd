import React, { Component } from 'react';
import './style.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


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
                    <DropdownItem>Pagamento</DropdownItem>
                    <DropdownItem>Fatura</DropdownItem>
                </DropdownMenu>
                </ButtonDropdown>

                
            </div>
            
        );
    }
}