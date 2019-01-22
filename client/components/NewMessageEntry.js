import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeMessage, postMessage } from '../store';
import withRouter from 'react-router-dom/withRouter';

const mapStateToProps = (state) => {
    return {
        newMessageEntry: state.newMessageEntry,
        name: state.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        writeMessage: (newMessageEntry) => dispatch(writeMessage(newMessageEntry)),
        postMessage: (message) => dispatch(postMessage(message))
    };
};

class NewMessageEntry extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.props.writeMessage(event.target.value);
    }

    onSubmit(event) {
        event.preventDefault();
        const content = this.props.newMessageEntry;
        const channelId = this.props.channelId;
        const name = this.props.name;
        this.props.writeMessage('');
        this.props.postMessage({ name, content, channelId });
    }

    render() {
        console.log('[NewMessageEntry] render props', this.props);
        console.log('[NewMessageEntry] render channelId', this.props.channelId);

        return (
            <form id="new-message-form" onSubmit={(event) => this.onSubmit(event)}>
                <div className="input-group input-group-lg">
                    <input
                        className="form-control"
                        type="text"
                        name="content"
                        placeholder="Say something nice..."
                        value={this.props.newMessageEntry}
                        onChange={(event) => this.onChange(event)}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="submit">
                            Chat!
                        </button>
                    </span>
                </div>
            </form>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(NewMessageEntry)
);

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(NewMessageEntry);
