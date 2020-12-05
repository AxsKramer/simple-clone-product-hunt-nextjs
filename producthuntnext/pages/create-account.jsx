import React, {useState} from 'react';
import {css} from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';
import useValidationForm from '../hooks/useValidation';
import validateCreateAccount from '../validations/validateCreateAccount';
import firebase from '../firebase'


const CreateAccount = () => {

  const initialState = {
    name: '',
    email: '',
    password: ''
  }

  const {values, errors, submitForm, handleChange, handleSubmit, handleBlur} = useValidationForm(initialState, validateCreateAccount, createAccount );
  const [error, setError] = useState('');
  const {name, email, password} = values;

  async function createAccount() {
    try {
      await firebase.register(name, email, password);
      Router.push('/');
    } catch (error) {
      console.error('Hubo un erroral crear al usuario! ', error.message);
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
        `}>Crear Cuenta</h1>
        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="name">Nombre</label>
            <input onChange={handleChange} onBlur={handleBlur} value={name} type="text" id='name' placeholder='Tu Nombre' name='name'/>
          </Field>
          {errors.name && <Error>{errors.name}</Error>}
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
          <InputSubmit type="submit" value='Crear Cuenta'/>
        </Form>
        </>
      </Layout>
    </div>
  ) 
}

export default CreateAccount;
