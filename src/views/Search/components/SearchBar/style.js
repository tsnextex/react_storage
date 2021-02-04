import styled from 'styled-components';

export const CustomSearchBox = styled.section`

  .searchBox {
    background: #1B3C92;
    color: white;
    padding: 10px;
    text-align: center;
  }

  .searchBoxMobile {
    font-size: .75em;
    background: rgba(0,0,0,0.75);
    padding: 8px 12px;
  }

  .listButton {
    font-size: 14px;
  }

  @media (min-width: 960px) {
    
    .searchBoxMobile {
      height: 79px;
    }
  }
`;

export const CustomSearchDrawer = styled.section`
  position: relative;
  z-index: 3;

  .filterUnits .MuiTypography-displayBlock {
    color: #4A4A4A;
    font-size: 19px;
    font-weight: 400;
  }

  .rowTitleContainer {
    margin-bottom: 0;
    padding-bottom: 0;
    padding-top: 20px;
  }

  .rowTitle {
    margin: 0;
    padding: 0;
  }

  .rowTitle .MuiTypography-displayBlock {
    color: #4A4A4A;
    font-size: 14px;
    font-weight: 700;
  }

  .sizesBtnContent {
    color: #4A4A4A;
    display: flex;
    flex-direction: column;
    font-weight: 400;
    padding-left: 60px;
    width: 100%;
  }

  .sizesBtnTitle {
    font-size: 16px;
    line-height: 16px;
  }

  .sizesBtnDescription {
    font-size: 10px;
  }

  @media (min-width: 960px) {
    
    .makeStyles-drawerPaper-27 {
      padding-top: 27px;
    }
  }
`;