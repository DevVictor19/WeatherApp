import styled from 'styled-components';

import colors from '../../../styles/theme';

const StyledList = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  max-height: 120px;
  margin-top: -4px;
  padding: 16px;

  overflow: auto;

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  li {
    font-size: 0.875rem;
    color: ${colors['tx-black']};
    cursor: pointer;

    &:hover {
      color: #685d5d;
    }
  }

  @media screen and (min-width: 1024px) {
    gap: 16px;

    padding: 16px 18px;
    max-height: 180px;

    li {
      font-size: 1rem;
    }
  }
`;

export default StyledList;
