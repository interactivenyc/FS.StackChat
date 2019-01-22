import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateChannelName, createChannel } from '../store';

class NewChannelEntry extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        console.log('onChange', event.target.value, this.props);

        this.props.updateChannelName(event.target.value);
    }

    onSubmit(event) {
        event.preventDefault();
        const channelName = this.props.channelName;
        this.props.updateChannelName('');
        this.props.createChannel(channelName);
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Create a Channel</label>
                    <input
                        className="form-control"
                        type="text"
                        name="channelName"
                        placeholder="Enter channel name"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">
                        Create Channel
                    </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channelName: state.channelName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateChannelName: (name) => dispatch(updateChannelName(name)),
        createChannel: (name) => dispatch(createChannel(name))
    };
};

/** Write your `connect` component below! **/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewChannelEntry);
