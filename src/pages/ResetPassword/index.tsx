import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import {
  Container,
  LoginSection,
  AnimationContainer,
  Background,
} from './styles';

interface ResetPasswordFormData {
  password: string;
  passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Password is mandatory'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Passwords must match',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const param = location.search.replace('?token=', '');

        const [token] = param.split('_');
        console.log(token);

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.passwordConfirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          title: 'Falha ao resetar senha',
          type: 'error',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <LoginSection>
        <AnimationContainer>
          <img src={logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefina sua senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="New Password"
            />
            <Input
              name="passwordConfirmation"
              icon={FiLock}
              type="password"
              placeholder="Password Confirmation"
            />
            <Button type="submit">Alterar minha senha</Button>
          </Form>
        </AnimationContainer>
      </LoginSection>

      <Background />
    </Container>
  );
};

export default ResetPassword;
