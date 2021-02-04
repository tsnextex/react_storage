import styled from 'styled-components';

export const CustomSearchFieldMobile = styled.section`
  width: 100%;

  .paperRoot {
    display: flex;
    align-items: center;
    height: 34px;
    width: 100%;
  }

  .input {
    flex: 1;
    font-family: 'Montserrat';
    font-size: 18px;
    width: 100% !important;
  }

  .input input {
    border: 0;
    border-radius: 4px !important;
  }

  @media (max-width: 960px) {
    .input {
      font-size: 12px;
    }
  }
`;