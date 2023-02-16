import { ChangeEvent } from 'react';

import debounce from '../../../utils/debounce';

import StyledInput from './styles';

interface InputProps {
  placeholder: string;
  onChange: (inputValue: string) => void;
  onClick: () => void;
}

function Input(props: InputProps) {
  const { placeholder, onChange, onClick } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(() => onChange(event.target.value), 1000);
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
}

export default Input;
