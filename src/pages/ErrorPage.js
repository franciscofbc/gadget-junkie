import React from 'react';
import styled from 'styled-components';
import { Link, useRouteError } from 'react-router-dom';
import { Footer, Navbar, Sidebar } from '../components';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <Wrapper className="page-100">
          <section>
            <h1>{error.status}</h1>
            <h3>{error.error.message}</h3>
            {/* <h3>Sorry, the page you tried cannot be found</h3> */}
            <Link to="/" className="btn">
              back to the home page
            </Link>
          </section>
        </Wrapper>
        <Footer />
      </>
    );
  }

  return <h2>another error</h2>;
};

const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
