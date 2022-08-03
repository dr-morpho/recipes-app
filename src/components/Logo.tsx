import React from 'react';
import styled from 'styled-components';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { IoMdRestaurant } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, themeSelector } from '../redux/slices/inputSlice';
import { motion } from 'framer-motion';
import Toggle from './Toggle';

const animation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Logo: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setTheme(event.target.checked));

  return (
    <LogoWrap initial="hidden" whileInView="visible">
      <motion.h2 variants={animation} transition={{ duration: 0.7 }}>
        Recipes
        <IoMdRestaurant size="20px" />
      </motion.h2>
      <Flex>
        {theme ? <IoMoonOutline size="20px" /> : <IoSunnyOutline size="20px" />}
        <Toggle change={theme} onChange={(event) => handleChange(event)} />
      </Flex>
    </LogoWrap>
  );
};

const LogoWrap = styled(motion.div)`
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: var(--dark);
  }
`;

const Flex = styled.div`
  color: var(--dark);
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

export default Logo;
