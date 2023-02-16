import { HTMLInputTypeAttribute, ChangeEvent } from 'react';

import debounce from '../../../utils/debounce';

import StyledInput from './styles';

interface InputProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: (inputValue: string) => void;
  onClick: () => void;
}

function Input(props: InputProps) {
  const { placeholder, type, onChange, onClick } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(() => onChange(event.target.value), 1000);
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      onClick={handleClick}
    />
  );
}

export default Input;
