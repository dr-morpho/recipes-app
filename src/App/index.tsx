import React from 'react';
import Pages from '../pages/Pages';
import Category from '../components/Category';
import Search from '../components/Search';
import styled from 'styled-components';
import Logo from '../components/Logo';

const App: React.FC = () => {
  return (
    <Main>
      <Logo />
      <Search />
      <Category />
      <Pages />
    </Main>
  );
};

const Main = styled.div`
  margin: 0 10%;
`;
export default App;
