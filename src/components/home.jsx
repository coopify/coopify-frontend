import React from 'react';
import PropTypes from 'prop-types';
import GuestLayout from './guest-layout';
import Protected from './protected';
import Offers from './offers';
import { Col, Row } from 'react-bootstrap';

const Column = (props) => {
  const { title, description, link } = props;
  return (
    <div className="column">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            {title}
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            {description}
            {' '}
            {!!link.length && (
              <a href={link} target="_blank" rel="noreferrer noopener nofollow"> Read more </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
Column.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default () => (
  <Protected>
    <GuestLayout>
      {/* <Row style={{height: "40"}}>
        <Col sm={3}><div>Intercambio de Servicios</div></Col>
        <Col sm={3}><div>Transacciones</div></Col>
        <Col sm={3}><div>Revisiones, pago grupal</div></Col>
        <Col sm={3}><div>Comienza a generar Coopies</div></Col>
      </Row> */}
      <Offers isHome />

    </GuestLayout>
  </Protected>

);
