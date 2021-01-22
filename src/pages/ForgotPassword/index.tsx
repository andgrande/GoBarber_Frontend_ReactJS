import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
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
import api from '../../services/api';

interface ForgotPasswordDetails {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordDetails) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Enter a valid e-mail')
            .required('E-mail is mandatory'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail enviado',
          description:
            'Verifique sua caixa de entrada para acessar o link de recuperação de senha',
        });

        setIsEmailSent(true);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          title: 'Falha na recuperação de senha',
          type: 'error',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <LoginSection>
        <AnimationContainer>
          <img src={logo} alt="Logo" />

          {!isEmailSent ? (
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar Senha</h1>
              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Button loading={loading} type="submit">
                Recuperar
              </Button>
            </Form>
          ) : (
            <div>
              <h3>
                Email enviado com sucesso.
                <br />
                <br />
                Caso não o tenha encontrado, confira na caixa de Spams
              </h3>
            </div>
          )}
          <Link to="/">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainer>
      </LoginSection>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
