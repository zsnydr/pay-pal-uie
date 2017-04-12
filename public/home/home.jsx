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
      <div className="home-button-container">
        <Button value="send" name="send" label="Send Money" className="home-button" clickHandler={clickHandler} />
        <Button value="history" name="history" label="View Transaction History" className="home-button" clickHandler={clickHandler} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
