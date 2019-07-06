
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
    const bgColor = 'rgba(20,20,20,0.5)';
    const textColor = '#f9c733';

    return (
      <LoadingScreen
        loading={loading}
        bgColor={bgColor}
        spinnerColor={textColor}
        textColor={textColor}
        text="Loading"
      >
        {children}

      </LoadingScreen>
    );
  }
}

export { Loading };
