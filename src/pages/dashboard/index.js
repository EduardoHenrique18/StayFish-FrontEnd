import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            user: {},
        }
    }

    render() {
        return (
            <div className= "wrapper">
                <Header title="Dashboard" />
                <hr className="my-3" />
                <p>
                    <code> logado com sucesso! ^-^  </code>
                </p>
                <div className="text-center">
                    <Link to="/logout" className="btn btn-outline-primary"> Log Out </Link>
                </div>
            </div>
        );
    }
}
