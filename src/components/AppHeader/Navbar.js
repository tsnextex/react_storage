import React from "react";
import { useHistory } from "react-router-dom";
import { NavbarContainer } from './style';
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import NavLogo from "./NavLogo";
import SvgIcon from "@material-ui/core/SvgIcon";
import PhoneNumber from "./PhoneNumber";
import { Link } from "react-router-dom";

export default function Navbar(props) {

  const {
    items = [{ display_text: "Loading..." }],
    toggleDrawer,
    setSearching,
    currentUser,
    setCurrentUser
  } = props;

  let history = useHistory();

  const phoneNumber = items.find((x) => x.type === "phone");
  const button = items.find((x) => x.type === "button") || {
    display_text: "loading...",
    internal_relative_link: "/",
  };

  const logoutUser = () => {

    // reset user
    localStorage.removeItem('currentUser');

    setCurrentUser(false);

    // return home
    const newLocation = { pathname: '/' };
    history.push(newLocation);
  }

  return (
    <NavbarContainer>
      <div className="navigation">
        <ul className="leftSide">
          {items.map((x) => {
            if (x.type === "logo") {
              return (
                <span key="logo">
                  <Link to="/">
                    <NavLogo img={x.logo} key={x.name} />
                  </Link>
                </span>
              );
            } else if (x.display_text === 'Find Storage'){
              return (
                <Hidden smDown key={x.display_text}>
                  <li className="navLink" onClick={() => setSearching(true)}>
                    {x.display_text}
                  </li>
                </Hidden>
              );
            } else if (`${x.type}`.includes("link")) {
              return (
                <Hidden smDown key={x.display_text}>
                  <li className="navLink">
                    <Link to={x.internal_relative_link}>
                      {x.display_text}
                    </Link>
                  </li>
                </Hidden>
              );
            } else if (x.type === "dropdown") {
              return (
                <Hidden smDown key={x.display_text}>
                  <li key={x.display_text}>
                    {x.display_text}
                    <ExpandMoreIcon />
                    <ul>
                      {x.options.map((xx) => (
                        <Link key={xx.display_text} to={xx.path}>
                          <li>{xx.display_text}</li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </Hidden>
              );
            } else return false;
          })}
        </ul>
        <div className="rightSide">
          <Hidden smDown>

            <PhoneNumber number={phoneNumber} />

            <Link to={currentUser ? '/my-account' : '/login'} className="iconTextLink">
              <SvgIcon viewBox="0 0 50 50">
                <g id="icons/general/user" fill="#1B3C92">
                  <path d="M35.9119413,23.7782307 C39.1641559,23.9870288 41.5489834,25.526998 43.1980484,28.1519454 C44.5821945,30.3551713 45.2297433,32.8099131 45.6575931,35.3150911 C46.0592849,37.6657664 46.2325118,40.044255 46.0830775,42.4214127 C45.9049807,45.2554244 44.6247708,47.5640474 42.1326678,49.1760114 C41.195016,49.7824441 40.1126605,49.9837899 38.9838329,49.9827253 C34.3264624,49.9779345 29.6690919,49.9807291 25.0117214,49.9808622 C20.5119945,49.9809953 16.0112935,49.9306921 11.5126796,49.9989607 C8.58716139,50.0434085 6.65536766,48.6594057 5.26537778,46.3847174 C4.37238929,44.923663 4.00186446,43.3196837 4.00002759,41.623615 C3.99685549,38.4296295 4.26650518,35.2687802 5.18036439,32.1833857 C5.72717722,30.3368067 6.43246838,28.5449224 7.71128689,27.0354279 C9.41628548,25.0227685 11.6075718,23.8679247 14.3588891,23.7759684 C14.7195351,23.7639914 14.9908545,23.8732478 15.2524342,24.1045359 C17.5194116,26.1082791 20.1750019,27.3610677 23.2496762,27.6690083 C27.587029,28.1035053 31.4741308,27.0560548 34.7438768,24.2079369 C35.0921395,23.9045209 35.4338627,23.7476229 35.9119413,23.7782307 Z M25.103916,0.000222552914 C32.1298154,0.0434990023 38.3535735,6.08094035 38.1463789,13.1688974 C38.3450784,20.1359068 32.1263598,26.2791773 25.0348031,26.2676746 C17.9785228,26.2562836 11.9229394,20.1232361 11.9220755,13.1213823 C11.9210676,6.10167421 18.0365489,-0.0426041177 25.103916,0.000222552914 Z" id="user-icon"></path>
                </g>
              </SvgIcon>
              <Hidden mdDown>
                <a className="phoneText">My Account</a>
              </Hidden>
            </Link>

            <Link to={currentUser ? '/my-account' : '/login'}>
              <Button variant="contained" className="billBtn">
                {button.display_text}
              </Button>
            </Link>
          </Hidden>

          <Hidden mdUp>

            <a href={`tel:${phoneNumber.display_text}`} style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SvgIcon className="rightSideIcon" viewBox="0 0 50 50">
                <g id="icons/general/phone" fill="#1B3C92">
                  <path
                    d="M46.3333333,34.3333333 C43,34.3333333 39.8,33.8 36.8133333,32.8133333 C35.88,32.52 34.84,32.7333333 34.0933333,33.48 L28.2266667,39.3466667 C20.68,35.5066667 14.4933333,29.32 10.6533333,21.7733333 L16.52,15.9066667 C17.2666667,15.16 17.48,14.12 17.1866667,13.1866667 C16.2,10.2 15.6666667,7 15.6666667,3.66666667 C15.6666667,2.2 14.4666667,1 13,1 L3.66666667,1 C2.2,1 1,2.2 1,3.66666667 C1,28.7066667 21.2933333,49 46.3333333,49 C47.8,49 49,47.8 49,46.3333333 L49,37 C49,35.5333333 47.8,34.3333333 46.3333333,34.3333333 L46.3333333,34.3333333 Z"
                    id="Shape"
                  ></path>
                </g>
              </SvgIcon>
            </a>

            <Link
              to={currentUser ? '/my-account' : '/login'}
              style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <SvgIcon className="rightSideIcon" viewBox="0 0 50 50">
                <g id="icons/general/user" fill="#1B3C92">
                  <path d="M35.9119413,23.7782307 C39.1641559,23.9870288 41.5489834,25.526998 43.1980484,28.1519454 C44.5821945,30.3551713 45.2297433,32.8099131 45.6575931,35.3150911 C46.0592849,37.6657664 46.2325118,40.044255 46.0830775,42.4214127 C45.9049807,45.2554244 44.6247708,47.5640474 42.1326678,49.1760114 C41.195016,49.7824441 40.1126605,49.9837899 38.9838329,49.9827253 C34.3264624,49.9779345 29.6690919,49.9807291 25.0117214,49.9808622 C20.5119945,49.9809953 16.0112935,49.9306921 11.5126796,49.9989607 C8.58716139,50.0434085 6.65536766,48.6594057 5.26537778,46.3847174 C4.37238929,44.923663 4.00186446,43.3196837 4.00002759,41.623615 C3.99685549,38.4296295 4.26650518,35.2687802 5.18036439,32.1833857 C5.72717722,30.3368067 6.43246838,28.5449224 7.71128689,27.0354279 C9.41628548,25.0227685 11.6075718,23.8679247 14.3588891,23.7759684 C14.7195351,23.7639914 14.9908545,23.8732478 15.2524342,24.1045359 C17.5194116,26.1082791 20.1750019,27.3610677 23.2496762,27.6690083 C27.587029,28.1035053 31.4741308,27.0560548 34.7438768,24.2079369 C35.0921395,23.9045209 35.4338627,23.7476229 35.9119413,23.7782307 Z M25.103916,0.000222552914 C32.1298154,0.0434990023 38.3535735,6.08094035 38.1463789,13.1688974 C38.3450784,20.1359068 32.1263598,26.2791773 25.0348031,26.2676746 C17.9785228,26.2562836 11.9229394,20.1232361 11.9220755,13.1213823 C11.9210676,6.10167421 18.0365489,-0.0426041177 25.103916,0.000222552914 Z" id="user-icon"></path>
                </g>
              </SvgIcon>
            </Link>

            { currentUser &&
              <SvgIcon onClick={() => logoutUser()} className="rightSideIcon" viewBox="0 0 50 50">
                <g id="icons/general/logout" fill="#CE3138">
                  <g id="Group-2">
                    <path d="M30,0.833333333 C31.2656526,0.833333333 32.3116365,1.77384627 32.4771779,2.99409814 L32.5,3.33333333 L32.5,13.8367201 C32.5,15.217432 31.3807119,16.3367201 30,16.3367201 C28.7343474,16.3367201 27.6883635,15.3962072 27.5228221,14.1759553 L27.5,13.8367201 L27.5,5.83333333 L5.83333333,5.83333333 L5.83333333,44.1666667 L27.5,44.1666667 L27.5,35.8493747 C27.5,34.5837221 28.4405129,33.5377381 29.6607648,33.3721967 L30,33.3493747 C31.2656526,33.3493747 32.3116365,34.2898876 32.4771779,35.5101395 L32.5,35.8493747 L32.5,46.6666667 C32.5,47.9323192 31.5594871,48.9783032 30.3392352,49.1438446 L30,49.1666667 L3.33333333,49.1666667 C2.06768078,49.1666667 1.0216968,48.2261537 0.856155387,47.0059019 L0.833333333,46.6666667 L0.833333333,3.33333333 C0.833333333,2.06768078 1.77384627,1.0216968 2.99409814,0.856155387 L3.33333333,0.833333333 L30,0.833333333 Z M41.7099605,14.8424634 L41.9604598,15.1153455 L48.6271264,23.5402493 C49.2721106,24.3553387 49.3382802,25.4710507 48.8285297,26.3474447 L48.6103827,26.6638199 L41.943716,34.9055827 C41.0753866,35.9790674 39.5012353,36.1453787 38.4277506,35.2770493 C37.4518554,34.487659 37.2256904,33.1149447 37.8450234,32.0653593 L38.056284,31.7610839 L41.5013333,27.4993333 L17.3910478,27.5 C16.0103359,27.5 14.8910478,26.3807119 14.8910478,25 C14.8910478,23.7343474 15.8315607,22.6883635 17.0518126,22.5228221 L17.3910478,22.5 L41.4273333,22.4993333 L38.0395402,18.2179879 C37.2606575,17.233686 37.3412364,15.8448008 38.1757967,14.9567062 L38.4486788,14.7062069 C39.4329807,13.9273241 40.8218659,14.007903 41.7099605,14.8424634 Z" id="Combined-Shape" fill="#CE3138" fill-rule="nonzero"></path>
                    <g id="Group" transform="translate(16.666667, 16.666667)"></g>
                  </g>
                </g>
              </SvgIcon>
            }

            <MenuIcon className="rightSideMenuIcon" onClick={toggleDrawer} />

          </Hidden>
        </div>
      </div>
    </NavbarContainer>
  );
}
