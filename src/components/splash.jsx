import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <section className="hero is-info is-fullheight">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">
            Welcome to Coopify
        </h1>
        <h2 className="subtitle">

        Service exchange platform
        </h2>
        <Link to="/login" className="button">Login</Link>
      </div>
    </div>
  </section>
);
