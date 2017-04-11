import React, { Component } from 'react';
import Header from '../app/header';
import Footer from '../app/footer';
import Loading from './loading';
import TextInput from '../app/textInput';
import Button from '../app/button';
// import Success from './success';

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
      isLoading: false
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.clearForms = this.clearForms.bind(this);
    this.nextStep = this.nextStep.bind(this);
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
      message: ''
    };
    this.setState(update);
  }

  nextStep() {
    const update = {
      isLoading: true
    };
    this.setState(update);
    // wait some time, then
    // update redux with receipient
    // this.props.history.push('success');
  }

  render() {
    return (
      <div className="send">
        <Header label="Send Money" />
        <TextInput changeHandler={this.changeHandler} name="recipient" value={this.state.recipient} label="To: "><span>CHECK</span></TextInput>
        <TextInput changeHandler={this.changeHandler} name="amount" value={this.state.amount} label={`Amount: ${this.state.symbol}`}><span>{this.state.currency}</span></TextInput>
        <TextInput changeHandler={this.changeHandler} name="message" value={this.state.message} label="Message (optional): " />
        <p>What's this payment for?</p>
        <div>family or friends</div>
        <div>goods or services</div>
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
