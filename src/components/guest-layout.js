import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from './header';
import Footer from './footer';
import 'react-toastify/dist/ReactToastify.css';


export default function (props) {
  // eslint-disable-next-line
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <br />
      <Footer />
    </div>
  );
}
