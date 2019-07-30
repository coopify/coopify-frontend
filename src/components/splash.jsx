import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default @connect(state => ({
}))

class Splash extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const params = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
    };

    const userIsLogged = localStorage.getItem('loggedUser') != null;

    if (userIsLogged) {
      return <Redirect push={false} to={'/home'}/>;
    }

    return (
      <section className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">

          <h1 className="title">
            Welcome to Coopify
        </h1>
          <h2 className="subtitle">

            Service exchange platform
        </h2>

          <Swiper  {...params}>
            <div>Hola 1</div>
            <div>Hola 2</div>
            <div>Hola 3</div>
            <div>Hola 4</div>
          </Swiper>

          <Link to="/login" className="button">Login</Link>
          {' '}
          <Link to="/signup" className="button">Signup</Link>
        </div>
      </div>
    </section>
    );
  }
}

export { Splash }
