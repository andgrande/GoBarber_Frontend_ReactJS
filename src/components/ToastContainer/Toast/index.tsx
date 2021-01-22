import React, { useEffect } from 'react';

import {
  FiAlertTriangle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { ToastMessagesProps, useToast } from '../../../context/ToastContext';

import { Container } from './styles';

interface ToastMessage {
  message: ToastMessagesProps;
  style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertTriangle size={20} />,
  success: <FiCheckCircle size={20} />,
};

const Toast: React.FC<ToastMessage> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 6000);
    // timer helps to avoid errors in case item is removed before timeout
    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
