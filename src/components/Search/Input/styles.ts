import styled from 'styled-components';

import colors from '../../../styles/theme';

const StyledInput = styled.input`
  all: unset;
  box-sizing: inherit;
  font-family: inherit;
  font-size: 1rem;
  color: ${colors['tx-black']};

  width: 100%;
  height: 48px;
  padding: 0 16px;

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-radius: 8px;

  @media screen and (min-width: 1024px) {
    height: 56px;
    padding: 0 18px;

    font-size: 1.125rem;
  }
`;

export default StyledInput;
