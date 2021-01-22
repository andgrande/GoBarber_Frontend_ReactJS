import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import {
  Container,
  LoginSection,
  AnimationContainer,
  Background,
} from './styles';

interface LoginDetails {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  // console.log(user);

  const handleSubmit = useCallback(
    async (data: LoginDetails) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Enter a valid e-mail')
            .required('E-mail is mandatory'),
          password: Yup.string().required('Password is mandatory'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        const emailName = data.email.split('@', 1);

        addToast({
          title: `Bem-vindx ${emailName}`,
          type: 'success',
          description: 'Login realizado com sucesso',
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          title: 'Falha ao logar',
          type: 'error',
          description: 'Usuário ou senha inválidos',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <LoginSection>
        <AnimationContainer>
          <img src={logo} alt="Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Button type="submit">Entrar</Button>
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/register">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </LoginSection>

      <Background />
    </Container>
  );
};

export default SignIn;
