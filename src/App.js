//Note that the App will run on port 3000 by default
//Change the port to 8000 by entering SET PORT=8000 before entering npm start to start the App
//This app allows finney stakes
import React, { Component } from 'react';

//import logo from './favicon.ICO';

import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

	
var epayContractABI = [{"constant":false,"inputs":[{"name":"_settler","type":"address"},{"name":"_units","type":"uint256"}],"name":"confirmOffer","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_valueT","type":"uint256"}],"name":"tradeContract","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"payVoid","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"unitsT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"valueT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimBalance","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"abort","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpostSettlement","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_unitsT","type":"uint256"}],"name":"tradeBuyer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmSellerTrade","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmContractTrade","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"parent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_valueT","type":"uint256"}],"name":"changeContractTrade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"}],"name":"settle","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_outcome","type":"uint256"}],"name":"settleF","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"rent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"cancelContractTrade","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmBuyerTrade","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"units","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_valueT","type":"uint256"}],"name":"tradeSeller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"settler","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_rent","type":"uint256"}],"name":"setRent","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getTicket","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"lease","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"defineSettlement","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collectFee","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"confirmPurchase","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_valueResult","type":"uint256"}],"name":"postResult","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_rent","type":"uint256"},{"name":"_owner","type":"address"}],"payable":true,"type":"constructor"},{"anonymous":false,"inputs":[],"name":"aborted","type":"event"},{"anonymous":false,"inputs":[],"name":"purchaseConfirmed","type":"event"},{"anonymous":false,"inputs":[],"name":"itemReceived","type":"event"}]


