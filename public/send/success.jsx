import React from 'react';
import Header from '../app/header';
import Footer from '../app/footer';
import Button from '../app/button';

const Success = ({ amount, recipient, clickHandler }) => {
  return (
    <div className="success">
      <Header label="Send Money" />
      <div>
        <p>You have sent {amount} to {recipient}!</p>
        CHECKMARK
      </div>
      <Footer>
        <Button value="send" name="send" label="Send Money" clickHandler={clickHandler} />
        <Button value="history" name="history" label="View Transaction History" clickHandler={clickHandler} />
      </Footer>
    </div>
  );
};

export default Success;
