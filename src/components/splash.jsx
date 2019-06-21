import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';

export default () => {

  const params = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
  };

  return (
    <Swiper  {...params}>

    <div>
      
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
        {' '}
        <Link to="/signup" className="button">Signup</Link>
        </div>
    </div>
  </section>

    </div>
    <div>Slide 2</div>
    <div>Slide 3</div>
    <div>Slide 4</div>
    <div>Slide 5</div>




  </Swiper>
  );
}
