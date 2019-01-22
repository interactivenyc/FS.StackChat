import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';
import { updateChannelName } from '../store';

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

class ChannelList extends Component {
    constructor() {
        super();
        this.getMessageCountByChannel = this.getMessageCountByChannel.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    getMessageCountByChannel(channelId) {
        const messageArray = this.props.messages.filter((message) => {
            return message.channelId === channelId;
        });

        return messageArray.length;
    }

    clickHandler(channelName) {
        console.log('[ ChannelList ] clickHandler', channelName);
        this.props.updateChannelName(channelName);
    }

    render() {
        console.log('[ChannelList] render', this.props.channels);
        return (
            <ul>
                {this.props.channels.map((channel) => {
                    return (
                        <li key={channel.id}>
                            <NavLink
                                onClick={() => this.clickHandler(channel.name)}
                                to={`/channels/${channel.id}`}
                                activeClassName="active"
                            >
                                <span># {channel.name}</span>
                                <span className="badge">{this.getMessageCountByChannel(channel.id)}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        channels: state.channels
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateChannelName: (name) => dispatch(updateChannelName(name))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ChannelList)
);
