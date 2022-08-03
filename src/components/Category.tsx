import React from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const animation = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Category: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ListContainer>
      <List
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.7 }}
        variants={animation}>
        <LinkStyled to={'/cuisine/Italian'}>
          <FaPizzaSlice />
          <p>Italian</p>
        </LinkStyled>
        <LinkStyled to={'/cuisine/American'}>
          <FaHamburger />
          <>American</>
        </LinkStyled>
        <LinkStyled to={'/cuisine/Thai'}>
          <GiNoodles />
          <p>Thai</p>
        </LinkStyled>
        <LinkStyled to={'/cuisine/Korean'}>
          <GiChopsticks />
          <p>Korean</p>
        </LinkStyled>
      </List>
      {pathname !== '/' ? (
        <Button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}>
          <p>Home</p>
        </Button>
      ) : null}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled(motion.button)`
  cursor: pointer;
  padding: 0.35rem;
  background-color: inherit;
  color: inherit;
  text-align: center;
  max-width: 80px;
  width: 100%;
  border-radius: 1rem;
  border: none;
  outline: none;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.7);
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: var(--dark);
    color: var(--light);
  }
  &:active {
    transform: scale(0.87);
    background-color: var(--dark);
    color: var(--light);
  }

  p {
    font-size: 1rem;
  }
`;

const List = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
  gap: 1rem;
  @media (max-width: 450px) {
    gap: 0.5rem;
  }
`;

const LinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  transition: all 0.2s ease-in-out;
  transform: scale(0.9);

  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: var(--dark);
    color: var(--light);
    p {
      color: var(--light);
    }
  }
  &.active {
    background-color: var(--dark);
    color: var(--light);
    p {
      color: var(--light);
    }
  }

  @media (max-width: 450px) {
    transform: scale(0.7);
  }
`;

export default Category;
