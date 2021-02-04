import React from "react";
import { FooterContainer, CustomSpan } from './style';
import { Button } from 'antd';
import { Divider } from 'semantic-ui-react';
import { Grid, Hidden, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import FooterCollapse from "./FooterCollapse";
import PhoneNumber from "./PhoneNumber";
import EmailAddress from "./EmailAddress";

export default function Footer(props) {

  const {
    items = [],
    searchByState
  } = props;

  const [activeSublist, setSublist] = React.useState("");
  const onListHeaderTap = (x) => activeSublist === x ? setSublist("") : setSublist(x);

  const locations = items.filter((x) => x.type === "location");
  const columnHeaders = items.filter((x) => x.type === "column-header");
  const disclaimer = items.filter((x) => x.type === "disclaimer");

  return (
    <FooterContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ padding: '0 12px 12px 12px' }}>
          <Grid
            item
            className="locationsBox"
            container
            direction="row"
            justify="center"
            spacing={1}
          >
            <Hidden mdUp>
              <Grid item xs>
                <span className="bold">Our Storage Locations: </span>
              </Grid>
            </Hidden>
            <Grid
              item
              xs={12}
              container
              justify="center"
              className="locationRow"
            >
              <Hidden smDown>
                <span className="bold">
                  Our Storage Locations:{" "}
                </span>
              </Hidden>
              {locations.map((x, i) => (
                <CustomSpan test={i} className="location" key={x.name}>
                  <Button type="text" className="link" onClick={() => searchByState(x.name)}>
                    {x.display_text}
                  </Button>
                </CustomSpan>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid className="footerContainer" item md={10} container spacing={1}>
            <Hidden smDown>
              {columnHeaders.map((x) => (
                <Grid key={x.name} item xs={6} sm={3}>
                  <Paper className="footerList" elevation={0}>
                    <span className="listHeader">{x.display_text}</span>
                    {x.child_links.length > 0 &&
                      x.child_links.map((y) => (
                        <Link
                          key={y.path}
                          to={y.path}
                          children={y.display_text}
                          className="listItem"
                        />
                      ))}
                    {x.phone.display_text && <PhoneNumber number={x.phone} />}
                    {x.email.display_text && <EmailAddress email={x.email} />}
                    {x.social.length > 0 && (
                      <div className="socialRow">
                        {x.social.map((s) => (
                          <a href={s.link} key={s.name}>
                            <img
                              src={s.icon}
                              alt={s.name}
                              className="socialIcon"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Hidden>
            <Hidden mdUp>
              <FooterCollapse
                items={columnHeaders}
                activeSublist={activeSublist}
                onListHeaderTap={onListHeaderTap}
              />
            </Hidden>
            <Divider />
            {disclaimer.length > 0 &&
              disclaimer.map((d) => (
                <Grid key={d.name} item xs={12} className="disclaimerContainer">
                  <Paper className="disclaimer" elevation={0}>
                    <p>{d.disclaimer_text}</p>
                    <span>
                      {d.display_text.replace(
                        "//year",
                        new Date().getFullYear()
                      )}
                    </span>
                    {d.child_links.map((dcl) => (
                      <Link
                        key={dcl.path}
                        to={dcl.path}
                        children={dcl.display_text}
                        className="footerLink"
                      />
                    ))}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </FooterContainer>
  );
}
