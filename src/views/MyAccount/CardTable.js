import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import SvgIcon from "@material-ui/core/SvgIcon";

import amex from "../../img/amex.png";
import visa from "../../img/visa.png";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  img: {
    width: 80,
    [theme.breakpoints.down("sm")]: {
      width: 20,
    },
  },
  tableHead: {
    width: "100px",
    [theme.breakpoints.down("sm")]: {
      width: "30px",
    },
  },
  infoCell: {
    [theme.breakpoints.down("sm")]: {
      width: "240px",
    },
  },
  infoText: {
    width: "fit-content",
    color: "#4A4A4A",
    fontFamily: "Montserrat",
    fontSize: "12px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
}));

function createData(card, cardDescription, address, location) {
  return { card, cardDescription, address, location };
}

export default function CardTable({ editFunction }) {
  const classes = useStyles();

  const rows = [
    createData(
      visa,
      "Visa ending in 1234",
      "3275 SW Street Dr, Miami, FL  25250",
      "Belleville - #1024"
    ),
    createData(
      amex,
      "AMEX ending in 6789",
      "1023 NW Street Dr, Jersey City, NJ  07030",
      "Hobe Sound II - #3450"
    ),
  ];

  const editCard = (row) => {};
  const removeCard = (row) => {};

  return (
    <TableContainer style={{ width: "100%", maxWidth: "93vw" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.card}>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableHead}
              >
                <img className={classes.img} alt="c" src={row.card} />
              </TableCell>
              <TableCell align="left" className={classes.infoCell}>
                <Typography component="span" className={classes.infoText}>
                  {row.cardDescription}{" "}
                </Typography>
                <Typography
                  component="span"
                  style={{
                    color: "#1B3C92",
                    fontFamily: "Montserrat",
                    fontSize: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => editFunction(2)}
                >
                  {" "}
                  Edit
                </Typography>

                <Typography className={classes.infoText}>
                  {row.address}
                </Typography>
                <Hidden mdDown>
                  <Typography
                    style={{
                      color: "#4A4A4A",
                      fontFamily: "Montserrat",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {row.location}
                  </Typography>
                </Hidden>
              </TableCell>

              <TableCell
                align="right"
                style={{
                  color: "#1B3C92",
                  fontFamily: "Montserrat",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => removeCard(row)}
              >
                <Hidden smDown>Remove</Hidden>
                <Hidden mdUp>
                  <SvgIcon
                    viewBox="0 0 50 50"
                    style={{ width: "20px", height: "20px" }}
                  >
                    <g id="icons/general/delete" fill="#1B3C92">
                      <path
                        d="M39.4166667,50 L10.25,50 C7.95,50 6.08333333,48.1333333 6.08333333,45.8333333 L6.08333333,10.4166667 L4,10.4166667 L4,6.25 L16.5,6.25 L16.5,3.125 C16.5,1.40208333 17.9020833,0 19.625,0 L30.0416667,0 C31.7604167,0 33.1666667,1.39791667 33.1666667,3.125 L33.1666667,6.25 L45.6666667,6.25 L45.6666667,10.4166667 L43.5833333,10.4166667 L43.5833333,45.8333333 C43.5833333,48.1333333 41.7166667,50 39.4166667,50 Z M39.4166667,10.4166667 L10.25,10.4166667 L10.25,44.7916667 C10.25,45.3666667 10.7166667,45.8333333 11.2916667,45.8333333 L38.375,45.8333333 C38.95,45.8333333 39.4166667,45.3666667 39.4166667,44.7916667 L39.4166667,10.4166667 Z M24.8333333,26.2208333 L31.69375,19.3604167 L34.6395833,22.30625 L27.7791667,29.1666667 L34.6395833,36.0270833 L31.69375,38.9729167 L24.8333333,32.1125 L17.9729167,38.9729167 L15.0270833,36.0270833 L21.8875,29.1666667 L15.0270833,22.30625 L17.9729167,19.3604167 L24.8333333,26.2208333 L24.8333333,26.2208333 Z M29,4.16666667 L20.6666667,4.16666667 L20.6666667,6.25 L29,6.25 L29,4.16666667 Z"
                        id="Shape"
                      ></path>
                    </g>
                  </SvgIcon>
                </Hidden>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
