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

    const listStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '30%',
      height: '300px',
      overflow: 'scroll',
      border: '1px solid grey'
    };

    const listItemStyle = {
      width: '95%',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    };

    return (
      <div className="history">
        <Header label="Transaction History" />
        <div style={listStyle} onScroll={debounce(this.getData, 3000, true)}>
          {this.state.transactions.map((tran) => (
            <div style={listItemStyle} key={`${tran.date}${tran.amount}${tran.recipient}`}>
              <div style={{width: '30%'}}>{tran.date}</div><div style={{width: '30%'}}>{tran.recipient}</div><div style={{width: '30%'}}>{tran.amount}</div>
            </div>
          ))}
        </div>
        <Footer>
          <Button label="Back" clickHandler={this.clickHandler} />
        </Footer>
      </div>
    );
  }
}

export default TranHistory;
