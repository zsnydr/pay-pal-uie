import React from 'react';
import Header from '../app/header';
import Footer from '../app/footer';
import Button from '../app/button';

const Success = ({ amount, recipient, clickHandler }) => {
  return (
    <div className="send-success">
      <Header label="Send Money" />
      <div className="send-success-container">
        <p>You have sent {amount} to {recipient}!</p>
        <span className="send-success-checkmark">&#10003;</span>
      </div>
      <Footer>
        <Button className="send-success-footer-button" value="send" name="send" label="Send Money" clickHandler={clickHandler} />
        <Button className="send-success-footer-button" value="history" name="history" label="Transaction History" clickHandler={clickHandler} />
      </Footer>
    </div>
  );
};

export default Success;
