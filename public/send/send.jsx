import React, { Component } from 'react';
import Header from '../app/header';
import Footer from '../app/footer';
import Loading from './loading';
import TextInput from '../app/textInput';
import Button from '../app/button';
import Success from './success';

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
      success: false
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.clearForms = this.clearForms.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  // on success, can either go to trans history
  // or need to reset send component given it renders success
  // (can't redicrect to same route)
  clickHandler(e) {
    if (e.target.value === 'send') {
      this.clearForms();
    } else {
      this.props.history.push(e.target.value);
    }
  }

  changeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  clearForms() {
    const update = {
      recipient: '',
      amount: '',
      currency: 'USD',
      symbol: '$',
      message: '',
      success: false,
      isLoading: false
    };
    this.setState(update);
  }

  nextStep() {
    this.setState({ isLoading: true });
    // wait some time, then
    setTimeout(() => { this.setState({ success: true }); }, 2000);
  }

  render() {
    if (this.state.success) {
      return <Success amount={`${this.state.symbol}${this.state.amount} ${this.state.currency}`} recipient={this.state.recipient} clickHandler={this.clickHandler} />;
    }
    return (
      <div className="send">
        <Header label="Send Money" />
        <TextInput changeHandler={this.changeHandler} name="recipient" value={this.state.recipient} label="To: "><span>CHECK</span></TextInput>
        <TextInput changeHandler={this.changeHandler} name="amount" value={this.state.amount} label={`Amount: ${this.state.symbol}`}><span>{this.state.currency}</span></TextInput>
        <TextInput changeHandler={this.changeHandler} name="message" value={this.state.message} label="Message (optional): " />
        <p>What's this payment for?</p>
        <div>I'm sending money to family or friends</div>
        <div>I'm paying for goods or services</div>
        {this.state.isLoading && <Loading />}
        <Footer>
          <Button label="Clear" clickHandler={this.clearForms} />
          <Button label="Next" clickHandler={this.nextStep} />
        </Footer>
      </div>
    );
  }
}

export default Send;
