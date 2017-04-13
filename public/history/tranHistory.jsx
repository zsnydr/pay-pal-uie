import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../app/header';
import Footer from '../app/footer';
import Button from '../app/button';
import debounce from '../app/debounce';

class TranHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      firstIndex: 0,
      lastIndex: 1
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.getTransactions = this.getTransactions.bind(this);

    this.getTransactions();
  }

  getTransactions() {
    axios.get(`/api/transactions?start=${this.state.firstIndex}&end=${this.state.lastIndex}`)
      .then(({ data }) => {
        console.log('Data from server ', data);
        const update = {
          transactions: [...this.state.transactions, ...data],
          firstIndex: this.state.firstIndex + 1,
          lastIndex: this.state.lastIndex + 1
        };
        this.setState(update);
      })
      .catch((err) => {
        console.log('Error getting data ', err);
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
          <div className="trans-list">Fetching data...</div>
          <Footer>
            <Button className="trans-history-footer-button" label="Back" clickHandler={this.clickHandler} />
          </Footer>
        </div>
      );
    }
    return (
      <div className="trans-history">
        <Header label="Transaction History" />
        <div className="trans-list" onScroll={debounce(this.getTransactions, 3000, true)}>
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
