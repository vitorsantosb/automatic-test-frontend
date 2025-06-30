import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export function useWebSocket({ onStatus, onResult, onError }) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io('ws://localhost:3000');
    socketRef.current = socket;

    if (onStatus) socket.on('status', onStatus);
    if (onResult) socket.on('result', onResult);
    if (onError) socket.on('error', onError);

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  return socketRef;
} 