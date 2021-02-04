import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

export const CustomMessage = styled(Message)`
  background: ${props => props.warning ? '#E8EBF4' : '#fff6f6'} !important;
  box-shadow: none !important;
  padding: 15px 15px 10px 15px !important;
  
  .innerContainer {
    display: flex;
  }

  .icon {
    color: ${props => props.warning ? '#1B3C92' : '#CE3138'} !important;
    font-size: 24px !important;
    margin-right: 15px;
  }

  .header {
    color: ${props => props.warning ? '#4A4A4A' : '#CE3138'} !important;
    font-size: 12px !important;
  }

  .content {
    font-size: 12px !important;
    line-height: 16px !important;
  }
`;