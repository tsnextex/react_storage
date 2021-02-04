import styled from 'styled-components';

export const StorageFeaturesContainer = styled.section`

  .root {
    background: #F3F3F3;
    display: flex;
    padding: 4em 2.5em 1.5em 2.5em;
    text-align: center;
  }

  .card {
    align-items: center;
    background: #FFF;
    display: flex;
    flex-direction: column;
    height: 135px;
    justify-content: space-evenly;
    margin-top: 1.2em;
    overflow: visible;
    padding: 2em;
    position: relative;
  }

  .title {
    color: #1B3C92;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .subtitle {
    color: #4A4A4A;
    font-weight: 400;
    padding-top: .3px;
    font-size: 35px;
  }

  .subSubtitle {
    color: #4A4A4A;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.5px;
    max-width: 500px;
    padding: 1em 0;
  }

  .stepsRow {
    max-width: 1100px;
    padding-top: 1.2em;
  }

  .step {
    max-width: 450px;
    padding: 0.75em;
  }

  .icon {
    color: #1B3C92;
    height: 45px;
    position: absolute;
    top: -22px;
    width: 45px;
  }

  .stepTitle {
    color: #0D1D48;
    font-weight: 400;
    font-size: 24px;
  }

  @media (max-width: 600px) {
    .root {
      padding: 1.5em;
    }

    .card {
      height: 85px;
      padding: 1.5em;
    }

    .title {
      font-size: 10px;
    }

    .subtitle {
      font-size: 22px;
    }

    .subSubtitle {
      font-size: 12px;
      line-height: 17px;
      padding: 5px;
    }

    .icon {
      height: 38px;
      width: 38px;
    }

    .stepTitle {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
