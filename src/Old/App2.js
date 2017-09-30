import React, { Component } from 'react';

//import logo from './logo.svg';

import './App.css';
import Web3 from 'web3'
import _ from 'lodash'


var ETHEREUM_CLIENT = new Web3( new Web3.providers.HttpProvider("http://localhost:8545"))
	
var peopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstname","type":"bytes32"},{"name":"_lastname","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstname","type":"bytes32"},{"name":"lastname","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}]
var peopleContractAddress = "0xf6eb5a75cb6af6ffc19a9bd932fcd2431b7717a7"
var peopleContract = ETHEREUM_CLIENT.eth.contract(peopleContractABI).at(peopleContractAddress)
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
