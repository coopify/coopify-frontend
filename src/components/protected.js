import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from '../libs/cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export default @connect(state => ({
  allow: state.userDidLog
}))

class Protected extends React.Component {
  redirectUrl = '/login';

  static propTypes = {
    dispatch: PropTypes.func,
    allow: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {
    },
    allow: false
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      allow: false,
    };
  }


  render() {
    const { allow } = this.props;
    // eslint-disable-next-line
    const { children } = this.props;

    if (allow) {
      return children;
    }
    return (
      <Route render={({ staticContext }) => {
        // eslint-disable-next-line
        if (staticContext) staticContext.status = 403;
        return <Redirect to={this.redirectUrl} />;
      }}
      />
    );
  }
}

export { Protected }