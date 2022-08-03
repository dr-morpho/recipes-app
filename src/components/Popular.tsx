import React from 'react';
import { useSelector } from 'react-redux';
import { fetchPopular, popularSelect } from '../redux/slices/popularSlice';
import { useAppDispatch } from '../redux/store';
import { nanoid } from '@reduxjs/toolkit';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Link } from 'react-router-dom';
import '@splidejs/react-splide/css';
import styled from 'styled-components';

const Popular: React.FC = () => {
  const dispatch = useAppDispatch();
  const popular = useSelector(popularSelect);

  React.useEffect(() => {
    if (popular.length < 1) {
      dispatch(fetchPopular());
    }
    // eslint-disable-next-line
  }, []);

  const popularMap = popular.map((elem) => (
    <SplideSlide key={nanoid()}>
      <Card>
        <Link to={'/recipes/' + elem.id}>
          <p>{elem.title}</p>
          <img src={elem.image} alt={elem.sourceName} />
        </Link>
      </Card>
      <Gradient />
    </SplideSlide>
  ));

  return (
    <WrapPopular>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 4,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            740: {
              perPage: 1,
            },
          },
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '1rem',
        }}>
        {popularMap}
      </Splide>
    </WrapPopular>
  );
};

const WrapPopular = styled.div`
  h3 {
    margin-bottom: 0.5rem;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  p {
    position: absolute;
    z-index: 1;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    font-size: 1.3rem;
    color: #ffff;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
  }
  img {
    cursor: pointer;
    position: absolute;
    left: 0;
    border-radius: 2rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Popular;
