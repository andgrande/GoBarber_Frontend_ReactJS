import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

import Input from '../../components/Input/index';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import {
  Container,
  Background,
  // RegisterSection,
  AnimationContainer,
} from './styles';

interface DataFormInputs {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DataFormInputs, { reset }: any) => {
      console.log(data);
      // reset();

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is mandatory'),
          email: Yup.string()
            .email('Enter a valid e-mail')
            .required('E-mail is mandatory'),
          password: Yup.string().min(6, 'Use at least 6 digits.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        addToast({
          title: 'Cadastro realizado',
          type: 'success',
          description: 'Você já pode fazer login na plataforma',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const error = getValidationErrors(err);
          formRef.current?.setErrors(error);
          return;
        }

        addToast({
          title: 'Falha ao cadastrar',
          type: 'error',
          description:
            'Ocorreu um erro ao cadastrar, por favor tente novamente',
        });
      }
    },
    [history],
  );

  return (
    <Container>
      <Background />
      {/* <RegisterSection> */}
      <AnimationContainer>
        <img src={logo} alt="Logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" type="text" />
          <Input name="email" icon={FiMail} placeholder="E-mail" type="text" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para o Login
        </Link>
      </AnimationContainer>
      {/* </RegisterSection> */}
    </Container>
  );
};

export default Register;
