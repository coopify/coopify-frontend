import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/logo.png';
import {attemptLogoutAction, loadState} from '../actions/user';
import Pusher from 'pusher-js';

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
      isActive: false,
    };
      this.loadStateFromCookies();
      this.initializePusher();
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

  loadStateFromCookies(){
    const {dispatch, userDidLog} = this.props;
    if(!userDidLog){
      dispatch(loadState());
    }
  }

  initializePusher(){

    const { dispatch, loggedUser } = this.props;

    const pusherAppKey = global.PUSHER_APP_KEY;
    const pusherCluster = global.PUSHER_APP_CLUSTER;

    let pusher = new Pusher(pusherAppKey, {
      cluster: pusherCluster
    });

    if(loggedUser.id){
      let channel = pusher.subscribe(loggedUser.id);

      channel.bind('message', function(data) {
        alert('An event was triggered with message: ' + data.text); //TODO hacer el dispatch ...
      });
    }
  }

  closeMenuBar() {
    this.setState({ open: false });
  }

  handleBurgerClick(e){
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  handleLogout(e){
    const { dispatch } = this.props;  
    dispatch(attemptLogoutAction());
  }

  render() {
    const { open } = this.state;
    const { userDidLog, loggedUser } = this.props

    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src={logo} width="112" height="28"/>
            </Link>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={e => this.handleBurgerClick(e)}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className={ this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-start">
            <Link className="navbar-item" to="/home">Home</Link>
            <Link to="/offer/create" className="navbar-item"><i className="fa"></i>New Offer</Link>
            <Link to="/seeOffers" className="navbar-item"><i className="fa"></i>Offers</Link>
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
            (<div className="navbar-end">

               <Link to="/user/conversations" className="navbar-item"><i className="fa fa-comments"></i></Link>

              <div className="navbar-item has-dropdown is-hoverable">
                <a href="#" data-toggle="dropdown" className="navbar-link" aria-expanded="false">

                  <img src={loggedUser.pictureURL} style={{paddingRight: '5%'}}/> 

                  {loggedUser.name} <b className="caret"></b>
                </a>
                  
                <div className="navbar-dropdown">
                  <Link to="/user/profile" className="navbar-item"><i className="fa fa-user-o"></i> Profile</Link>
                  <Link to="/user/coopiesAccount" className="navbar-item"><i className="fa"></i> Transactions</Link>
                  <hr className="navbar-divider"/>
                  <a href="#" onClick={e => this.handleLogout(e)} className="navbar-item"><i className="material-icons"></i> Logout</a>
                </div> 
              </div>
            </div>)
            }
          </div>
        </nav>
      </div>
    );
  }
}


export { Header }
