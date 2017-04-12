import React from 'react';

const overStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const imgStyle = {
  width: '20%'
};

const Loading = () => (
  <div style={overStyle}>
    <img style={imgStyle} src="http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_gray_512.gif" alt="Loading Spinner" />
  </div>
);

export default Loading;
