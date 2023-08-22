import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
// import styled from 'styled-components';
import { Error, Loading } from '../components';

const AuthWrapper = ({ children }) => {
  const { error, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error.message);
    return <Error />;
  }

  return <>{children}</>;
};

// const Wrapper = styled.section`
//   min-height: 100vh;
//   display: grid;
//   place-items: center;
// `;

export default AuthWrapper;
