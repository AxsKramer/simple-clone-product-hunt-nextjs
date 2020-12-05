import React, { useContext } from 'react';
import {useRouter} from 'next/router';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/react';
import Link from 'next/link';
import Search from '../ui/Search';
import Navbar from './Navbar';
import Boton from '../ui/Boton';
import {FirebaseContext} from '../../firebase';

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width:768px){
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`;

const Header = () => {

  const { firebase, user } = useContext(FirebaseContext);

  const router = useRouter()

  return ( 
    <header css={css`
      border-bottom: 2px solid var(--gris3);
      padding: 1rem 0;
    `}>
      
      <ContenedorHeader>
        <div css={css`
          display: flex;
          align-items: center;
        `}>
          <Link href='/'>
            <Logo>P</Logo>
          </Link>
          <Search />
          <Navbar />
        </div>
        <div 
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {
            user ? (
              <>
                <p css= {css`
                  margin-right: 2rem;
                  `}
                >Hola {user.displayName}</p>
                <Boton 
                  bgColor='true'
                  onClick={() => {
                    firebase.logout()
                    router.push('/');
                  }}  
                >Cerrar Sesión</Boton>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <Boton
                    bgColor='true'
                  >Login</Boton> 
                </Link>
                <Link href='/create-account'>
                  <Boton >Crear Cuenta</Boton>
                </Link>
              </>
            )
          }
        </div>
      </ContenedorHeader>
    </header>
  );
}
 
export default Header;