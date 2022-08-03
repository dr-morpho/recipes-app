import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { cuisineSelect, fetchCuisine } from '../redux/slices/cuisineSlice';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

const Cuisine: React.FC = () => {
  const { cuisine } = useParams();
  const dispatch = useAppDispatch();
  const cuisineData = useSelector(cuisineSelect);

  React.useEffect(() => {
    dispatch(fetchCuisine({ cuisine }));
    // eslint-disable-next-line
  }, [cuisine]);

  return (
    <Grid
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      {cuisineData.map((elem) => (
        <Card key={nanoid()}>
          <Link to={'/recipes/' + elem.id}>
            <img src={elem.image} alt={elem.title} />
            <h4>{elem.title}</h4>
          </Link>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 4rem;
  padding: 3rem 0;
`;

const Card = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 2rem;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.7);
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
