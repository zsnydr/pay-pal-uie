import React from 'react';
import PropTypes from 'prop-types';
import Button from '../app/button';
import Header from '../app/header';
import Footer from '../app/footer';

const Home = ({ history }) => {
  const clickHandler = (e) => {
    history.push(e.target.name);
  };

  return (
    <div className="home">
      <Header label="What are we Doing?" />
      <div className="home-button-container">
        <Button className="home-button" label="Send Money" name="send" clickHandler={clickHandler} />
        <Button className="home-button" label="View Transaction History" name="history" clickHandler={clickHandler} />
      </div>
      <Footer />
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object
};

export default Home;
