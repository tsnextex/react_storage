import React from 'react';
import { CustomMessage } from './style';
import { Message, Icon } from 'semantic-ui-react';

export const FormMessage = props => {

  const {
    error = false,
    warning = false,
    icon,
    header,
    content
  } = props;

  return (
    <CustomMessage error={error} warning={warning}>
      <section className="innerContainer">
        <Icon name={icon} />
        <div>
          <Message.Header>{header}</Message.Header>
          <Message.Content>{content}</Message.Content>
        </div>
      </section>
    </CustomMessage>
  );
};