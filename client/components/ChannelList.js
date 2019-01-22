import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import withRouter from 'react-router-dom/withRouter';

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';

const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        channels: state.channels
    };
};

class ChannelList extends Component {
    constructor() {
        super();
        this.getMessageCountByChannel = this.getMessageCountByChannel.bind(this);
    }

    getMessageCountByChannel(channelId) {
        const messageArray = this.props.messages.filter((message) => {
            return message.channelId === channelId;
        });
        // console.log('[ChannelList] getMessageCountByChannel', channelId, messageArray.length);

        return messageArray.length;
    }

    render() {
        console.log('[ChannelList] render', this.props.channels);
        return (
            <ul>
                {this.props.channels.map((channel) => {
                    return (
                        <li key={channel.id}>
                            <NavLink to={`/channels/${channel.id}`} activeClassName="active">
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

export default withRouter(connect(mapStateToProps)(ChannelList));
