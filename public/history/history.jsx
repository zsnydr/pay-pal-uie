import React, { Component } from 'react';
import axios from 'axios';
import Header from '../app/header';
import Footer from '../app/footer';
import Button from '../app/button';

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func(args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func(args);
    }
  };
}

class TranHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      firstIndex: 0,
      lastIndex: 1
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.getData = this.getData.bind(this);

    this.getData();
  }

  getData() {
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
      return <div>Fetching data...</div>;
    }

    return (
      <div className="trans-history">
        <Header label="Transaction History" />
        <div className="trans-list" onScroll={debounce(this.getData, 3000, true)}>
          {this.state.transactions.map((tran) => (
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

export default TranHistory;
