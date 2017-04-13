import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../app/header';
import Footer from '../app/footer';
import Loading from './loading';
import TextInput from '../app/textInput';
import TextArea from '../app/textArea';
import Button from '../app/button';
import Success from './success';
import validateEmail from './validateEmail';
import currencyLookUpList from './currencyLookUpList';
import CurrencyDropDown from './currencyDropDown';
import ErrorMessage from '../app/errorMessage';

class Send extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipient: '',
      amount: '',
      currency: 'USD',
      symbol: '$',
      message: '',
      isValidEmail: false,
      familyFriends: false,
      goodsServices: false,
      isLoading: false,
      success: false,
      error: ''
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.currencyHandler = this.currencyHandler.bind(this);
    this.clearForms = this.clearForms.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.familyFriends = this.familyFriends.bind(this);
    this.goodsServices = this.goodsServices.bind(this);
  }

  clickHandler(e) {
    if (e.target.name === 'send') {
      this.clearForms();
    } else {
      this.props.history.push(e.target.name);
    }
  }

  changeHandler(e) {
    const { name, value } = e.target;
    const isValidEmail = validateEmail(this.state.recipient);
    this.setState({ [name]: value, isValidEmail });
  }

  currencyHandler(e) {
    const select = e.target;
    const currency = select.options[select.selectedIndex].value;
    const symbol = currencyLookUpList[currency];
    const update = { currency, symbol };
    this.setState(update);
  }

  familyFriends() {
    this.setState({
      familyFriends: true,
      goodsServices: false
    });
  }

  goodsServices() {
    this.setState({
      familyFriends: false,
      goodsServices: true
    });
  }

  clearForms() {
    const update = {
      recipient: '',
      amount: '',
      currency: 'USD',
      symbol: '$',
      message: '',
      isValidEmail: false,
      familyFriends: false,
      goodsServices: false,
      success: false,
      isLoading: false,
      error: ''
    };
    this.setState(update);
  }

  nextStep() {
    if (!validateEmail(this.state.recipient)) {
      this.setState({ error: 'Please provide a vaild email address' });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 3000);
      return;
    }
    if (this.state.amount <= 0 || isNaN(Number(this.state.amount))) {
      this.setState({ error: 'Please provide an amount greater than zero' });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 3000);
      return;
    }
    if (!this.state.familyFriends && !this.state.goodsServices) {
      this.setState({ error: 'Please choose a type of payment' });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 3000);
      return;
    }
    // mimic POST request to server, expect success or error
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ success: true });
    }, 2000);
  }

  render() {
    if (this.state.success) {
      const successAttributes = {
        amount: `${this.state.symbol}${Number(this.state.amount).toFixed(2)} ${this.state.currency}`,
        recipient: this.state.recipient,
        clickHandler: this.clickHandler
      };
      return (
        <Success {...successAttributes} />
      );
    }
    return (
      <div className="send">
        <Header label="Send Money" />
        <div className="send-container">
          <div className="send-forms">
            <TextInput changeHandler={this.changeHandler} name="recipient" value={this.state.recipient} label="To: ">
              {this.state.isValidEmail && <img className="recipient-valid-check" alt="Green Check" src="http://www.clipartbest.com/cliparts/bcy/64z/bcy64zkgi.png" />}
            </TextInput>
            <TextInput changeHandler={this.changeHandler} name="amount" value={this.state.amount} label={`Amount: ${this.state.symbol}`}>
              <CurrencyDropDown changeHandler={this.currencyHandler} />
            </TextInput>
            <TextArea changeHandler={this.changeHandler} name="message" value={this.state.message} label="Message (optional): " />
          </div>
          <div className="send-pmt-type">
            <p>{"What's this payment for?"}</p>
            <div onClick={this.familyFriends} className={this.state.familyFriends ? 'send-pmt-type-active' : ''}>
              {"I'm sending money to family or friends"} {this.state.familyFriends && <span className="send-pmt-type-checkmark">&#10003;</span>}
            </div>
            <div onClick={this.goodsServices} className={this.state.goodsServices ? 'send-pmt-type-active' : ''}>
              {"I'm paying for goods or services"} {this.state.goodsServices && <span className="send-pmt-type-check">&#10003;</span>}
            </div>
            {this.state.error.length > 0 && <ErrorMessage message={this.state.error} />}
          </div>
        </div>
        <Footer>
          <Button className="send-footer-button" label="Clear" name="clear" clickHandler={this.clearForms} />
          <Button className="send-footer-button" label="Next" name="next" clickHandler={this.nextStep} />
        </Footer>
        {this.state.isLoading && <Loading />}
      </div>
    );
  }
}

Send.propTypes = {
  history: PropTypes.object
};

export default Send;
