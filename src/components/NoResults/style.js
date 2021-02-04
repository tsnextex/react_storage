import styled from 'styled-components';

export const NoResultsContainer = styled.section`
  background: #E4E8F1;
  border-radius: 4px;
  height: 111px;
  margin: 20px 0;

  h2 {
    align-items: center;
    display: flex;
    font-size: 12px !important;
    height: 100%;
  }

  .content {
    padding: 0 40px;
  }

  .icon {
    align-items: center !important;
    background: #DBDEE6;
    display: flex !important;
    font-size: 35px !important;
    height: 100%;
    justify-content: center;
    width: 135px;
  }

  .sub {
    font-size: 12px !important;
    margin-top: 5px !important;
  }

  @media (min-width: 960px) {

    h2 {
      font-size: 16px !important;
    }

    .sub {
      font-size: 16px !important;
    }
  }
`;