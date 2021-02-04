import styled from 'styled-components';

export const LocationCardCustomContainer = styled.section`
  padding: 10px;
  width: 100%;

  .locationTop {
    display: flex;
    width: 100%;
  }

  .locationBottom {
    min-width: 184px;
  }

  @media (min-width: 960px) {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
`;