import React from 'react';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { vegetarianSelect } from '../redux/slices/vegitarianSlice';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useAppDispatch } from '../redux/store';
import { fetchVegetarian } from '../redux/slices/vegitarianSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Veggie: React.FC = () => {
  const veggie = useSelector(vegetarianSelect);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (veggie.length < 1) {
      dispatch(fetchVegetarian());
    }
    // eslint-disable-next-line
  }, []);

  const veggieMap = veggie.map((elem) => (
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
    <WrapVeggie>
      <h3>Vegitarian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            740: {
              perPage: 1,
            },
          },
          pagination: false,
          drag: 'free',
          gap: '1rem',
        }}>
        {veggieMap}
      </Splide>
    </WrapVeggie>
  );
};

const WrapVeggie = styled.div`
  margin-bottom: 2rem;
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

export default Veggie;
