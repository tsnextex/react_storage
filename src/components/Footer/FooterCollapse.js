import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import PhoneNumber from "./PhoneNumber";
import EmailAddress from "./EmailAddress";

const useStyles = makeStyles(theme => ({
  root: {
    padding: ".2em 1.2em",
    width: "inherit"
  },
  expandLess: {
    transform: "rotate(180deg)",
    transition: "all 0.3s ease-in"
  },
  expandMore: {
    transform: "rotate(0deg)",
    transition: "all 0.3s ease-in"
  },
  listHeader: {
    fontSize: "1.2em",
    borderTop: "1px solid #dadada"
  },
  listHeaderText: { fontWeight: 600 },
  subList: { borderTop: "1px solid #dadada" },
  phoneMail: { padding: "0 0 1em 1em" },
  socialRow: { borderBottom: "1px solid #dadada", padding: "0 0 1em 1em" },
  socialIcon: {
    height: "1.8em",
    paddingRight: "1.6em"
  }
}));

export default function FooterCollapse({
  items = [],
  activeSublist,
  onListHeaderTap
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List>
        {items.map(x => (
          <React.Fragment key={x.name}>
            <ListItem className={classes.listHeader}>
              <ListItemText
                primary={x.display_text}
                className={classes.listHeaderText}
                onClick={() => onListHeaderTap(x.display_text)}
              />
              {x.child_links.length > 0 && (
                <ExpandMore
                  className={
                    activeSublist === x.display_text
                      ? classes.expandLess
                      : classes.expandMore
                  }
                />
              )}
            </ListItem>
            {(x.phone.display_text || x.email.display_text) && (
              <List className={classes.phoneMail} component="div">
                {x.phone.display_text && <PhoneNumber number={x.phone} />}
                {x.email.display_text && <EmailAddress email={x.email} />}
              </List>
            )}
            {x.social.length > 0 && (
              <div className={classes.socialRow}>
                {x.social.map(s => (
                  <a href={s.link} key={s.name}>
                    <img
                      src={s.icon}
                      alt={s.name}
                      className={classes.socialIcon}
                    />
                  </a>
                ))}
              </div>
            )}
            {x.child_links.length > 0 && (
              <Collapse
                in={activeSublist === x.display_text}
                timeout="auto"
                unmountOnExit
              >
                <List
                  className={classes.subList}
                  component="div"
                  disablePadding
                >
                  {x.child_links.map(xx => (
                    <Link key={xx.display_text} to={xx.path}>
                      <ListItem button>
                        <ListItemText primary={xx.display_text} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}
