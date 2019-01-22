import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        messages: state.messages
    };
};

class MessagesList extends Component {
    componentDidUpdate() {
        console.log('[MessagesList] componentDidUpdate', this.props.match.params);
    }
    render() {
        const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
        const messages = this.props.messages || [];
        console.log('[MessagesList] NewMessageEntry channelId, messages', channelId, messages.length);
        const filteredMessages = messages.filter((message) => message.channelId === channelId);

        return (
            <div>
                <ul className="media-list">
                    {filteredMessages.map((message) => (
                        <Message message={message} key={message.id} />
                    ))}
                </ul>
                <NewMessageEntry channelId={channelId} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagesList);
