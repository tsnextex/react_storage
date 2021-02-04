import styled from 'styled-components';
import { Dropdown } from "semantic-ui-react";

export const DropdownRow = styled.div `
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 5px;
  column-gap: 9px;

  @media (max-width: 100%) {
    grid-template-columns: 1fr;
  }
`;

export const StyledDropdown = styled(Dropdown)
`
  &.ui.dropdown i.dropdown.icon {
    color: #4A4A4A;
    font-size: 16px;
    padding: 9px;
  }
  &.ui.dropdown {
    color: #4A4A4A;
    font-size: 12px;
    line-height: 26px;
    padding: 6px 16px;
  }
`;

export const UnitImageContainer = styled.div ` 
  position: relative;
`;

export const TempImage = styled.img ` 
  width: 100%;
  opacity: 0;
`;

export const UnitImage = styled.img `
  width: 100%;
  margin: 0 auto; 

  position: absolute;
  right: -100%; 
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 2s;
  animation: slide 0.5s forwards;
  animation-delay: 2s;

  #slide {
      position: absolute;
      right: -100%;
      width: 100%;
      background: blue;
      -webkit-animation: slide 0.5s forwards;
      -webkit-animation-delay: 2s;
      animation: slide 0.5s forwards;
      animation-delay: 0.5s;
  }

  @-webkit-keyframes slide {
      100% { right: 0; }
  }

  @keyframes slide {
      100% { right: 0; }
  }

`;

export const SizeButtonsRow = styled.div `
  width: 100%;
  padding: 0 45px 50px;
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  row-gap: 8px;
  column-gap: 8px;

  @media (max-width: 100%) {
    padding: 0 0 0px;
  }

  .ui.button {
    color: #1B3C92;
    background-color: #E4E8F1;
    font-size: 10px;
    padding: 9px 0;

    &.primary {
      color: #FFFFFF;
      background-color: #1B3C92;
    }
  }
`;