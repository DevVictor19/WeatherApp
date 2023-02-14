import { HTMLInputTypeAttribute } from 'react';

import StyledInput from './styles';

interface InputProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

function Input(props: InputProps) {
  const { placeholder, type } = props;

  return <StyledInput type={type} placeholder={placeholder} />;
}

export default Input;
