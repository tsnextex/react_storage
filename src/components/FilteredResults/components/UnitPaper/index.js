import React from "react";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Grid,
  Tooltip,
  Paper,
  Typography,
  ButtonBase,
  Button,
  Collapse,
  Hidden,
} from "@material-ui/core";

/*
value          |0px     600px    960px    1280px   1920px
key            |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

const useStyles = makeStyles((theme) => ({
  unitVisible: {
    display: "flex",
    flexGrow: 1,
    marginBottom: "1em",
    height: "fit-content",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: "fill-available",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  bodyWrapper: {
    display: "block",
    marginRight: "2em",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
      padding: theme.spacing(2),
    },
  },
  firstRow: {
    fontSize: "1.6em",
    width: "fill-available",
    [theme.breakpoints.up("md")]: { paddingBottom: "1em" },
    [theme.breakpoints.up("sm")]: { paddingBottom: ".4em" },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4em",
    },
  },
  price: {
    float: "right",
    fontWeight: 800,
    "&:after": {
      content: "'/mo'",
      fontWeight: 300,
      fontSize: ".7em",
    },
  },
  storePrice: {
    textDecoration: "line-through",
    width: "fill-available",
    textAlign: "right",
    float: "right",
    fontWeight: 800,
    "&:after": {
      content: "'/mo in store'",
      textDecoration: "line-through",
      fontWeight: 300,
      fontSize: ".7em",
    },
  },
  dimensions: {
    fontWeight: 800,
    paddingRight: ".4em",
  },
  size: {
    fontWeight: 300,
    paddingLeft: ".4em",
  },
  tagsWrapper: {
    paddingTop: 0,
  },
  tag: {
    fontWeight: 300,
    display: "flex",
    height: 24,
    marginRight: ".8em",
    marginBottom: ".3em",
    "& img": {
      width: "24px",
      margin: "0 .4em 0 0",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "0.2em",
      "& img": {
        width: "16px",
        height: "16px",
        margin: "0.28em .4em 0 0",
      },
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0.2em",
      "& img": {
        width: "20px",
        height: "20px",
        margin: "0.28em .4em 0 0",
      },
    },
  },
  tagNamePromo: { color: "#377D21" },
  buttonWrapperSM: {
    display: "flex",
    justifyContent: "stretch",
    alignItems: "center",
    paddingTop: ".4em",
  },
  hurryTextSM: {
    fontWeight: 600,
    color: "#CE3138",
    fontStyle: "italic",
  },
}));

export default function UnitPaper({
  image = null,
  dimensions = "10' x 10'",
  size = "Medium",
  price = 13,
  storePrice = 14,
  hurryText = "Hurry, Only 3 left!",
  tags = ["md", "ff", "pr"],
  promo = false,
  filters = [],
  actionableSizeFilters = [],
  actionableAmenityFilters = [],
  defaultAmenityFilterTags = [],
}) {
  const classes = useStyles();
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  const getIntersection = (arrA, arrB) => arrA.filter((x) => arrB.includes(x));

  const generateTag = (tag) => {
    let filter = filters.filter((x) => x.tag === tag);
    filter = filter[0];

    return !!filter ? (
      <Tooltip key={filter.name} title={filter.name} placement="right">
        <div className={classes.tag}>
          <img src={filter.image} alt={"icon"} />
          <Hidden xsDown>
            <Typography
              children={tag === "pr" && promo ? promo : filter.name}
              className={
                tag === "pr" && promo ? classes.tagNamePromo : classes.tagName
              }
            />
          </Hidden>
        </div>
      </Tooltip>
    ) : null;
  };
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    // eslint-disable-next-line
    const sizeMatch = !!(
      getIntersection(actionableSizeFilters, tags).length > 0
    );
    // eslint-disable-next-line
    let amenityMatch = !!(
      getIntersection(actionableAmenityFilters, tags).length > 0
    );
    if (actionableAmenityFilters.length < defaultAmenityFilterTags.length) {
      const n_amenityMatch = getIntersection(
        actionableAmenityFilters,
        tags
      ).filter((x) => tags.indexOf(x) > -1);
      amenityMatch =
        getIntersection(n_amenityMatch, actionableAmenityFilters).length ===
        actionableAmenityFilters.length;
    }
    // setShow(sizeMatch && amenityMatch);
    setShow(true);
    // eslint-disable-next-line
  }, [actionableSizeFilters, actionableAmenityFilters]);

  return (
    <ThemeProvider theme={theme}>
      <Collapse in={show}>
        <div className={classes.unitVisible}>
          <Paper className={classes.paper} elevation={3}>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Hidden smDown>
                <Grid item md={2} className={classes.imageWrapper}>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={image} />
                  </ButtonBase>
                </Grid>
              </Hidden>
              <Grid
                item
                xs={12}
                sm
                container
                className={classes.bodyWrapper}
                direction="column"
                justify="space-evenly"
                alignItems="stretch"
              >
                <Grid
                  item
                  xs
                  className={classes.topRow}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <div className={classes.firstRow}>
                    <span className={classes.dimensions}>{dimensions}</span>|
                    <span className={classes.size}>{size}</span>
                    <span className={classes.price}>${price}</span>
                  </div>
                </Grid>
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  className={classes.bottomRow}
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid
                    item
                    md={9}
                    sm={9}
                    xs={8}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    className={classes.tagsWrapper}
                  >
                    {tags.map((tag) => generateTag(tag))}
                  </Grid>
                  <Grid item>
                    <span className={classes.storePrice}>${storePrice}</span>
                  </Grid>
                </Grid>
                <Hidden mdUp>
                  <Grid
                    className={classes.buttonWrapperSM}
                    container
                    direction="column"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                    >
                      Continue
                    </Button>
                    <Typography className={classes.hurryTextSM}>
                      {hurryText}
                    </Typography>
                  </Grid>
                </Hidden>
              </Grid>
              <Hidden smDown>
                <Grid item md={2} className={classes.buttonWrapper}>
                  <Button variant="contained" color="primary">
                    Continue
                  </Button>
                  <Typography className={classes.hurryTextSM}>
                    {hurryText}
                  </Typography>
                </Grid>
              </Hidden>
            </Grid>
          </Paper>
        </div>
      </Collapse>
    </ThemeProvider>
  );
}
