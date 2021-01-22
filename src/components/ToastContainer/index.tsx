import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessagesProps } from '../../context/ToastContext';
import Toast from './Toast/index';

import { Container } from './styles';

interface MessagesProps {
  messages: ToastMessagesProps[];
}

const ToastContainer: React.FC<MessagesProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(messages, msg => msg.id, {
    /* from: { top: '-150%', opacity: 0 },
    enter: { top: '0%', opacity: 1 },
    leave: { top: '-150%', opacity: 1 }, */
    from: { transform: 'translate3d(0,-120px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-120px,0)', opacity: 0 },
  });
  return (
    <Container>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
