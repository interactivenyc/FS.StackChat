import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateName } from '../store';

class NameEntry extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        console.log('onChange', event.target.value, this.props);

        this.props.updateName(event.target.value);
    }
    render() {
        return (
            <form className="form-inline">
                <label htmlFor="name">Your name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="form-control"
                    value={this.props.name}
                    onChange={this.onChange}
                />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.name
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (name) => dispatch(updateName(name))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NameEntry);
