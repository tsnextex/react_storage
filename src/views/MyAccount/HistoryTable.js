import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#1B3C92",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#1B3C92",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

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
  headCell: { color: "#1B3C92 !important", fontWeight: "bold" },
});

function createData(location, details, moveIn, moveOut) {
  return { location, details, moveIn, moveOut };
}

export default function HistoryTable() {
  const classes = useStyles();

  const rows = [
    createData(
      "Belleville",
      "Unit #7262 | 3' x 3' | Small",
      "03/20/2018",
      "11/20/2018"
    ),
    createData(
      "Jacksonville",
      "Unit #2918 | 5' x 5' | Small",
      "01/20/2017",
      "09/20/2017"
    ),
  ];

  const [check, setCheck] = React.useState({
    "#1024": false,
    "#3450": true,
  });
  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  const headCells = [
    {
      id: "location",
      numeric: false,
      disablePadding: false,
      label: "Location",
    },
    {
      id: "details",
      numeric: false,
      disablePadding: false,
      label: "Unit Details",
    },
    {
      id: "moveIn",
      numeric: false,
      disablePadding: false,
      label: "Move In Date",
    },
    {
      id: "moveOut",
      numeric: false,
      disablePadding: false,
      label: "Move Out Date",
    },
  ];
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

  return (
    <TableContainer style={{ width: "100%" }}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.headRow}>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                className={classes.headCell}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, x) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.details}</TableCell>
                <TableCell align="left">{row.moveIn}</TableCell>
                <TableCell align="left">{row.moveOut}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
