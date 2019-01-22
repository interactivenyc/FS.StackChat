import { createStore, applyMiddleware, connect } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GET_MESSAGES = 'GET_MESSAGES';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_CHANNEL_NAME = 'UPDATE_CHANNEL_NAME';
const GET_MESSAGE = 'GET_MESSAGE';
const GET_CHANNELS = 'GET_CHANNELS';
const NEW_CHANNEL = 'NEW_CHANNEL';

const initialState = {
    channels: [],
    messages: [],
    newMessageEntry: '',
    name: '',
    channelName: ''
};

// ACTION CREATORS ----------------------------------------

export const getMessages = (messages) => {
    return { type: GET_MESSAGES, messages };
};

export const getChannels = (channels) => {
    return { type: GET_CHANNELS, channels };
};

export const newChannel = (channel) => {
    return { type: NEW_CHANNEL, channel };
};

export const writeMessage = (message) => {
    console.log('writeMessage', message);

    return { type: WRITE_MESSAGE, message };
};

export const updateName = (name) => {
    console.log('updateName', name);

    return { type: UPDATE_NAME, name };
};

export const updateChannelName = (name) => {
    console.log('updateChannelName', name);

    return { type: UPDATE_CHANNEL_NAME, name };
};

export const getMessage = (message) => {
    return { type: GET_MESSAGE, message };
};

// THUNKS ----------------------------------------

export const fetchMessages = () => {
    return async (dispatch) => {
        const response = await axios.get('/api/messages');
        const messages = response.data;
        const action = getMessages(messages);
        dispatch(action);
    };
};

export const fetchChannels = () => {
    console.log('[store] fetchChannels');

    return async (dispatch) => {
        const response = await axios.get('/api/channels');
        const channels = response.data;
        console.log('[store] fetchChannels length', channels.length);
        const action = getChannels(channels);
        dispatch(action);
    };
};

export const postMessage = (message) => {
    console.log('postMessage', message);
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/messages', message);
            const newMessage = response.data;
            const action = getMessage(newMessage);
            dispatch(action);

            socket.emit('new-message', newMessage);
        } catch (error) {
            console.log('error', error);
        }
    };
};

export const createChannel = (channelName) => {
    console.log('createChannel', channelName);
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/channels', channelName);
            const channel = response.data;
            const action = newChannel(channel);
            dispatch(action);

            socket.emit('new-channel', newMessage);
        } catch (error) {
            console.log('error', error);
        }
    };
};

// REDUCER ----------------------------------------

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NAME:
            return { ...state, name: action.name };
        case UPDATE_CHANNEL_NAME:
            return { ...state, channelName: action.name };
        case GET_MESSAGES:
            return { ...state, messages: action.messages };
        case GET_MESSAGE:
            return { ...state, messages: [...state.messages, action.message] };
        case WRITE_MESSAGE:
            return { ...state, newMessageEntry: action.message };
        case GET_CHANNELS:
            console.log('[store] fetchChannels finished channels:', action.channels.length);
            return { ...state, channels: action.channels };
        case NEW_CHANNEL:
            console.log('[store] fetchChannels finished channels:', action.channels.length);
            return { ...state, channels: [...state.channels, action.channels] };
        default:
            return state;
    }
};

// MIDDLEWARE ----------------------------------------

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleware));

// CREATE/EXPORT ----------------------------------------

const store = createStore(reducer, enhancer);
export default store;
