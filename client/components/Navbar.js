import React, { Component } from 'react';
import NameEntry from './NameEntry';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.channelName = props.channelName;
    }
    render() {
        return (
            <nav>
                <h3># {this.props.channelName}</h3>
                <NameEntry />
            </nav>
        );
    }
}
