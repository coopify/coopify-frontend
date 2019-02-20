import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default @connect(state => ({
  loggedUser: state.user,
  userDidLog: state.userDidLog
}))


class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loggedUser: {},
      userDidLog: false,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    userDidLog: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    userDidLog: false
  };
  

  toggleMenuBar(e) {
    const { open } = this.state;
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({
      open: !open,
    });
  }

  closeMenuBar() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { userDidLog, loggedUser } = this.props
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              {/* <Link to="/" className=" navbar-item"><strong>ReactPWA</strong></Link> */}
              <Link to="/" className=" navbar-item"><strong>Coopify</strong></Link>
              <button
                type="button"
                onClick={e => this.toggleMenuBar(e)}
                className={`navbar-burger ${open ? 'is-active' : ''}`}
                aria-label="menu"
                aria-expanded="false"
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
            <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
              <Link className="navbar-item" to="/home" onClick={() => this.closeMenuBar()}>
                Home
              </Link>
              <Link className="navbar-item" to="/login" onClick={() => this.closeMenuBar()}>
                { userDidLog ? 'LogOut' : 'LogIn' }                
                
              </Link>
              {/* <Link className="navbar-item" to="/global-local-css" onClick={() => this.closeMenuBar()}>
                Global & Local CSS
              </Link>
              <Link className="navbar-item" to="/typescript-counter" onClick={() => this.closeMenuBar()}>
                TypeScript Counter
              </Link>
              <Link className="navbar-item" to="/skeleton-loading" onClick={() => this.closeMenuBar()}>
                Skeleton Loading
              </Link>
              <Link className="navbar-item" to="/image-optimization" onClick={() => this.closeMenuBar()}>
                Image Optimization
              </Link>
              <Link className="navbar-item" to="/login" onClick={() => this.closeMenuBar()}>
                LogIn
              </Link>
              <Link className="navbar-item" to="/contribute" onClick={() => this.closeMenuBar()}>
                Contribute
              </Link> */}
              {/* <a
                className="navbar-item has-text-danger"
                href="https://www.reactpwa.com"
                onClick={() => this.closeMenuBar()}
              >
                Visit ReactPWA.com
              </a> */}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}


export { Header }
