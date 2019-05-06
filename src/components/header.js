import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/logo.png';
import { attemptLogoutAction, loadState, attemptUpdateMessage, resetError } from '../actions/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default @connect(state => ({
    loggedUser: state.user,
    userDidLog: state.userDidLog,
    status: state.status,
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
    }

    static propTypes = {
        dispatch: PropTypes.func,
        loggedUser: PropTypes.object,
        userDidLog: PropTypes.bool,
        status: PropTypes.string,
    };

    static defaultProps = {
        dispatch: () => {
        },
        loggedUser: {},
        userDidLog: false,
        status: '',
    };

    notify(message, isError) {
        if (isError) {
            toast.error(message);
        }
        else {
            toast.success(message)
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

    loadStateFromCookies() {
        const { dispatch, userDidLog } = this.props;
        if (!userDidLog) {
            dispatch(loadState());
        }
    }

    closeMenuBar() {
        this.setState({ open: false });
    }

    handleBurgerClick(e) {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }))
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(resetError());
    }

    handleLogout(e) {
        const { dispatch } = this.props;
        dispatch(attemptLogoutAction());
    }

    render() {
        const { open } = this.state;
        const { userDidLog, loggedUser, status } = this.props
        if (status && status.length > 0) this.notify(`Your proposal was ${status}`, false)

        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <Link className="navbar-item" to="/">
                            <img src={logo} width="112" height="28" />
                        </Link>

                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={e => this.handleBurgerClick(e)}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className={this.state.isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/home">Home</Link>
                            <Link to="/offer/create" className="navbar-item"><i className="fa"></i>New Offer</Link>
                            <Link to="/seeOffers" className="navbar-item"><i className="fa"></i>Offers</Link>
                        </div>
                        {!userDidLog ? (
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

                                        <img src={loggedUser.pictureURL} style={{ paddingRight: '5%' }} />

                                        {loggedUser.name} <b className="caret"></b>
                                    </a>

                                    <div className="navbar-dropdown">
                                        <Link to="/user/profile" className="navbar-item"><i className="fa fa-user-o"></i> Profile</Link>
                                        <Link to="/user/coopiesAccount" className="navbar-item"><i className="fa"></i> Transactions</Link>
                                        <Link to="/user/proposals" className="navbar-item"><i className="fa"></i> Proposals</Link>
                                        <hr className="navbar-divider" />
                                        <a href="#" onClick={e => this.handleLogout(e)} className="navbar-item"><i className="material-icons"></i> Logout</a>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </nav>
                <ToastContainer autoClose={false} />
            </div>
        );
    }
}

export { Header }
