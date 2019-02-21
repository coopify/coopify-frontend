import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/header.css';
import '../css/material_icons.css';


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
<nav className="navbar navbar-default navbar-expand-xl navbar-light">
	<div className="navbar-header d-flex col">
		<a className="navbar-brand" href="#"><i className="fa fa-cube"></i>Coopify</a>  		
		<button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle navbar-toggler ml-auto">
			<span className="navbar-toggler-icon"></span>
			<span className="icon-bar"></span>
			<span className="icon-bar"></span>
			<span className="icon-bar"></span>
		</button>
	</div>

	<div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
		<ul className="nav navbar-nav">
			<li className="nav-item active"><a href="#" className="nav-link">Home</a></li>
			<li className="nav-item"><a href="#" className="nav-link">About</a></li>
			<li className="nav-item dropdown">
				<a data-toggle="dropdown" className="nav-link dropdown-toggle" href="#">Services <b className="caret"></b></a>
				<ul className="dropdown-menu">					
					<li><a href="#" className="dropdown-item">Web Design</a></li>
					<li><a href="#" className="dropdown-item">Web Development</a></li>
					<li><a href="#" className="dropdown-item">Graphic Design</a></li>
					<li><a href="#" className="dropdown-item">Digital Marketing</a></li>
				</ul>
			</li>
		</ul>
		<form className="navbar-form form-inline">
			<div className="input-group search-box">								
				<input type="text" id="search" className="form-control" placeholder="Search by Name"/>
				<span className="input-group-addon"><i className="material-icons"></i></span>
			</div>
		</form>

    {userDidLog ? (
		<ul className="nav navbar-nav navbar-right ml-auto">
			<li className="nav-item"><a href="#" className="nav-link notifications"><i className="fa fa-bell-o"></i><span className="badge">1</span></a></li>
			<li className="nav-item"><a href="#" className="nav-link messages"><i className="fa fa-envelope-o"></i><span className="badge">10</span></a></li>
			<li className="nav-item dropdown">
				<a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle user-action" aria-expanded="false"><img src='https://www.tutorialrepublic.com/examples/images/avatar/2.jpg' className="avatar" alt="Avatar"/> {loggedUser.email} <b className="caret"></b></a>
				<ul className="dropdown-menu">
					<li><a href="#" className="dropdown-item"><i className="fa fa-user-o"></i> Profile</a></li>
					<li><a href="#" className="dropdown-item"><i className="fa fa-calendar-o"></i> Calendar</a></li>
					<li><a href="#" className="dropdown-item"><i className="fa fa-sliders"></i> Settings</a></li>
					<li className="divider dropdown-divider"></li>
					<li><a href="#" className="dropdown-item"><i className="material-icons"></i> Logout</a></li>
				</ul> 
			</li>
    </ul>)
    : "" }
	</div>
</nav>
      </div>
    );
  }
}


export { Header }
