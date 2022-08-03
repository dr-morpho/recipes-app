import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type RecipesType = {
  image: string;
  title: string;
  id: string;
  summary: string;
  instructions: string;
};

const Recipes: React.FC = () => {
  const [details, setDetails] = React.useState<RecipesType>();
  const [active, setActive] = React.useState<string>('Info');
  const { id } = useParams();

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=d9a8562166434e38ba6d72eba22fea04`,
        );
        setDetails(data);
      } catch (error) {
        console.log('rejected');
      }
    };
    fetchDetail();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      {details ? (
        <Grid>
          <div>
            <h2>{details.title}</h2>
            <img src={details?.image} alt={details?.title} />
          </div>
          <div>
            <Flex>
              <Button
                className={active === 'Info' ? 'active' : ''}
                onClick={() => setActive('Info')}>
                <p>Info</p>
              </Button>
              <Button
                className={active === 'Recipe' ? 'active' : ''}
                onClick={() => setActive('Recipe')}>
                <p>Recipe</p>
              </Button>
            </Flex>
            {active === 'Info' && (
              <Text dangerouslySetInnerHTML={{ __html: details.summary }}></Text>
            )}
            {active === 'Recipe' && (
              <Text dangerouslySetInnerHTML={{ __html: details.instructions }}></Text>
            )}
          </div>
        </Grid>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

const Grid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  padding: 3rem 0;
  grid-gap: 2rem;
  .active {
    background-color: var(--dark);
    color: var(--light);
  }
  h2 {
    margin-bottom: 1rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.5);
  }
`;

const Text = styled.p`
  font-size: 1.3rem;
  line-height: 1.8rem;
`;
const Button = styled.button`
  cursor: pointer;
  padding: 0.35rem 1rem;
  background-color: inherit;
  color: inherit;
  max-width: 120px;
  width: 100%;
  border-radius: 1rem;
  border: none;
  outline: none;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.7);
  transition: all 0.2s ease-in-out;

  .active {
    background-color: var(--dark);
    color: var(--light);
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: var(--dark);
    color: var(--light);
    p {
      color: var(--light);
    }
  }
  &:active {
    transform: scale(0.87);
    background-color: #000000b8;
    color: var(--light);
    p {
      color: var(--light);
    }
  }

  p {
    font-size: 1rem;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export default Recipes;
