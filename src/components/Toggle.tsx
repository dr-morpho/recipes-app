import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { moodSelector, setMood } from '../redux/slices/inputSlice';

interface ToggleProp {
  change: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Toggle: React.FC<ToggleProp> = ({ onChange, change }) => {
  const dispatch = useDispatch();
  const mood = useSelector(moodSelector);

  const changeMood = () => {
    dispatch(setMood(change ? 'light' : 'dark'));
  };

  React.useEffect(() => {
    document.body.setAttribute('theme', mood);
  }, [mood]);

  return (
    <div>
      <Label>
        <Input type="checkbox" checked={change} onChange={onChange} />
        <Slider onClick={changeMood} />
      </Label>
    </div>
  );
};

const Label = styled.label`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
  &:checked + span {
    background-color: #83e250;
    &:before {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }
  }

  &:focus + span {
    box-shadow: 0 0 0 2px #00000019;
  }

  &:focus:checked + span {
    box-shadow: 0 0 0 2px #83e25082;
  }
`;

const Slider = styled.span`
  display: flex;
  cursor: pointer;
  width: 50px;
  height: 25px;
  border-radius: 45px;
  background-color: #bfbfbf;
  position: relative;
  transition: background-color 0.2s, box-shadow 0.2s;
  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    transition: 0.2s;
    background: var(--light);
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
  }

  &:active:before {
    width: 27px;
  }
`;
export default Toggle;
