import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessagesProps, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessagesProps {
  id: string;
  title: string;
  type?: 'success' | 'error' | 'info';
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessagesProps[]>([]);

  const addToast = useCallback((message: Omit<ToastMessagesProps, 'id'>) => {
    const token = {
      id: uuid(),
      title: message.title,
      type: message.type,
      description: message.description,
    };

    setMessages(m => [...m, token]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(m => m.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}