var settlerContractABI = [{"constant":false,"inputs":[{"name":"_settler","type":"address"},{"name":"_units","type":"uint256"}],"name":"confirmOffer","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"seller","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_valueT","type":"uint256"}],"name":"tradeContract","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"payVoid","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"unitsT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"valueT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"claimBalance","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"abort","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpostSettlement","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_unitsT","type":"uint256"}],"name":"tradeBuyer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmSellerTrade","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"value","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmContractTrade","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"parent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_valueT","type":"uint256"}],"name":"changeContractTrade","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"}],"name":"settle","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"buyer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_outcome","type":"uint256"}],"name":"settleF","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"rent","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"cancelContractTrade","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"confirmBuyerTrade","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"units","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_valueT","type":"uint256"}],"name":"tradeSeller","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"settler","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_rent","type":"uint256"}],"name":"setRent","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getTicket","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"lease","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"defineSettlement","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"collectFee","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[],"name":"confirmPurchase","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_valueResult","type":"uint256"}],"name":"postResult","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_rent","type":"uint256"},{"name":"_owner","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[],"name":"aborted","type":"event"},{"anonymous":false,"inputs":[],"name":"purchaseConfirmed","type":"event"},{"anonymous":false,"inputs":[],"name":"itemReceived","type":"event"}]

var contractSpawnContractABI = [{"constant":true,"inputs":[],"name":"a","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cont","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_rent","type":"uint256"},{"name":"_owner","type":"address"}],"name":"createContract","outputs":[{"name":"","type":"address"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_cont","type":"address"}],"name":"containsContract","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"}]

var epayContractAddress = "0x453778dcd89acd92a84bccac9eefecb4258aac24"
var contractSpawnAddress = "0x77ec5c540a3c4145522D874c2e96bBd5EB684fB8"
var currentContractAddress = contractSpawnAddress 

class App extends Component {
  


		constructor(props){
			super(props)

			this.state = {
        			rent : 0,
        			units : 0,
        			value : 0,
        			unitsT : 0,
        			valueT : 0,
       				owner : '0x0',
       				set : '0x0',
        			seller : '0x0',
				buyer : '0x0',
				contractState : 0,
				settle: "",
				validContracts: [],
				screen : "List"
			}
			
			//Uses localhost
			this.ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
			this.epayContract = this.ETHEREUM_CLIENT.eth.contract(epayContractABI).at(epayContractAddress)
			this.contractSpawnContract = this.ETHEREUM_CLIENT.eth.contract(contractSpawnContractABI).at(contractSpawnAddress)
			this.ETHEREUM_CLIENT.eth.defaultAccount = this.ETHEREUM_CLIENT.eth.coinbase;

    			//this.handleChange = this.handleChange.bind(this);
    			this.handleClaim = this.handleClaim.bind(this);//
    			this.handleSetRent = this.handleSetRent.bind(this);//
    			this.handleTradeContract = this.handleTradeContract.bind(this);//
    			this.handleChangeContractTrade = this.handleChangeContractTrade.bind(this);//
    			this.handleCancelContractTrade = this.handleCancelContractTrade.bind(this);//
    			this.handleConfirmContractTrade = this.handleConfirmContractTrade.bind(this);//
    			this.handleLease = this.handleLease.bind(this);//
    			this.handleOffer = this.handleOffer.bind(this);//
    			this.handlePurchase = this.handlePurchase.bind(this);//
    			this.handleSetBuyerPrice = this.handleSetBuyerPrice.bind(this);//
    			this.handlePurchaseBuyerPosition = this.handlePurchaseBuyerPosition.bind(this);//
    			this.handleSetSellerPrice = this.handleSetSellerPrice.bind(this);//
    			this.handlePurchaseSellerPosition = this.handlePurchaseSellerPosition.bind(this);//
    			this.handleCancel = this.handleCancel.bind(this);//
    			this.handleSettle = this.handleSettle.bind(this);//
    			this.handleCreate = this.handleCreate.bind(this);//
    			this.handleGetContract = this.handleGetContract.bind(this);//
    			this.handleList = this.handleList.bind(this);//
//Settlement
    			this.handleCollectFee = this.handleCollectFee.bind(this);//
    			this.handlePostResult = this.handlePostResult.bind(this);//
    			this.handleReset = this.handleReset.bind(this);//
    			this.handleDefineSettlement = this.handleDefineSettlement.bind(this);//

		}
 	handleDefineSettlement(event) {
		var TF = this.epayContract.defineSettlement(this.ETHEREUM_CLIENT.toWei(event.target.FEE.value, 'finney'), {from: event.target.SELLER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A result was posted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});
  		event.preventDefault();

  	}
 	handlePostResult(event) {

		var TF = this.epayContract.postResult(event.target.RESULT.value, {from: event.target.SELLER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A result was posted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});
  		event.preventDefault();

  	}
 	handleCollectFee(event) {

		var TF = this.epayContract.collectFee({from: event.target.SELLER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
 	handleReset(event) {

		var TF = this.epayContract.unpostSettlement({from: event.target.SELLER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('Reset to pending: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();
  	}
  	handleClaim(event) {

		var TF = this.epayContract.claimBalance({from: event.target.OWNER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleSetRent(event) {

		var TF = this.epayContract.setRent(this.ETHEREUM_CLIENT.toWei(event.target.RENT.value, 'finney'), {from: event.target.OWNER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleTradeContract(event) {

		var TF = this.epayContract.tradeContract(this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'finney'), {from: event.target.OWNER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleLease(event) {

		var TF = this.epayContract.lease({from: event.target.SELLER.value, value: this.ETHEREUM_CLIENT.toWei(event.target.RENT.value, 'finney'), gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleCancelContractTrade(event) {

		var TF = this.epayContract.cancelContractTrade({from: event.target.OWNER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleChangeContractTrade(event) {

		var TF = this.epayContract.changeContractTrade(this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'finney'), {from: event.target.OWNER.value, gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleConfirmContractTrade(event) {

		var TF = this.epayContract.confirmContractTrade({from: event.target.BUYER.value, value: this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'finney'), gasLimit:90000, gasPrice:20000000000} );
   		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleOffer(event) {

		var TF = this.epayContract.confirmOffer(event.target.SET.value, this.ETHEREUM_CLIENT.toWei(event.target.UNIT.value, 'ether'),  {from: event.target.SELLER.value, value: this.ETHEREUM_CLIENT.toWei(event.target.VALUE.value, 'ether'), gasLimit:2000000, gasPrice:20000000000} );
    		alert('An offer was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]
		}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handlePurchase(event) {

		var TF = this.epayContract.confirmPurchase( {from: event.target.BUYER.value, value: this.ETHEREUM_CLIENT.toWei(event.target.VALUE.value, 'ether'), gasLimit:90000, gasPrice:20000000000} );
    		alert('An purchase was confirmed: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();
  	}
	handleCreate(event) {

		var TF = this.contractSpawnContract.createContract(this.ETHEREUM_CLIENT.toWei(event.target.VALUE.value, 'finney'), event.target.BUYER.value, {from: event.target.BUYER.value, gas:2000000, gasPrice:20000000000} );
    		alert('Created: ' + TF );

		var vCon = this.contractSpawnContract.getContracts();

		this.setState({validContracts: vCon}, function() {
			console.log(this.state.validContracts);
		});

    		event.preventDefault();
  	}
	handleList(event) {

		

		this.setState({screen: "List"}, function() {
			console.log(this.state.screen);
		});

    		event.preventDefault();
  	}
  	handleCancel(event) {

		var TF = this.epayContract.abort( {from: event.target.SELLER.value, gasLimit:90000, gasPrice:20000000000} );
    		alert('An cancellation was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});


    		event.preventDefault();
  	}
 	handleSetBuyerPrice(event) {

		var TF = this.epayContract.tradeBuyer(this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'ether'), {from: event.target.BUYER.value, gasLimit:90000, gasPrice:20000000000} );
		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
 	handlePurchaseBuyerPosition(event) {

		var TF = this.epayContract.confirmBuyerTrade({from: event.target.BUYER.value, value:this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'ether'), gasLimit:90000, gasPrice:20000000000} );
		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
 	handleSetSellerPrice(event) {

		var TF = this.epayContract.tradeSeller(this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'ether'), {from: event.target.SELLER.value, gasLimit:90000, gasPrice:20000000000} );
		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
 	handlePurchaseSellerPosition(event) {

		var TF = this.epayContract.confirmSellerTrade({from: event.target.SELLER.value, value:this.ETHEREUM_CLIENT.toWei(event.target.PRICE.value, 'ether'), gasLimit:90000, gasPrice:20000000000} );
		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
	handleGetContract(event) {
		epayContractAddress = event.target.CONTRACT.value

		this.epayContract = this.ETHEREUM_CLIENT.eth.contract(epayContractABI).at(epayContractAddress)

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0],
				screen: "Contract"}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
  	handleSettle(event) {

//Insert the settlement contract variable and call the function
//Change the send transaction to the function call within the Settlement contract

		var settlerContractAddress = this.state.set;
		//var TF = this.ETHEREUM_CLIENT.eth.sendTransaction({from: event.target.SENDER.value, to: this.state.set, value:this.ETHEREUM_CLIENT.toWei(1, 'finney'), gasLimit:90000, gasPrice:20000000000, data: epayContractAddress} ) 
		var settlerContract = this.ETHEREUM_CLIENT.eth.contract(settlerContractABI).at(settlerContractAddress)
   		var TF = settlerContract.settle(epayContractAddress ,{from: event.target.SENDER.value, value:this.ETHEREUM_CLIENT.toWei(event.target.FEE.value, 'finney'), gasLimit:90000, gasPrice:20000000000} );

		alert('A settlement request was submitted: ' + TF );

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0],
				settle: "Requested"
			}, function() {
			console.log(this.state.contractState);
		});

    		event.preventDefault();

  	}
//
	componentWillMount(){

		var vCon = this.contractSpawnContract.getContracts();

		this.setState({validContracts: vCon}, function() {
			console.log(this.state.validContracts);
		});

		var valueData = this.epayContract.getTicket();
		console.log(valueData);
		this.setState({ 
        			value : valueData[0].c[0],
        			valueT : valueData[1].c[0],
				units : valueData[2].c[0],
				unitsT : valueData[3].c[0],
				rent : valueData[4].c[0],
       				owner : valueData[5],
       				set : valueData[6],
        			seller : valueData[7],
				buyer : valueData[8],
				contractState : valueData[9].c[0]
				}, function() {
			console.log(this.state.contractState);
		});
		
	}

	render() {
  
		var tablerows = []
		var tablerows1 = []
		var tablerows2 = []
		var tablerows3 = []
		var tablerows4 = []

if(this.state.screen === "List") { 
		currentContractAddress = contractSpawnAddress 	
		_.each(this.state.validContracts, (value, index) => {
			tablerows4.push(
			<tr>
			  <td>{this.state.validContracts[index]}</td>
			</tr>
			);
		});

		tablerows2 = [
      			<form onSubmit={this.handleCreate}>
        			<fieldset>
        			<legend> CREATE CONTRACT </legend>
				<tr> Input Address :
				<input name="BUYER" type="text" />  
				Input Rent (greater than zero in finney) :
				<input name="VALUE" type="number"  /> 		
        			<input type="submit" value="Create Contract" /> </tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleGetContract}>
				<tr>
				{"Enter an address from below : "}
          			<input name="CONTRACT" type="text"  />
        			<input type="submit" value="Get Contract" /> </tr>
      			</form>]

}//List
if(this.state.screen === "Contract") { 
		currentContractAddress = epayContractAddress 
		var ownerAc = this.ETHEREUM_CLIENT.fromWei(this.ETHEREUM_CLIENT.eth.getBalance(this.state.owner), 'ether').toNumber();
		console.log("ownerAc" + ownerAc);
		var sellerAc = this.ETHEREUM_CLIENT.fromWei(this.ETHEREUM_CLIENT.eth.getBalance(this.state.seller), 'ether').toNumber();
		console.log("sellerAc" + sellerAc);
		var buyerAc = this.ETHEREUM_CLIENT.fromWei(this.ETHEREUM_CLIENT.eth.getBalance(this.state.buyer), 'ether').toNumber();
		console.log("buyerAc" + buyerAc);
		tablerows3 = [
			<table>
				<fieldset>
				<legend> CURRENT VARIABLES </legend>				
				<th>Owner Balance</th>				
				<th>Seller Balance</th>				
				<th>Buyer Balance</th>
				<th></th>				
							
				<tr>
			  	<td>{ownerAc}</td> 
			  	<td>{sellerAc}</td>
			  	<td>{buyerAc}</td>  
				</tr>
							
				<tr>
			  	<td>{this.state.owner}</td> 
			  	<td>{this.state.seller}</td>
			  	<td>{this.state.buyer}</td>  
				</tr>
				</fieldset>
			</table> 
			]
		tablerows4 = [
      			<form onSubmit={this.handleList}>
				<label>
				{""}
        			</label>
        			<input type="submit" value="Back to List" />
      			</form>
			]


		if(this.state.contractState === 1) {
		tablerows = [
      			<form onSubmit={this.handleClaim}>
				<fieldset>
				<legend> OWNER CLAIM BALANCE </legend>
				<tr>{"Enter Owner Address:"}
          			<input name="OWNER" type="text"  />
        			<input type="submit" value="Claim Balance" /> </tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleSetRent}>
				<fieldset>
				<legend> OWNER SET RENT </legend>
				<tr> {"Enter Owner Address:"}
          			<input name="OWNER" type="text"  />
				{"Enter rent (finney):"}
          			<input name="RENT" type="number"   />
        			<input type="submit" value="Set Rent" /> </tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleTradeContract}>
				<fieldset>
				<legend> OWNER SELL CONTRACT </legend>
				<tr> {"Enter Owner Address:"}
          			<input name="OWNER" type="text"  />
				{"Enter sale price (finney):"}
          			<input name="PRICE" type="number"   />
        			<input type="submit" value="Contract Trade Price" /></tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleLease}>
				<fieldset>
				<legend> LEASE CONTRACT </legend>
				<tr> 
				{"Enter Leaser Address:"}
          			<input name="SELLER" type="text"  />
				{"Enter rent (finney):"}
          			<input name="RENT" type="number"   />
        			<input type="submit" value="Lease Contract" /></tr>
				</fieldset>
      			</form>
			]
		tablerows1 = []	
		tablerows2 = [
			<table>
				<fieldset>
				<legend> CONTRACT VARIABLES </legend>			
				<th>Rent (finney)</th>				
				<th>Owner</th>				
				<th>State</th>
				<th></th>				
							
				<tr>
			  	<td>{this.state.rent/10}</td> 
			  	<td>{this.state.owner}</td>
			  	<td>{this.state.contractState}</td>  
				</tr>
				</fieldset>
			</table> 
			] 
		}
		if(this.state.contractState === 2) {
		tablerows = [

      			<form onSubmit={this.handleOffer}>
				<fieldset>
				<legend> POST CONTINGENT PAYMENT CONTRACT </legend>
				<tr> {"Enter Settler Address:"}
          			<input name="SET" type="text"  />
				{"Enter Seller Address:"}
          			<input name="SELLER" type="text"  />
				{"Enter contract (ether):"}
          			<input name="UNIT" type="number"   />
				{"Enter bid (ether):"}
          			<input name="VALUE" type="number"   />
        			<input type="submit" value="Place Bid" /> </tr>
				</fieldset>
      			</form>
			]
		tablerows1 = [
      			<form onSubmit={this.handleDefineSettlement}>
				<fieldset>
				<legend> POST SETTLEMENT CONTRACT </legend>
				<tr> {"Enter Seller Address:"}
          			<input name="SELLER" type="text"  />
				{"Enter fee (finney):"}
          			<input name="FEE" type="number"   />
        			<input type="submit" value="Define Settlement" /> </tr>
				</fieldset>
      			</form>
			]	
		tablerows2 = [
			<table>
				<fieldset>
				<legend> CONTRACT </legend>			
				<th>Seller</th>		
				<th>State</th>
				<th></th>							
				<tr>
			  	<td>{this.state.seller}</td> 
			  	<td>{this.state.contractState}</td>  
				</tr>
				</fieldset>
			</table> 
			] 
		}		
		if(this.state.contractState === 3) {
		tablerows = [
      			<form onSubmit={this.handlePurchase}>
				<fieldset>
				<legend> BUYER ACCEPT OFFER </legend>
        			<tr> Input Buyer Address :
          			<input name="BUYER" type="text"   />
        			Input Units (ether) :
          			<input name="VALUE" type="number"  />
        			<input type="submit" value="Purchase" /> </tr>
				</fieldset>
      			</form>]
      		tablerows1= [
			<form onSubmit={this.handleCancel}>
				<fieldset>
				<legend> SELLER CANCEL OFFER </legend>
        			<tr> Seller Address :
          			<input name="SELLER" type="text"  />
        			<input type="submit" value="Cancel" /> </tr>
				</fieldset>
      			</form>
			]
		tablerows2 = [
			<table>
				<fieldset>
				<legend> CONTINGENT PAYMENT CONTRACT </legend>			
				<th>Units (ether)</th>			
				<th>Value (ether)</th>			
				<th>Settlement</th>			
				<th>Seller</th>
				<th>State</th>
				<th></th>							
				<tr>
			  	<td>{this.state.units/10000}</td>
			  	<td>{this.state.value/10000}</td>
			  	<td>{this.state.set}</td>
			  	<td>{this.state.seller}</td>
			  	<td>{this.state.contractState}</td>  
				</tr>
				</fieldset>
			</table> 
			] 	
		}
		if(this.state.contractState ===4) {
		tablerows = [
			<table>
				<fieldset>
				<legend> CONTRACT POSITION PRICES </legend>					
				<th>Buyer Position Price</th>			
				<th>Seller Position Price</th>			
				<th></th>				
			
				<tr>
			  	<td>{this.state.unitsT/10000}</td>
			  	<td>{this.state.valueT/10000}</td>
				</tr>
				</fieldset>
			</table>
			]
		tablerows1= [
			<form onSubmit={this.handleSetBuyerPrice}>
 				<fieldset>
				<legend> CHANGE BUYER POSITION PRICE </legend>
        			<tr> Input Buyer Address :
          			<input name="BUYER" type="text"   />
				New Buyer Postion Price (ether) :
          			<input name="PRICE" type="number"  />
        			<input type="submit" value="BuyerPrice" /> </tr>
				</fieldset>
      			</form>,
			<form onSubmit={this.handlePurchaseBuyerPosition}>
 				<fieldset>
				<legend> PURCHASE BUYER POSITION </legend>
        			<tr> 
        			Input Address :
          			<input name="BUYER" type="text"   />
				Input Price (ether) :
          			<input name="PRICE" type="number"  />
        			<input type="submit" value="PurchaseBuyerPosition" /> </tr>
				</fieldset>
      			</form>,
			<form onSubmit={this.handleSetSellerPrice}>
 				<fieldset>
				<legend> CHANGE SELLER POSITION PRICE </legend>
        			<tr> 
        			Input Address :
          			<input name="SELLER" type="text"   />
				Input Price (ether) :
          			<input name="PRICE" type="number"  />
        			<input type="submit" value="SellerPrice" /> </tr>
				</fieldset>
      			</form>,
			<form onSubmit={this.handlePurchaseSellerPosition}>
 				<fieldset>
				<legend> PURCHASE SELLER POSITION </legend>
        			<tr>
        			Input Address : 
          			<input name="SELLER" type="text"   />
				Input Price (ether) :
          			<input name="PRICE" type="number"  />
        			<input type="submit" value="PurchaseSellerPosition" /> </tr>
				</fieldset>
      			</form>,
			<form onSubmit={this.handleSettle}>
 				<fieldset>
				<legend> SETTLE CONTINGENT PAYMENT CONTRACT </legend>
        			<tr>
        			Input Address : 
          			<input name="SENDER" type="text"   />
        			Input Settlement Fee (finney) : 
          			<input name="FEE" type="number"  />
        			<input type="submit" value="Settle" /> </tr>
				</fieldset>
      			</form>
			]
		tablerows2 = [
			<table>
				<fieldset>
				<legend> CONTINGENT PAYMENT CONTRACT </legend>			
				<th>Units (ether)</th>			
				<th>Value (ether)</th>			
				<th>Settlement</th>			
				<th>Seller</th>
				<th>Buyer</th>
				<th>State</th>
				<th>Settlement</th>
				<th></th>				
				<tr>
			  	<td>{this.state.units/10000}</td>
			  	<td>{this.state.value/10000}</td>
			  	<td>{this.state.set}</td>
			  	<td>{this.state.seller}</td>
			  	<td>{this.state.buyer}</td>
			  	<td>{this.state.contractState}</td>  
			  	<td>{this.state.settle}</td> 
				</tr>
				</fieldset>
			</table> 
			]
		}
		if(this.state.contractState === 5) {
		tablerows = [
      			<form onSubmit={this.handleCancelContractTrade}>
				<fieldset>
				<legend> CANCEL CONTRACT TRADE </legend> <tr>
				{"Enter Owner Address:"}
          			<input name="OWNER" type="text"  />
        			<input type="submit" value="Cancel Contract Trade" />
				</tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleChangeContractTrade}>
				<fieldset>
				<legend> CHANGE CONTRACT PRICE </legend> <tr>
				{"Enter Owner Address :"}
          			<input name="OWNER" type="text"  />
				{"Enter new contract price (finney) :"}
          			<input name="PRICE" type="number"   />
        			<input type="submit" value="Change Contract Trade Price" />
				</tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleConfirmContractTrade}>
				<fieldset>
				<legend> PURCHASE CONTRACT </legend> <tr>
				{"Enter Buyer Address :"}
          			<input name="BUYER" type="text"  />
				{"Enter contract price (finney) :"}
          			<input name="PRICE" type="number"   />
        			<input type="submit" value="Purchase Contract" />
				</tr>
				</fieldset>
      			</form>
			]
		tablerows1 = []	
		tablerows2 = [
			<table>
				<thead>				
				<th>Price (finney)</th>				
				<th>Owner</th>				
				<th>State</th>
				<th></th>				
				</thead>			
				<tr>
			  	<td>{this.state.valueT/10}</td> 
			  	<td>{this.state.owner}</td>
			  	<td>{this.state.contractState}</td>  
				</tr>
			</table> 
			] 
		}
		if(this.state.contractState === 6) {
		tablerows = [
 			<table>
				<fieldset>
				<legend> CONTRACT </legend>			
				<th>Fee</th>			
				<th>Reporter</th>				
				<th>State</th>								
				<tr>
			  	<td>{this.state.value/10}</td> 
			  	<td>{this.state.seller}</td>
			  	<td>{this.state.contractState}</td>  
 				</tr>
				</fieldset>
			</table> 
			]
		tablerows1 = []	
		tablerows2 = [
      			<form onSubmit={this.handlePostResult}>
				<fieldset>
				<legend> POST RESULT </legend>
				<tr> {"Enter Reporter Address:"}
          			<input name="SELLER" type="text"  />
				{"Enter Result [0,1000]:"}
          			<input name="RESULT" type="number"   />
        			<input type="submit" value="Post Result" /> </tr>
				</fieldset>
      			</form>,
			] 
		}
		if(this.state.contractState === 7) {
		tablerows = [
			<table>
				<fieldset>
				<legend> SETTLEMENT CONTRACT </legend>			
				<th>Fee</th>			
				<th>Reporter</th>				
				<th>State</th>				
				<th>Result</th>			
				<tr>
			  	<td>{this.state.value/10}</td> 
			  	<td>{this.state.seller}</td>
			  	<td>{this.state.contractState}</td> 
			  	<td>{this.state.units}</td>  
 				</tr>
				</fieldset>
			</table> 
			]
		tablerows2 = [
      			<form onSubmit={this.handleCollectFee}>
				<fieldset>
				<legend> COLLECT FEES AND CLOSE SETTLEMENT CONTRACT </legend>
				<tr> {"Enter Reporter Address:"}
          			<input name="SELLER" type="text"  />
        			<input type="submit" value="Collect Fees and Close" /> </tr>
				</fieldset>
      			</form>,
      			<form onSubmit={this.handleReset}>
				<fieldset>
				<legend> CANCEL POSTED RESULT AND RETURN TO PENDING </legend>
				<tr> {"Enter Reporter Address:"}
          			<input name="Seller" type="text"  />
        			<input type="submit" value="Return to Pending" /> </tr>
				</fieldset>
      			</form>,
			]
		}
}//Contract
		return (

 			<div className="App">
        
			<div className="App-header">

				<thead>								
				<tb>CONTRACT</tb>	
				</thead>
				<tr>
			  	<td>Contract Address---</td>
			  	<td>{currentContractAddress}</td>
				</tr>                         
			</div>
        
      			<div className="App-Content">
 			
			{tablerows}
       			{tablerows1}
 			{tablerows2} 
			{tablerows3}
			{tablerows4}
    
 			</div>
      
			</div>
   
		);
  
	}


}



export default App;
