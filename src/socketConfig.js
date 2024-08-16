import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_CLIENT_URL);

export default socket;