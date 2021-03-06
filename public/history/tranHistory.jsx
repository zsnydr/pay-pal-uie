import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../app/header';
import Footer from '../app/footer';
import Button from '../app/button';
import throttle from './throttle';

class TranHistory extends Component {
  constructor(props) {
    super(props);

    // a more scalable approach would be to control dataPerFetch and index
    // with a config object and/or pass it as props, maybe even from user input
    this.state = {
      transactions: [],
      noMoreData: false,
      dataPerFetch: 20,
      index: 0
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.loadNextData = throttle(this.getTransactions, 1000);

    this.getTransactions();
  }

  getTransactions() {
    if (this.state.noMoreData) return;
    axios.get(`/api/transactions?index=${this.state.index}&amt=${this.state.dataPerFetch}`)
      .then(({ data }) => {
        const update = {
          transactions: [...this.state.transactions, ...data],
          noMoreData: data.length === 0,  // determines if next API call is necessary
          index: this.state.index + 1
        };
        this.setState(update);  // instead, could use Redux to mimic state of Redis
      })
      .catch((err) => {
        console.log(`Error getting transaction data: ${err}`);
        // TODO: handle error gracefully
      });
  }

  clickHandler() {
    this.props.history.push('');
  }

  render() {
    if (!this.state.transactions.length) {
      return (
        <div className="trans-history">
          <Header label="Transaction History" />
          <div className="trans-list">Waiting for transaction data</div>
          <Footer>
            <Button className="trans-history-footer-button" label="Back" clickHandler={this.clickHandler} />
          </Footer>
        </div>
      );
    }
    return (
      <div className="trans-history">
        <Header label="Transaction History" />
        <div className="trans-list" onScroll={this.loadNextData}>
          {this.state.transactions.map(tran => (
            <div className="trans-list-item" key={`${tran.date}${tran.amount}${tran.recipient}`}>
              <span>{tran.date}</span>
              <span>{tran.recipient}</span>
              <span>{tran.amount}</span>
            </div>
          ))}
        </div>
        <Footer>
          <Button className="trans-history-footer-button" label="Back" clickHandler={this.clickHandler} />
        </Footer>
      </div>
    );
  }
}

TranHistory.propTypes = {
  history: PropTypes.object
};

export default TranHistory;
