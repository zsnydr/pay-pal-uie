import React, { Component } from 'react';
import Header from '../app/header';
import Footer from '../app/footer';
import Loading from './loading';
import TextInput from '../app/textInput';
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
  }

  render() {
    return (
      <div className="send">
        <Header label="Send Money" />
        <TextInput name="recipient" value={this.state.recipient} label="To: "><span>CHECK</span></TextInput>
        <TextInput name="amount" value={this.state.amount} label={`Amount: ${this.state.symbol}`}><span>{this.state.currency}</span></TextInput>
        <TextInput name="message" value={this.state.message} label="Message (optional): " />
        {this.state.isLoading && <Loading />}
        <Footer />
      </div>
    );
  }
}

export default Send;
