import React from 'react';
import Header from './header';
import Footer from './footer';
import 'react-toastify/dist/ReactToastify.css';


export default function (props) {
  // eslint-disable-next-line
  const { children } = props;
  return (
    <div>
      <Header/>
      <div style={{ paddingBottom: '100px' }} />
      {children}
      <br />
      <Footer />
    </div>
  );
}
