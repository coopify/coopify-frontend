import React from 'react';
import Header from './header';
import Footer from './footer';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from './loading';


export default function (props) {
  // eslint-disable-next-line
  const { children } = props;
  return (
    <div>
      <Loading>
        <Header />
        <div style={{ paddingBottom: '60px' }} />
        {children}
        <br />
        <Footer />
      </Loading>
    </div>
  );
}
