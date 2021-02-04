import styled from 'styled-components';

export const CustomFindStorageContainer = styled.section`
  background: #F4F5F8;
  height: calc(100vh - 50px);
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 50px;
  width: 100vw;

  @media (min-width: 960px) {
    bottom: 0;
    height: calc(100vh - 77px);
    position: absolute;
    top: 77px;
    z-index: 2;

    .results {
      height: calc(100vh - 77px);
      overflow-x: hidden;
      overflow-y: scroll;
      width: 100vw;
    }
  }
`;

export const CustomFiltersRow = styled.section`

  .root {
    font-family: Montserrat;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 10px;
    border-bottom: 1px solid #E3E3E3;
  }

  .rootHide {
    display: none;
  }

  .filterContainer {
    padding: 20px 10px 10px 10px;
  }

  .text {
    margin-left: 1em;
    margin-right: 1em;
    align-self: center;
    color: #4A4A4A;
    font-family: Montserrat;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0;
  }

  .chip {
    background: transparent;
    margin: 5px 0;
    color: #1B3C92;
    font-family: Montserrat;
    font-size: 10px;
    letter-spacing: 0;
    line-height: 13px;
  }

  .close {
    color: #1B3C92;
    width: 14px;
  }

`;