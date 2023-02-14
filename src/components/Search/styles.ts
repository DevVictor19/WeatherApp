import styled from 'styled-components';

import colors from '../../styles/theme';

const Container = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 520px;
  padding: 0 24px;

  h1 {
    color: ${colors['tx-black']};
    font-size: 2rem;
    text-align: center;
    font-weight: 600;
    margin-bottom: 18px;
  }

  @media screen and (min-width: 480px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 64px;
    max-width: 680px;

    h1 {
      font-size: 2.5rem;
    }
  }
`;

export default Container;
