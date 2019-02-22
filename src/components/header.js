import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import '../css/header.css';


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
      userDidLog: false, //hacer un componentdidmount como en el componente protected
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
    console.log('User: ' + JSON.stringify(loggedUser));
    return (
      <div>
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <Link className="navbar-item" to="/">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </Link>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
    <Link className="navbar-item" to="/home">Home</Link>

      <a className="navbar-item">
        Documentation
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>
    { !userDidLog ? (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
        <Link className="button is-primary" to='/signup'><strong>Sign up</strong></Link>
        <Link className="button is-light" to="/login">Log in </Link>
        </div>
      </div>
    </div>)
    : 
    (
<div className="navbar-end">
			<div className="navbar-item has-dropdown is-hoverable">
				<a href="#" data-toggle="dropdown" className="navbar-link" aria-expanded="false">
        
           <img className="" src='https://www.tutorialrepublic.com/examples/images/avatar/2.jpg' alt="Avatar"/> 

          {loggedUser.email} <b className="caret"></b>
        </a>
          
				<div className="navbar-dropdown">
					<a href="#" className="navbar-item"><i className="fa fa-user-o"></i> Profile</a>
					<a href="#" className="navbar-item"><i className="fa fa-sliders"></i> Settings</a>
					<hr className="navbar-divider"/>
					<a href="#" className="navbar-item"><i className="material-icons"></i> Logout</a>
				</div> 
			</div>
</div>
    )
    }
  </div>
</nav>
      </div>
    );
  }
}


export { Header }
