import React from 'react';
import { useSelector } from 'react-redux';
import { fetchSearch, searchSelect } from '../redux/slices/searchSlice';
import { useAppDispatch } from '../redux/store';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const Value: React.FC = () => {
  const searched = useSelector(searchSelect);
  const dispatch = useAppDispatch();
  const { search } = useParams();

  React.useEffect(() => {
    dispatch(fetchSearch({ search }));
    // eslint-disable-next-line
  }, [search]);

  return (
    <Grid>
      {searched.map((elem) => (
        <Link to={'/recipes/' + elem.id}>
          <Card key={nanoid()}>
            <img src={elem.image} alt={elem.title} />
            <h4>{elem.title}</h4>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
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

export default Value;
