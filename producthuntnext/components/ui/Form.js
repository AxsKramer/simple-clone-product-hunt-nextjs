import styled from '@emotion/styled';

export const Form = styled.form`
  max-width: 600px;
  width: 95%auto;
  margin: 5rem auto 0 auto;
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label{
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input,
  textarea{
    flex: 1;
    padding: 1rem;
  }

  textarea{
    height: 400px;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;

  &:hover{
    cursor: pointer;
  }
`;

export const Error = styled.p`
  background-color: red;
  padding: .5rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;