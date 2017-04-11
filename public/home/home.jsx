import React from 'react';
import Button from '../app/button';


const Home = ({ history }) => {
  const clickHandler = (e) => {
    history.push(e.target.value);
  };

  return (
    <div className="home">
      <Button value="send" name="send" label="Send Money" clickHandler={clickHandler} />
      <Button value="history" name="history" label="View Transaction History" clickHandler={clickHandler} />
    </div>
  );
};

export default Home;
