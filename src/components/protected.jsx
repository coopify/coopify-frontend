import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export default @connect(state => ({
  allow: state.userDidLog,
}))

class Protected extends React.Component {
  redirectUrl = '/login';

  static propTypes = {
    allow: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    allow: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { allow, children } = this.props;

    if (allow) {
      return children;
    }
    return (
      <Route render={() => <Redirect to={this.redirectUrl} />} />
    );
  }
}

export { Protected };
