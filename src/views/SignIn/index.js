import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CustomContainer } from './style';
import { Header, Button, Form } from 'semantic-ui-react';
import { Hidden } from "@material-ui/core";
import login_banner from '../../img/login_banner.jpg';
import { gqlMutate } from "../../utils";
import client from "../../apollo";
import { SignInUser } from "../../graphql/signInUser";
import jwt from 'jsonwebtoken';
import { FormMessage } from '../../components/FormMessage';

const notificationInitial = { icon: '', title: '', content: '', error: false, warning: false };

export const SignIn = props => {

  const { setCurrentUser } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState(notificationInitial);

  let history = useHistory();

  const handleChangeEmail = (e, { value }) => setEmail(value);
  const handleChangePassword = (e, { value }) => setPassword(value);

  const navigateTo = pathname => {

    // transition to next location
    const newLocation = { pathname };
    history.push(newLocation);
  }

  const login = () => {

    // Attempt sign in
    gqlMutate(client, SignInUser(email, password))
      .then(res => {

        const {
          data,
          message,
          status
        } = res.data.loginProfile;

        console.log(data, message, status);

        if (status === 'error') {

          // display error notification
          setNotification({
            icon: 'ban',
            title: 'Sign In Fail',
            content: message,
            error: true,
            warning: false
          });

          setShowNotification(true);

        } else {

          // hide any errors
          setShowNotification(false);
          setNotification(notificationInitial);

          // token with details + save to localstorage
          const decoded = jwt.decode(res.data.loginProfile.data.token);
          setCurrentUser(decoded);
          localStorage.setItem('currentUser', JSON.stringify(decoded));
          console.log('user decoded', decoded);

          // navigate to my account
          const newLocation = { pathname: '/my-account' };
          history.push(newLocation);
        }
      });
  }

  return (
    <CustomContainer bannerImg={login_banner}>

      <Hidden smDown>
        <section className="headerBannerImg">
          <section className="headerBannerTxt">
            <div className="bannerTitle">Welcome Back!</div>
            <div className="bannerHeader">Self, reliable storage on your terms.</div>
            <div className="bannerBody">Need to make some adjustments to your account? Our convenient portal makes it easy.</div>
          </section>
        </section>
      </Hidden>

      <section className="lowerContentContainer">
        <section className="coverContainer">

          <article>
            <Header as='h3' className="title">
              VALIDATE YOUR ACCOUNT
            </Header>

            <Header.Subheader className="subTitle">
              We have updated your account portal.
            </Header.Subheader>

            <Header.Subheader className="content">
              Our team worked hard to create a better user experience and improved security measures while you rent with us. Access the new portal by finding your storage unit and create a new password.
            </Header.Subheader>

            <Button
              onClick={() => navigateTo('missing-new')}
              className="lookupBtn"
              size='big'
              fluid
            >
              Lookup My Units
            </Button>
          </article>
        </section>

        <section className="formContainer">
          <article>
            <Header as='h3' className="formHeader">Sign In</Header>
            <Form>
              <Form.Field>
                <label>Email</label>
                <Form.Input
                  name="email"
                  value={email}
                  onChange={handleChangeEmail}
                  error={notification.error}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <Form.Input
                  name="password"
                  value={password}
                  onChange={handleChangePassword}
                  type="password"
                  error={notification.error}
                />
              </Form.Field>
            </Form>

            <Hidden smDown>
              <section className="btnContainerLarge">
                <Button
                  onClick={() => navigateTo('forgot-password')}
                  className="forgotBtn"
                  size='big'
                  fluid
                >
                  Forgot Password?
                </Button>

                <Button
                  onClick={() => login()}
                  className="signInBtn"
                  size='big'
                  disabled={!(email.length > 0 && password.length > 0)}
                  fluid
                >
                  Sign In
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

          </article>
        </section>
      </section>

      <Hidden mdUp>
        <footer>

          <Button
            onClick={() => navigateTo('forgot-password')}
            className="forgotBtn"
            size='big'
            fluid
          >
            Forgot Password?
          </Button>

          <Button
            onClick={() => login()}
            className="signInBtn"
            size='big'
            fluid
          >
            Sign In
          </Button>

        </footer>
      </Hidden>
    </CustomContainer>
  );
};