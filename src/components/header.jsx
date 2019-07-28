import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatIcon from '@material-ui/icons/Chat';
import ListIcon from '@material-ui/icons/List';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import RedeemIcon from '@material-ui/icons/Redeem';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Avatar from '@material-ui/core/Avatar';
import ReactJoyride from 'react-joyride';
import logo from '../assets/logo.png';
import avatarImg from '../assets/avatar.png';

import {
  attemptLogoutAction, loadState, resetNotificationFlagsUser, attemptCheckBalanceAction,
} from '../actions/user';
import 'react-toastify/dist/ReactToastify.css';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  userDidLog: state.user.userDidLog,
  status: state.user.status,
  balance: state.user.balance,
}))

class Header extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    userDidLog: PropTypes.bool,
    status: PropTypes.string,
    balance: PropTypes.string,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    userDidLog: false,
    status: '',
    balance: '-',
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loggedUser: {},
      userDidLog: false,
      isActive: false,
      balance: '-',
    };
    this.loadStateFromCookies();
    this.useStyles = this.useStyles.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatch, loggedUser } = this.props;
    const token = localStorage.getItem('token');
    if (token && loggedUser && loggedUser.id) {
      const reqAttributes = {
        userId: loggedUser.id,
        userToken: token,
      };
      dispatch(attemptCheckBalanceAction(reqAttributes));
    }
    dispatch(resetNotificationFlagsUser());
  }

  closeMenuBar() {
    this.setState({ open: false });
  }

  handleBurgerClick(e) {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  }

  loadStateFromCookies() {
    const { dispatch, userDidLog } = this.props;
    if (!userDidLog) {
      dispatch(loadState());
    }
  }

  toggleMenuBar(e) {
    const { open } = this.state;
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.setState({
      open: !open,
    });
  }

  notify(message, isError) {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }

  handleLogout() {
    const { dispatch } = this.props;
    dispatch(attemptLogoutAction());
  }

  handleDrawerOpen() {
    this.setState({
      ...this.state,
      open: true,
    });
  }

  handleDrawerClose() {
    this.setState({
      ...this.state,
      open: false,
    });
  }

  drawerWidth = 240;

  useStyles() {
    return makeStyles(theme => ({

      root: {
        display: 'flex',
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    }))
  };

  render() {
    const { open } = this.state;
    const { loggedUser, status, balance } = this.props;
    const userPicture = loggedUser != null && loggedUser.pictureURL != null ? loggedUser.pictureURL : avatarImg;
    if (status && status.length > 0) this.notify(`Your proposal was ${status}`, false);
    const classes = this.useStyles();
    let links = [
      { title: 'Home', url: '/home', icon: <ListIcon /> },
      { title: 'Goals', url: '/goals', icon: <RedeemIcon /> },
      { title: 'Login', url: '/login', icon: <i className="material-icons"> person </i> },
    ];
    if (loggedUser && loggedUser.id) {
      links = [
        { title: 'Home', url: '/home', icon: <i className="material-icons"> home </i> },
        { title: 'Services', url: '/seeOffers', icon: <ListIcon /> },
        { title: 'Transactions', url: '/user/coopiesAccount', icon: <SwapHorizIcon /> },
        { title: 'Proposals', url: '/user/proposals', icon: <BorderColorIcon /> },
        { title: 'Conversations', url: '/user/conversations', icon: <ChatIcon /> },
        { title: 'My Goals', url: '/goals', icon: <RedeemIcon /> },
      ];
    }

    const steps = [
      {
        target: '.hamburguerBtn',
        content: 'This is the main menu where you can do all your tasks...',
      },
      {
        target: '.transactions',
        content: 'Here you can see your transactions. in the platform..',
      },
    ]

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          style={{ backgroundColor: '#4a4a4a', height: '48px', boxShadow: 'none', borderBottom: '1px solid #c7c6cc' }}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <IconButton style={{ marginTop: '-15px' }}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className="hamburguerBtn"
            >
              <MenuIcon />
            </IconButton>
            {loggedUser ? (
              <div style={{ display: 'inline-flex' }}>
                <i className="material-icons"> attach_money </i>
                <p className='coopyBalance' > {balance} </p>
              </div>)
              : ''}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          {loggedUser && loggedUser.id ? (
            <div>
              <IconButton>
                <Avatar src={userPicture} style={{ width: '90px', height: '90px' }} />
              </IconButton>
              <Link to={`/user/profile/${loggedUser.id}`}>
                <h2>{loggedUser.name}</h2>
              </Link>
              <Divider />
            </div>
          ) : ''
          }
          <List>
            {links.map((text, index) => (
              <Link to={text.url}>
                <ListItem button key={text}>
                  <ListItemIcon>{text.icon}</ListItemIcon>
                  <ListItemText primary={text.title} />
                </ListItem>
              </Link>
            ))}
          </List>

          {loggedUser && loggedUser.id ? (
            <div>
              <Divider />
              <List>
                <Link to="/login">
                  <ListItem button key="logout" onClick={() => this.handleLogout()}>
                    <ListItemIcon>{<PowerSettingsNewIcon />}</ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </Link>
              </List>
            </div>
          ) : ''
          }
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>

    );
  }
}


export { Header };
