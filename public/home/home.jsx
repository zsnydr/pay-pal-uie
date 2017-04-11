import React from 'react';
import Button from '../app/button';
import Header from '../app/header';
import Footer from '../app/footer';


const Home = ({ history }) => {
  const clickHandler = (e) => {
    history.push(e.target.value);
  };

  return (
    <div className="home">
      <Header label="What are we Doing?" />
      <Button value="send" name="send" label="Send Money" clickHandler={clickHandler} />
      <Button value="history" name="history" label="View Transaction History" clickHandler={clickHandler} />
      <Footer />
    </div>
  );
};

export default Home;
