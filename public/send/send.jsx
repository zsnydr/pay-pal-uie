import React, { Component } from 'react';
import Header from '../app/header';
import Footer from '../app/footer';
import Loading from './loading';
import TextInput from '../app/textInput';
import Button from '../app/button';
import Success from './success';
import CurrencyList from './currencyList';
import currencyLookUp from './currencyLookUp';
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
      familyFriends: false,
      goodsServices: false,
      isLoading: false,
      success: false,
      error: '',
      isValidEmail: false
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
    if (e.target.value === 'send') {
      this.clearForms();
    } else {
      this.props.history.push(e.target.value);
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  changeHandler(e) {
    const { name, value } = e.target;
    const isValidEmail = this.validateEmail(this.state.recipient);
    this.setState({ [name]: value, isValidEmail });
  }

  currencyHandler(e) {
    const select = e.target;
    const currency = select.options[select.selectedIndex].value;
    const symbol = currencyLookUp[currency];
    const update = { currency, symbol };
    this.setState(update);
  }

  clearForms() {
    const update = {
      recipient: '',
      amount: '',
      currency: 'USD',
      symbol: '$',
      message: '',
      familyFriends: false,
      goodsServices: false,
      success: false,
      isLoading: false,
      error: '',
      isValidEmail: false
    };
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

  nextStep() {
    if (!this.validateEmail(this.state.recipient)) {
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
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ success: true });
    }, 2000);
  }

  render() {
    if (this.state.success) {
      return <Success amount={`${this.state.symbol}${Number(this.state.amount).toFixed(2)} ${this.state.currency}`} recipient={this.state.recipient} clickHandler={this.clickHandler} />;
    }
    return (
      <div className="send">
        <Header label="Send Money" />
        <div className="send-container">
          <div className="send-forms">
            <TextInput changeHandler={this.changeHandler} name="recipient" value={this.state.recipient} label="To: ">
              {this.state.isValidEmail && <img className="recipient-valid-check" alt="Green Check" src="http://www.clipartbest.com/cliparts/7Ta/6oR/7Ta6oRARc.png" />}
            </TextInput>
            <TextInput changeHandler={this.changeHandler} name="amount" value={this.state.amount} label={`Amount: ${this.state.symbol} `}>
              <CurrencyList changeHandler={this.currencyHandler} />
            </TextInput>
            <TextInput changeHandler={this.changeHandler} name="message" value={this.state.message} label="Message (optional): " />
          </div>
          <div className="send-pmt-type">
            <p>What's this payment for?</p>
            <div onClick={this.familyFriends} className={this.state.familyFriends ? 'send-pmt-type-active' : ''}>
              I'm sending money to family or friends {this.state.familyFriends && <span className="send-pmt-type-checkmark">&#10003;</span>}
            </div>
            <div onClick={this.goodsServices} className={this.state.goodsServices ? 'send-pmt-type-active' : ''}>
              I'm paying for goods or services {this.state.goodsServices && <span className="send-pmt-type-check">&#10003;</span>}
            </div>
            {this.state.error.length > 0 && <ErrorMessage message={this.state.error} />}
          </div>
        </div>
        <Footer>
          <Button label="Clear" className="send-footer-button" clickHandler={this.clearForms} />
          <Button label="Next" className="send-footer-button" clickHandler={this.nextStep} />
        </Footer>
        {this.state.isLoading && <Loading />}
      </div>
    );
  }
}

export default Send;
