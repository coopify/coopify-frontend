
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingScreen from 'react-loading-screen';

export default @connect(state => ({
  loading: state.loading,
}))

class Loading extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { loading, children } = this.props;

    return (
      <LoadingScreen
        loading={loading}
        bgColor="rgba(0,0,0,0.6)"
        spinnerColor="#f9c733"
        textColor="#f9c733"
        text="Loading..."
      >
        {children}

      </LoadingScreen>
    );
  }
}

export { Loading };
