import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import NewChannelEntry from './NewChannelEntry';
import store, { fetchMessages, fetchChannels } from '../store';

class Main extends Component {
    componentDidMount() {
        console.log('[Main] componentDidMount match:', this.props.location);

        this.props.fetchMessages();
        this.props.fetchChannels();
    }

    componentDidUpdate() {
        console.log('[Main] componentDidUpdate match:', this.props.location);
    }

    render() {
        return (
            <div>
                <Sidebar />
                <Navbar name={this.props.name} channelName={this.props.channelName} />
                <main>
                    <Switch>
                        <Route path="/new-channel" component={NewChannelEntry} />
                        <Route path="/channels/:channelId" component={MessagesList} />
                        <Redirect to="/channels/1" />
                    </Switch>
                </main>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMessages: () => dispatch(fetchMessages()),
        fetchChannels: () => dispatch(fetchChannels())
    };
};

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        name: state.name,
        channelName: state.channelName
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
