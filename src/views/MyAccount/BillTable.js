import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import TableMenuButton from "./TableMenuButton";
import { ResultsBox } from "../Search/components";

import _ from "lodash";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  headRow: { borderBottom: "2px solid #1B3C92" },
  headCell: {
    color: "#1B3C92 !important",
    fontWeight: "bold",
    fontSize: "12px",
  },
});

function createData(date, location, number, amount, status, type) {
  return { date, location, number, amount, status, type };
}

export default function BillTable() {
  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("location");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const [checkedLocations, setCheckedLocations] = React.useState([
    "Hobe Sound II",
    "Belleville",
  ]);
  const handleLocationChange = (e) => setCheckedLocations(e.target.value);

  const [checkedNumbers, setCheckedNumbers] = React.useState([
    "#1024",
    "#3450",
  ]);
  const handleNumberChange = (e) => setCheckedNumbers(e.target.value);

  const [checkedStatuses, setCheckedStatuses] = React.useState([
    "Pending",
    "Paid",
  ]);
  const handleStatusChange = (e) => setCheckedStatuses(e.target.value);

  const [checkedTypes, setCheckedTypes] = React.useState([
    "Pending",
    "Visa (1234)",
  ]);
  const handleTypeChange = (e) => setCheckedTypes(e.target.value);

  const headCells = [
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
    {
      id: "location",
      numeric: true,
      disablePadding: false,
      label: "Location",
      menu: true,
      options: ["Hobe Sound II", "Belleville"],
      checked: checkedLocations,
      handleChange: handleLocationChange,
    },
    {
      id: "number",
      numeric: true,
      disablePadding: false,
      label: "Unit Number",
      menu: true,
      options: ["#1024", "#3450"],
      checked: checkedNumbers,
      handleChange: handleNumberChange,
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "Amount",
    },
    {
      id: "status",
      numeric: true,
      disablePadding: false,
      label: "Status",
      menu: true,
      options: ["Pending", "Paid"],
      checked: checkedStatuses,
      handleChange: handleStatusChange,
    },
    {
      id: "type",
      numeric: true,
      disablePadding: false,
      label: "Payment Type",
      menu: true,
      options: ["Pending", "Visa (1234)"],
      checked: checkedTypes,
      handleChange: handleTypeChange,
    },
  ];
  const rawRows = [
    createData("8/20/2020", "Belleville", "#1024", "$20", "Pending", "Pending"),
    createData("8/20/2020", "Belleville", "#1024", "$20", "Pending", "Pending"),
    createData(
      "9/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "7/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "6/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "5/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "4/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "3/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "2/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "1/25/2020",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "9/25/2019",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "8/25/2019",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "7/25/2019",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
    createData(
      "6/25/2019",
      "Hobe Sound II",
      "#3450",
      "$24",
      "Paid",
      "Visa (1234)"
    ),
  ];

  const [rows, setRows] = React.useState(rawRows);

  React.useEffect(() => {
    setRows(() => {
      let result = _.filter(rawRows, (x) => {
        return (
          checkedLocations.indexOf(x.location) > -1 &&
          checkedNumbers.indexOf(x.number) > -1 &&
          checkedStatuses.indexOf(x.status) > -1 &&
          checkedTypes.indexOf(x.type) > -1
        );
      });
      return result;
    });
  }, [checkedNumbers, checkedLocations, checkedStatuses, checkedTypes]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer style={{ width: "100%" }}>
        <Table className={classes.table} aria-label="simple table">
          <Hidden smDown>
            <TableHead>
              <TableRow className={classes.headRow}>
                {headCells.map((headCell) =>
                  headCell.menu ? (
                    <TableMenuButton
                      label={headCell.label}
                      options={headCell.options}
                      checked={headCell.checked}
                      handleChange={headCell.handleChange}
                    />
                  ) : (
                    <TableCell
                      key={headCell.id}
                      className={classes.headCell}
                      align={headCell.numeric ? "left" : "left"}
                      padding={headCell.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        className={classes.headCell}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                          <span className={classes.visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
          </Hidden>
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, x) => (
                <TableRow key={row.name}>
                  <Hidden smDown>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.number}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.type}</TableCell>
                  </Hidden>
                  <Hidden mdUp>
                    <Grid container direction="row">
                      <Grid item xs={6} container direction="column">
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Date:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            {row.date}
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Location:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            {row.location}
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Status:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            {row.status}
                          </span>
                        </Grid>
                      </Grid>
                      <Grid item xs={6} container direction="column">
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Amount:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            {row.amount}
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Unit:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            {row.number}
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                              fontWeight: "bold",
                              paddingRight: ".5em",
                            }}
                          >
                            Payment Type:
                          </span>
                          <span
                            style={{
                              color: "#4A4A4A",
                              fontFamily: "Montserrat",
                              fontSize: "10px",
                            }}
                          >
                            {row.type}
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider
                      style={{ marginTop: ".6em", marginBottom: ".6em" }}
                    />
                  </Hidden>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
