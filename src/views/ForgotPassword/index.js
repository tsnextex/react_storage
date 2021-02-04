import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CustomForgotPasswordContainer } from './style';
import { Header, Button, Icon, Form } from 'semantic-ui-react';
import { Hidden } from "@material-ui/core";
import validator from 'validator';
import client from "../../apollo";
import { gqlRequest } from "../../utils";
import { ForgotPasswordQuery } from "../../graphql/myAccount";
import { FormMessage } from '../../components/FormMessage';

const notificationInitial = { icon: '', title: '', content: '', error: false, warning: false };

export const ForgotPassword = () => {

  const [accountEmail, setAccountEmail] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(notificationInitial);
  
  let history = useHistory();

  const handleChangeEmail = (e, { value }) => setAccountEmail(value);

  const handleSendInstructions = () => {

    console.log('send instructions');
    gqlRequest(client, ForgotPasswordQuery(accountEmail))
      .then(res => {
        
        console.log('forgot password res', res);
        const {
          message,
          error,
          status
        } = res.data.getResetAccountPasswordUrl;

        if (status === 'error') {

          setShowNotification(true);
          setNotification({
            icon: 'ban',
            title: error,
            content: message,
            error: true,
            warning: false
          });
        }
      });
  }

  return (
    <CustomForgotPasswordContainer>

      <section className="formContainer">
        <Header className="forgotPasswordHeader" as='h2' icon>
          <Icon style={{ color: '#1B3C92', fontSize: 50 }} name='lock' />
          Forgot Password
          <Header.Subheader className="forgotPasswordContent">
            Enter your email below and we will send you instructions on how to reset your password.
          </Header.Subheader>
        </Header>

        <Form className="forgotPasswordForm">
          <Form.Field>
            <label>Email</label>
            <Form.Input
              name="email"
              value={accountEmail}
              onChange={handleChangeEmail}
            />
          </Form.Field>
        </Form>

        <Hidden smDown>
          <section className="formBtnContainer">
            <Button
              onClick={() => history.goBack()}
              className="cancelBtn"
              size='big'
              fluid
            >
              Cancel
            </Button>

            <Button
              disabled={!validator.isEmail(accountEmail)}
              onClick={() => handleSendInstructions()}
              className="sendInstructionsBtn"
              size='big'
              fluid
            >
              Send Instructions
            </Button>
          </section>
        </Hidden>

        { !!showNotification &&
          <FormMessage
            icon={notification.icon}
            header={notification.title}
            content={notification.content}
            error={notification.error}
            warning={notification.warning}
          />
        }
      </section>

      <section className="contactSection">
        <div>Having trouble retrieving your password?</div>
        <div>Contact our support line at <a>1-800-457-5678</a></div>
      </section>


      <Hidden mdUp>
        <footer>

          <Button
            onClick={() => history.goBack()}
            className="cancelBtn"
            size='big'
            fluid
          >
            Cancel
          </Button>

          <Button
            disabled={!validator.isEmail(accountEmail)}
            onClick={() => handleSendInstructions()}
            className="sendInstructionsBtn"
            size='big'
            fluid
          >
            Send Instructions
          </Button>

        </footer>
      </Hidden>

    </CustomForgotPasswordContainer>
  );
};