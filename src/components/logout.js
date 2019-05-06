import React from 'react';
import { Redirect } from 'react-router-dom';
import Authenticator from './fake-authenticator';
import SingletonPusher from './singletonPusher';

export default class Logout extends React.Component {
    onLogoutRedirectUrl = '/login';

    constructor(props) {
        super(props);
        this.state = {
            logout: false,
        };
    }

    componentDidMount() {
        Authenticator.logout();
        this.setState({
            logout: true,
        });
    }

    render() {
        const { logout } = this.state;
        if (logout) {
            SingletonPusher.getInstance().pusherDisconnect();
            return <Redirect to={this.onLogoutRedirectUrl} />;
        }
        return null;
    }
}
