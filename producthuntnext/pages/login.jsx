import React, {useState} from 'react';
import {css} from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import useValidationForm from '../hooks/useValidation';
import validateLogin from '../validations/validateLogin';
import firebase from '../firebase'


const Login = () => {

  const initialState = {
    email: '',
    password: ''
  }

  const {values, errors, submitForm, handleChange, handleSubmit, handleBlur} = useValidationForm(initialState, validateLogin, login );
  const [error, setError] = useState('');
  const {email, password} = values;

  async function login() {
    try {
      const user = await firebase.login(email, password);
      console.log(user);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un error al iniciar sesión! ', error.message);
      setError(error.message);
    }
  }

  return (
    <div >
      <Layout>
        <>
        <h1 css={css`
          text-align: center;
          margin-top: 5rem;
        `}>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} onBlur={handleBlur} value={email} type="email" id='email' placeholder='Tu Email' name='email'/>
          </Field>
          {errors.email && <Error>{errors.email}</Error>}
          <Field>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} onBlur={handleBlur} value={password} type="password" id='password' placeholder='Tu Password' name='password'/>
          </Field>
          {errors.password && <Error>{errors.password}</Error>}
          {error && <Error>{error}</Error>}
          <InputSubmit type="submit" value='Iniciar Sesión'/>
        </Form>
        </>
      </Layout>
    </div>
  ) 
}

export default Login;
