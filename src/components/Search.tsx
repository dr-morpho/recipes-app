import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setText, textSelector } from '../redux/slices/inputSlice';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const text = useSelector(textSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setText(event.target.value));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/searched/' + text);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <button>
        <FiSearch size="20px" />
      </button>
      <input type="search" value={text} onChange={handleChange} />
    </FormStyle>
  );
};

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  max-width: 450px;
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-out;
  outline: none;
  &:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.3);
  }
  input {
    font-size: 1rem;
    width: 100%;
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }

  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    margin-left: 0.4rem;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
    cursor: pointer;
  }
  svg {
    color: var(--dark);
  }
`;

export default Search;
