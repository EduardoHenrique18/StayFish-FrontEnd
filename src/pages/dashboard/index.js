import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import './style.css';

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
        }
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
          
    }
 
}