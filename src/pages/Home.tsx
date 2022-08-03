import React from 'react';
import Veggie from '../components/Veggie';
import Popular from '../components/Popular';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <WrapHome
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <Veggie />
      <Popular />
    </WrapHome>
  );
};

const WrapHome = styled(motion.div)`
  padding: 2rem 0;
`;

export default Home;
